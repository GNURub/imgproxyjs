import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));

const commons = {
    mode: 'production',
    entry: {
        main: './src/index.ts'
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            "crypto": false,
            "buffer": false,
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
}

const serverConfig = Object.assign({}, {
    target: 'node',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'index.node.js',
        globalObject: 'this',
    },
    //…
}, commons);

const clientConfig = Object.assign({}, {
    target: 'web', // <=== can be omitted as default is 'web'
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: "umd",
        globalObject: 'this',
    },
    resolve: {
        fallback: {
            "crypto": require.resolve('crypto-browserify'),
            "buffer": require.resolve('buffer/')
        }
    },
    //…
}, commons);

export default [serverConfig, clientConfig];
