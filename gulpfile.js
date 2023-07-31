// "use strict";

// const {src,dest,series,watch} = require('gulp');

// const sass = require('gulp-sass')(require('sass'));
// const autoprefixer = require('gulp-autoprefixer');
// const cssMinify = require('gulp-clean-css');

// const hash = require('gulp-hash');
// const imagemin = require('gulp-imagemin');
// const rename = require('gulp-rename');
// const fs = require('fs-extra');


// // const cssnano = require('gulp-cssnano');
// const rev = require('gulp-rev');




// function styles(done){
//     src('./assets/css/**/*.css')
//     .pipe(autoprefixer('last 2 versions'))
//     .pipe(cssMinify())
//     .pipe(rev())
//     .pipe(dest('./public/assets/css'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     // .pipe(hash())
//     // .pipe(rename(function(path){
//     //     path.basename += "-min";
//     // }))
//     .pipe(dest('./public/assets/css'));
//     done();
// }



// const jsMinify = require('gulp-terser');

// function scripts(done){
//     src('./assets/js/**/*.js')
//     .pipe(jsMinify())
//     // .pipe(hash())
//     // .pipe(rename(function(path){
//     //     path.basename += "-min";

//     // }))
//     .pipe(rev())
//     .pipe(dest('./public/assets/js'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true

//     }))
//     .pipe(dest('./public/assets/js'));
//     done();
// }



// function images(done){
//     console.log("compressing images");
    
//      src('./assets/img/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(dest('./public/assets/img'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     // .pipe(hash())
//     // .pipe(rename(function(path){
//     //     path.basename += "-min"
//     // }))
//     .pipe(dest('./public/assets/img'));
//     done();
// }


// //empty the public assets directory

// function cleanAssets(done){
//     fs.removeSync('./public/assets');
//     done();

// }



// function watchTask(done){
//     watch(
//         ['./assets/css/**/*.css','./assets/js/**/*.js','./assets/img/**/*.+(png|jpg|gif|svg|jpeg'],
//         series(styles,scripts)
//     )
//     done();

// }

// exports.default = series(cleanAssets,styles,scripts,images,watchTask);












// technique 2


const gulp = require('gulp');

const cssnano = require('gulp-cssnano');
// const rev = require('gulp-rev');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');
const jsMinify = require('gulp-terser');

const hash = require('gulp-hash');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const fs = require('fs-extra');


// const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');


var hashedjs;
var hashedcss;




gulp.task('css',function(done){
    console.log('minifying.css');

    gulp.src('./assets/css/**/*.css')
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(cssMinify())
    // .pipe(hash())
    // .pipe(rename(function(path){
    //     path.basename += "-min";


    // }))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js',function(done){

    gulp.src('./assets/js/**/*.js')
    .pipe(jsMinify())
    // .pipe(hash())
    // .pipe(rename(function(path){
    //     path.basename += "-min";

    // }))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true

    }))
    .pipe(gulp.dest('./public/assets'));
    done();

});

gulp.task('img',function(done){

    console.log("compressing images");
    
    gulp.src('./assets/img/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/img'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    // .pipe(hash())
    // .pipe(rename(function(path){
    //     path.basename += "-min"
    // }))
    .pipe(gulp.dest('./public/assets'));
    done();

});



gulp.task('clean:assets',function(done){
    fs.removeSync('./public/assets');
    done();
});


gulp.task('build',gulp.series('clean:assets','css','js','img'),function(done){
    console.log('building assets');
    done();
});