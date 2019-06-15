const path = require('path')
var webpack = require('webpack')
const argv = require("yargs-parser")(process.argv.slice(2))
const _mode = argv.mode || "development"
const _modeflag = (_mode == "production" ? true : false)
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev=process.env.NODE_ENV==="development"

var config = {
  // entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: '/',
    filename: "scripts/[name][hash:8].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.(jpg|jpeg|svg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            filename: '[name].[ext]'
          }
        }
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  resolve:{
    //引入路径是不用写对应的后缀名
    extensions: ['.js', '.vue', '.json'],
    //缩写扩展
    alias:{
      //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
      'vue$':'vue/dist/vue.esm.js',// 'vue/dist/vue.common.js' for webpack 1
      //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
      '@': path.resolve(__dirname,'./src'),
    }
  },
  mode:'development',
  watch: !_modeflag,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "../views/index.html",
      template: "src/index.html"
    }),
    // 每次build清除多余的文件
    new CleanWebpackPlugin([
        'assets'
    ]),
    new MiniCssExtractPlugin({
        filename: "styles/[name].css",
        chunkFilename: "styles/[id].css"
    })
  ]
}
module.exports=config;
// const path = require('path') // 引入node路径
// const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制粘贴文件的插件
// const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离css的插件
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const HappyPack = require('happypack')// webpack默认在node上面是单进程 所以我们打包时间比较慢 我们可以用这个文件来配置多进程 提高效率
// const os = require('os'); // 配和happypack插件来用
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) // 获取cpu的数量

// function resolve (dir) { // 路径封装函数
//   return path.join(__dirname, '..', dir)
// }

// const createLintingRule = () => ({ // 语法检测加载器
//   test: /\.(js|vue)$/,
//   loader: 'eslint-loader',
//   enforce: 'pre',
//   include: [resolve('src'), resolve('test')], // 需要对那些文件进行语法检测
//   options: {
//     formatter: require('eslint-friendly-formatter'), // 错误输出的格式
//     emitWarning: true
//   }
// })
// const webpackConfig={
//   context: path.resolve(__dirname, '..'), // 入口文件的路径
//   entry:{
//     app:'./src/index.js' // 主入口文件
//   },
//   output:{
//     path: path.join(__dirname, 'assets'),
//     publicPath: '/',
//     filename: "scripts/[name][hash:8].bundle.js"
//   },
//   optimization:{ // 4.0新增的配置项
//     splitChunks:{
//       chunks:'all', // 插件作用的范围 all全部, async按需加载, initial入口文件 三选一
//       minSize: 30000, // 最小打包的尺寸  超过30kb才会打包
//       minChunks:1, // 最小引入的第三方库
//       maxAsyncRequests: 5, // 最大异步请求chunks
//       maxInitialRequests: 3, // 最大初始化chunks
//       automaticNameDelimiter: '~', // 如果不指定name，自动生成name的分隔符（‘runtime~[name]’）
//       name: true, // split 的 chunks name
//       cacheGroups:{ // 缓存组
//         vendors:{ // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。
//           chunks:'initial', // 左右是入口文件
//           test:/[\\/]node_modules[\\/]/, // 过滤 打包node_modules文件下的引用的库
//           name:'common/vender', // 打包最后的路径 common/vender.js
//           minChunks:1, // 最小引入数1
//           priority: -10, // 优先级
//           enforce: true,
//         },
//       },
//     },
//     runtimeChunk: { // 运行时需要打包的js文件
//       name: 'page/manifest' // 打包最后的路径 page/manifest.js
//     }
//   },
//   resolve: {
//     extensions: ['.js', '.vue', '.json'], // 优先去找.js文件依赖 然后是.vue 最后是.json
//     alias: {
//       'vue$': 'vue/dist/vue.esm.js',
//       '@': resolve('src') // 路径别名
//     }
//   },
//   module:{//模块配置项了
//     rules:[
//       createLintingRule(),
//       {
//         test:/\.vue$/,
//         loader:"vue-loader" // 解析vue文件模板的加载器
//       },
//       {
//         test:/\.js$/, // es6语法转换加载器 配合happypack用多进程处理 效率更高
//         exclude:"/(node_modules)/", // 排除node_modules文件
//         loader:'happypack/loader?id=happyBabel'// 配置项
//       },
//       {
//         test:/\.scss$/, // 使用css预编译工具   这里用sass举例
//         use:[
//           process.env.NODE_ENV? // MiniCssExtractPlugin.loader 用来抽离css文件的 不用打包到js文件里
//           'vue-style-loader':MiniCssExtractPlugin.loader,// 可以再vue模板中的<style lang='scss'>使用sass
//           'css-loader',
//           'sass-loader',
//           'postcss-loader',//css 自动加上兼容性前缀    
//         ]  
//       },
//       {
//         test:/\.css$/,//同上
//         use:[
//           'style-loader',
//           process.env.NODE_ENV?
//           'vue-style-loader':MiniCssExtractPlugin.loader,//MiniCssExtractPlugin.loader 用来抽离css文件的 不用打包到js文件里
//           'css-loader',
//           'postcss-loader'
//         ]   
//       },
//       {
//         test:/\.(png|jpeg|jpg|svg|gif)$/,//图片加载器  我们url-loader内部封装了file-loader所以我们安装一个就行了
//         use:[
//           {
//             loader:"url-loader",
//             options:{
//               limit:2048,//2048以内的文件我们打包进js
//               name:'static/images/[name].[ext]'//2048之外的图片我们直接放到这个目录下 不打包
//             }   
//           },
//           {
//             loader:'image-webpack-loader'//图片优化 性能优化
//           }
//         ]
//       },
//       {
//         test: /\.(woff|eot|ttf|otf)(\?.*)?$/,//同上
//         loader: 'url-loader',
//         options: {
//           limit: 10000,  
//           name: 'static/fonts/[name].[hash:7].[ext]'
//         }
//       } 
//     ]
//   },
//   plugins:[
//     new VueLoaderPlugin(),//vue-loader的插件 是必须的
//     new CopyWebpackPlugin([ // 拷贝文件到打包文件目录下的插件
//       {
//         from: path.resolve(__dirname, '../static'),//复制来自于static
//         to:'/static',//粘贴到dist文件下static
//         ignore: ['.*']
//       }
//     ]),
//     new HappyPack({
//         //用id来标识 happypack处理那里类文件
//       id: 'happyBabel',
//       //如何处理  用法和loader 的配置一样
//       loaders: [{
//         loader: 'babel-loader?cacheDirectory=true',
//       }],
//       //共享进程池
//       threadPool: happyThreadPool,
//       //允许 HappyPack 输出日志
//       verbose: true,
//     })
//   ]
// }
// module.exports=webpackConfig // 接口暴露