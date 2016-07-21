var gulp = require('gulp');
var builder = require('gulp-task-builder');
var browserify = require('gulp-browserify');

builder = new builder();

builder.loadTasks({
	builds:{ src:['scripts/*.js'], dest:'builds', /*watch:1, */hook:hookBuild},
	buildsMin:{ src:['scripts/*.js'], dest:'builds', /*watch:1, */hook:hookBuild, compress:true, ext:'.js', order:['hook', 'rename', 'compress'], rename:function(info){ info.basename += '.min'; } }
});

function hookBuild(taskObj){
	return taskObj
		.pipe(browserify(/*{insertGlobals:true}*/))
	;
}

gulp.task('build', function(){ builder.runTasks(['builds','buildsMin']); });