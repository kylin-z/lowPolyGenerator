const path = require('path')
const rollup = require('rollup')
const watch = require('rollup-watch')
const express = require('express')

// 获取环境变量
const NODE_ENV = process.env.NODE_ENV 

const config = require('./config')[NODE_ENV].rollup
const devPort = require('./config')[NODE_ENV].port

var app = express()
// 设置静态文件服务器
app.use(express.static(path.resolve(__dirname, '../')));

var server = app.listen(devPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});


// rollup
rollup.rollup(config).then(function (bundle) {
  console.log('update the script');
  bundle.write({
    format: config.format,
    moduleName: config.moduleName,
    dest: config.dest,
    sourceMap: config.sourceMap
  });
})

// 是否开启监听
let isWatch = !!~process.argv.indexOf('--watch')

if (isWatch) rollupOnWatch(config)


function rollupOnWatch(config) {
  const watcher = watch(rollup, config);
  watcher.on('event', function (event) {
    switch (event.code) {
      case 'STARTING':
        console.log('checking rollup-watch version...')
        break
      case 'BUILD_START':
        console.log('bundling...')
        break
      case 'BUILD_END':
        console.log('bundled in ' + path.relative(process.cwd(), config.dest) + ' (' + event.duration + 'ms)')
        console.log('Watching for changes...')
        break
      case 'ERROR':
        console.error('ERROR: ', event.error)
        break
      default:
        console.error('unknown event', event)
    }
  })
}

