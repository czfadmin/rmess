import typescript from '@rollup/plugin-typescript';
import bundleSize from 'rollup-plugin-bundle-size';
import copy from 'rollup-plugin-copy';

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
            sourcemap: true,
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
            sourcemap: true,

        },
        {
            file: 'dist/index.min.js',
            format: 'iife',
            globals: {
                ".": './index',
                'react': 'React',
                "react-dom": "ReactDOM",
                "@mui/system": "@mui/system",
                "@mui/base": "@mui/base",
                "@mui/material": "@mui/material",
                "clsx": "clsx",
                "index": './index'
            },
            sourcemap: true,

        }
    ],
    sourceMap: true,
    plugins: [
        typescript({
            allowSyntheticDefaultImports: true
        }),
        bundleSize(),
        copy({targets: [{src: 'src/index.d.ts', dest: 'dist'}]})
    ],
    external: [
        "react",
        "@mui/base",
        "@mui/system",
        "@mui/material",
        "react-dom",
        "clsx"
    ]
};
