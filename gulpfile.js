const { task, src, dest, parallel } = require('gulp')
const uglify = require('gulp-uglify')
task('uglify', async function (done) {
  await src(`dist/*.js`)
    .pipe(uglify()) // 压缩js代码
    .pipe(dest('dist'))
  done()
})
task(
  'default',
  parallel('uglify', function (done) {
    done()
  })
)
