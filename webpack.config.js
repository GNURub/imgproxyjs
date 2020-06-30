const path = require('path');
const commons = {
    mode: 'production',
    entry: {
        main: './src/index.ts'
    },
    resolve: {
        extensions: [".ts", ".js"]
      },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    }
}

const serverConfig = Object.assign({}, {
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.node.js'
    }
    //…
}, commons);

const clientConfig = Object.assign({}, {
    target: 'web', // <=== can be omitted as default is 'web'
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: "umd"
    }
    //…
}, commons);

module.exports = [serverConfig, clientConfig];