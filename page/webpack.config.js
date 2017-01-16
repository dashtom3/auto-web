var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
    entry: "./project/scripts/app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
            loaders: [
            {  
             test:/\.css$/,  
             loader:'style!css'  
            }, 
          {
            test: /^.*\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
    },
    plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    ] 
};
