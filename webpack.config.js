const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    // 入口
    entry: path.join(__dirname, 'src/index.js'),
    // 输出
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出路径
        path: resolve(__dirname, 'dist')
    },
    // loader的配置
    module: {
        rules: [{
                // 处理vue资源
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // 处理css资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理图片资源
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // 给图片进行重命名 
                    // [hash:10]取图片的hash的前10位 
                    // [ext]取文件原来扩展名
                    name: '[hash:10].[ext]',
                    // 图片大小小于 8kb，就会被base64处理 
                    // 优点: 减少请求数量（减轻服务器压力） 
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而 tml-loader引入图片是commonjs 
                    // 解析时会出问题：[object Module] 
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    outputPath: 'images'
                }
            },
            {
                // 处理 html 中 img 资源
                test: /\.html$/,
                // 负责引入img，从而能被url-loader进行处理
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(vue|html|js|css|jpeg|jpg|png|gif|svg)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    // plugins的配置
    plugins: [
        // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS）
        new HtmlWebpackPlugin({
            // 复制 './index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
            template: './index.html'
        }),
        new VueLoaderPlugin()
    ],
    //模式
    mode: 'development',

    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'dist'),
        // 启动 gzip 压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        hot: true
    }
}