import React, {Component} from "react";
import * as ReactDOM from 'react-dom'


import SnackbarContext from "./SnackbarContext";
import SnackbarContainer from "./SnackbarContainer";

import {
    IProviderContext,
    ISnackbarKey,
    ISnackbarMessage,
    ISnackbarOption,
    ISnackbarProviderProps,
    Snack,
    TransitionHandlerProps,
} from "./index";
import {
    DEFAULTS,
    isDefined,
    merge,
    originKeyExtractor,
    REASONS
} from "./utils/constrants";
import createChainedFunction from "./utils/createChainedFunction";
import SnackbarItem from "./Snackbar/SnackbarItem";

type Reducer = (state: ISnackbarProviderState) => ISnackbarProviderState;
type SnacksByPosition = { [key: string]: Snack[] };


//  Snackbar Provider State
interface ISnackbarProviderState {
    snacks: Snack[];
    queue: Snack[];
    contextValue: IProviderContext;
}

//  Snackbar Provider 用于管理Snackbar
class SnackbarProvider extends Component<ISnackbarProviderProps, ISnackbarProviderState> {
    constructor(props: ISnackbarProviderProps) {
        super(props);
        this.state = {
            snacks: [],
            queue: [],
            contextValue: {
                enqueueSnackbar: this.enqueueSnackbar.bind(this),
                closeSnackbar: this.closeSnackbar.bind(this),
            },
        };
        this.handleCloseSnack.bind(this);
    }

    get maxSnack(): number {
        return this.props.maxSnack || DEFAULTS.maxSnack;
    }

    /**
     * Adds a new snackbar to the queue to be presented.
     * Returns generated or user defined key referencing the new snackbar or null
     * 向容器中添加一个新的snackbar
     */
    enqueueSnackbar(message: ISnackbarMessage,
                    option: ISnackbarOption): ISnackbarKey {
        const {key, preventDuplicate, ...opt} = option
        const hasSpecifiedKey = isDefined(key)

        const id = hasSpecifiedKey ? key as ISnackbarKey :
            new Date().getTime() + Math.random()
        const merger = merge(option, this.props, DEFAULTS)

        // 处理SnackbarItem中的props，snack将在SnackbarItem组件中处理并下传到Snackbar组件的SnackContent中
        const snack: Snack = {
            key: id,
            message,
            open: true,
            entered: false,
            requestClose: false,
            variant: merger('variant'),
            anchorOrigin: merger('anchorOrigin'),
            autoHideDuration: merger('autoHideDuration'),
            contentProps: merger("contentProps"),
            content: merger('content'),
            action: option.action,
            hideIconVariant: merger('hideIconVariant'),
            closeable: merger("closeable")
        }

        if (opt.persist) {
            snack.autoHideDuration = undefined
        }

        this.setState((state) => {
            if (preventDuplicate === undefined || preventDuplicate) {
                const compareFunction = (item: Snack): boolean => (
                    hasSpecifiedKey ? item.key === key : item.message === message
                );
                const inQueue = state.queue.findIndex(compareFunction) > -1;
                const inView = state.snacks.findIndex(compareFunction) > -1;
                if (inQueue || inView) {
                    return state;
                }
            }
            return this.handleDisplaySnack({
                    ...state,
                    queue: [
                        ...state.queue,
                        snack
                    ]
                }
            )

        })
        return id
    }

    /**
     * Set the entered state of the snackbar with the given key.
     */
    handleEnteredSnack: TransitionHandlerProps['onEntered'] = (node, isAppearing,
                                                               key) => {
        if (!isDefined(key)) {
            throw new Error('handleEnteredSnack Cannot be called with undefined key');
        }

        this.setState(({snacks}) => ({
            snacks: snacks.map(item => (
                item.key === key ? {...item, entered: true} : {...item}
            )),
        }));
    }


    /**
     * Hide a snackbar after its timeout.
     */
    handleCloseSnack: TransitionHandlerProps['onClose'] = (event: any, reason, key) => {
        if (this.props.onClose) {
            this.props.onClose(event, reason, key)
        }
        if (reason === REASONS.CLICKAWAY) {
            return;
        }

        // 当为传递key时关闭所有的snackbar
        const shouldCloseAll = key === undefined
        this.setState(({snacks, queue}) => ({
            snacks: snacks.map(it => {
                if (!shouldCloseAll && it.key !== key) {
                    return it
                }
                return it.entered ? {...it, open: false} : {...it, requestClose: true}
            }),
            queue: queue.filter(item => item.key !== key)
        }))
    }


    /**
     * Close snackbar with the given key
     * 关闭指定的key的snackbar
     */
    closeSnackbar: IProviderContext['closeSnackbar'] = (key?: ISnackbarKey) => {
        const toBeClosed = this.state.snacks.find(item => item.key === key)
        if (isDefined(key) && toBeClosed && toBeClosed.onClose) {
            toBeClosed.onClose(null, REASONS.INSTRUCTED, key)
        }
        this.handleCloseSnack(null, REASONS.INSTRUCTED, key)
    }


    /**
     * When we set open attribute of a snackbar to false (i.e. after we hide a snackbar),
     * it leaves the screen and immediately after leaving animation is done, this method
     * gets called. We remove the hidden snackbar from state and then display notifications
     * waiting in the queue (if any). If after this process the queue is not empty, the
     * oldest message is dismissed.
     */
        // @ts-ignore
    handleExitedSnack: TransitionHandlerProps['onExited'] = (event, key1, key2) => {
        const key = key1 || key2;
        if (!isDefined(key)) {
            throw new Error('handleExitedSnack Cannot be called with undefined key');
        }

        this.setState((state) => {
            const newState = this.processQueue({
                ...state,
                snacks: state.snacks.filter(item => item.key !== key),
            });

            if (newState.queue.length === 0) {
                return newState;
            }
            return this.handleDismissOldest(newState);
        });
    };


    /**
     * Reducer: Display snack if there's space for it. Otherwise, immediately
     * begin dismissing the oldest message to start showing the new one.
     */
    handleDisplaySnack(state: ISnackbarProviderState) {
        const {snacks} = state;
        if (snacks.length >= this.maxSnack) {
            return this.handleDismissOldest(state)
        }
        return this.processQueue(state)
    }

    /**
     * Reducer: Display items (notifications) in the queue if there's space for them.
     */
    processQueue: Reducer = (state) => {
        const {queue, snacks} = state;
        if (queue.length > 0) {
            return {
                ...state,
                snacks: [...snacks, queue[0]],
                queue: queue.slice(1, queue.length)
            }
        }
        return state
    }

    /**
     * Reducer: Hide oldest snackbar on the screen because there exists a new one which we have to display.
     * (ignoring the one with 'persist' flag. i.e. explicitly told by user not to get dismissed).
     *
     * Note 1: If there is already a message leaving the screen, no new messages are dismissed.
     * Note 2: If the oldest message has not yet entered the screen, only a request to close the
     *         snackbar is made. Once it entered the screen, it will be immediately dismissed.
     */
    handleDismissOldest: Reducer = (state) => {
        if (state.snacks.some(item => !item.open || item.requestClose)) {
            return state
        }
        let popped = false;
        let ignore = false;
        const persistentCount = state.snacks.reduce((acc, current) => (
            acc + (current.open && current.persist ? 1 : 0)
        ), 0)

        // 当snackbar.persis === true的数量等于maxSnack的时候，继续移除最早的snackbar
        if (persistentCount === this.maxSnack) {
            ignore = true
        }
        const snacks = state.snacks.map(item => {
            if (!popped && (!item.persist || ignore)) {
                popped = true;
                if (!item.entered) {
                    return {
                        ...item,
                        requestClose: true
                    }
                }
                if (item.onClose) {
                    item.onClose(null, REASONS.MAXSNACK, item.key)
                }
                if (this.props.onClose) {
                    this.props.onClose(null, REASONS.MAXSNACK, item.key)
                }
                return {
                    ...item,
                    open: false
                }
            }
            return {...item}
        })
        return {...state, snacks}
    }

    render(): JSX.Element {
        const {
            children,
            domRoot,
            preventDuplicate,
            variant,
            anchorOrigin,
            hideIconVariant = DEFAULTS.hideIconVariant,
            iconMapping,
            dense,
            maxSnack,
            ...props
        } = this.props;

        const {contextValue} = this.state;

        const categ = this.state.snacks.reduce<SnacksByPosition>((acc, current) => {
            const category = originKeyExtractor(current.anchorOrigin)
            const existingOfCategory = acc[category] || []
            return {
                ...acc,
                [category]: [...existingOfCategory, current]
            }
        }, {})

        // 根据不同anchor显示 不同的显示区域的Snackbar
        const snackbars = Object.keys(categ).map((origin) => {
            const snacks = categ[origin]
            return (
                <SnackbarContainer
                    key={origin}
                    dense={dense}
                    anchorOrigin={snacks[0].anchorOrigin}
                >
                    {snacks.map((snack) => (
                        <SnackbarItem
                            {...props}
                            key={snack.key}
                            snack={snack}
                            onClose={this.handleCloseSnack}
                            onExited={createChainedFunction(
                                [this.handleExitedSnack, this.props.onExited])}
                            onEntered={createChainedFunction(
                                [this.handleEnteredSnack, this.props.onEntered])}
                        />
                    ))}
                </SnackbarContainer>
            );
        });

        return (
            <SnackbarContext.Provider value={contextValue}>
                {children}
                {domRoot ? ReactDOM.createPortal(snackbars, domRoot) : snackbars}
            </SnackbarContext.Provider>
        );
    }
}

export default SnackbarProvider;
