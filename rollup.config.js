import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import bundleSize from 'rollup-plugin-bundle-size';
import cleanupPlugin from "rollup-plugin-cleanup";
import copy from 'rollup-plugin-copy';
import progress from 'rollup-plugin-progress';
import {sizeSnapshot} from "rollup-plugin-size-snapshot";
import {terser} from "rollup-plugin-terser";
import {visualizer} from "rollup-plugin-visualizer";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/index.cjs.js",
            format: "cjs",
            globals: {
                'react': 'React',
                "react-dom": "ReactDOM",
                "@mui/system": "@mui/system",
                "@mui/base": "@mui/base",
                "@mui/material": "@mui/material",
                "clsx": "clsx",
            },
            sourcemap: false,
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
            globals: {
                'react': 'React',
                "react-dom": "ReactDOM",
                "@mui/system": "@mui/system",
                "@mui/base": "@mui/base",
                "@mui/material": "@mui/material",
                "clsx": "clsx",
            },
            sourcemap: false,

        },
    ],
    plugins: [
        cleanupPlugin(),
        progress({
            clearLine: false // default: true
        }),

        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            babelHelpers: 'inline'
        }),

        typescript({
            allowSyntheticDefaultImports: true
        }),
        terser(),
        bundleSize(),
        sizeSnapshot(),
        visualizer(),
        copy({targets: [{src: 'src/index.d.ts', dest: 'dist'}]}),
    ],
    // 外部依赖
    external: [
        "react",
        "@mui/base",
        "@mui/system",
        "@mui/material",
        "react-dom",
        "clsx"
    ]

};
