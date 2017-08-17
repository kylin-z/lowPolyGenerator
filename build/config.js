const babel = require('rollup-plugin-babel')

module.exports = {
  dev:{
    port:4033,
    rollup:{
      entry: 'src/index.js',
      format: 'iife',
      moduleName: 'main', //umd或iife模式下，若入口文件含 export，必须加上该属性
      dest: 'dist/bundle.js',
      sourceMap: true,
      plugins: [babel({
        exclude: 'node_modules/**',
        presets: [
          [
            "es2015",
            {
              "modules": false
            }
          ]
        ]
      })]
    }
  }
}