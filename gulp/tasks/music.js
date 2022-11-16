module.exports = ()=>
    $.gulp.task('music',()=>
        $.gulp.src($.path.src.music)
            .pipe($.gulp.dest($.path.build.music)).on('end', $.bs.reload)
    )