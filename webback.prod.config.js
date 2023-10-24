webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',      
          test: new RegExp(        
          '\\.(' + config.build.productionGzipExtensions.join('|') +')$'
          ),
          threshold: 10240,
          // deleteOriginalAssets:true, //删除源文件
          minRatio: 0.8
        })
      )
    