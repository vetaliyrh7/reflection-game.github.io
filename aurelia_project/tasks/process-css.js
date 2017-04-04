import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

export default function processCSS() {
    let processors = [
        autoprefixer({ browsers: ['last 1 version'] })
    ];

  return gulp.src(project.cssProcessor.source)
    .pipe(postcss(processors))
    .pipe(changedInPlace({firstPass: true}))
    .pipe(build.bundle());
}
