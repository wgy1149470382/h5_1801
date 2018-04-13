// 在nodejs环境下运行的js文件
// 按照nodejs的语法使用

// 引用模块: require();  得到一个对象/函数
// gulp,gulp-sass

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compileSass',function(){
    //查找sass文件 
   //.:表示当前目录
   //*表示多个文件
   gulp.src('./src/sass/*.scss')//得到文件流（文件在内存中的状态）

   //通过管道传输
   //编译
   //outputStyle:修改输出文件的格式
   .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
   //输出到硬盘
   .pipe(gulp.dest('./src/css/'))

});

// 创建文件监听任务：文件有修改，则自动编译
gulp.task('jtSass',function(){
    //监听的文件
    //当文件有修改。则执行compileSass任务
    gulp.watch('./src/sass/*.scss',['compileSass'])

})

// 自动刷新服务器
var browserSync = require('browser-sync');

// 静态服务器
gulp.task('server',function(){
    browserSync({
        // 服务器路径
        // server:'./src/',

        // 代理服务器
        proxy:'http://localhost:999',

        // 端口
        port:666,

        // 监听文件修改，自动刷新
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php','./src/img/*.jpg']
    });

    // 监听sass文件修改，并自动编译
    gulp.watch('./src/sass/*.scss',['compileSass'])
})

