var gulp = require("gulp");

var cssnano = require("gulp-cssnano");

var concat = require("gulp-concat");

var autoprefixer = require("gulp-autoprefixer");

var removeFile = require("gulp-rm");

var imageMin = require("gulp-imagemin");

var inject = require("gulp-inject");

var htmlMin = require("gulp-htmlmin");

var watch = require("gulp-watch");

var str = require("event-stream");


gulp.task("css",function(){
	gulp.src("./css/*.css")
	.pipe(concat("./app.css"))
	.pipe(autoprefixer({
		browsers:["last 70 versions"],
		// cascade:false
	}))
	.pipe(cssnano())
	.pipe(gulp.dest("./css/"));
})

gulp.task("image",function(){
	gulp.src("./images/*")
	.pipe(imageMin())
	.pipe(gulp.dest("./images/optimize/"))
})


gulp.task("index",function(){
	var source = gulp.src(["./css/app.css","./js/main.js"]);
	var target = gulp.src("./index.html");

	return target.pipe(inject(source,{relative:true}))
	.pipe(gulp.dest("./"));

});

gulp.task("clean",function(){
	gulp.src("./css/app.css",{read:false})
	.pipe(removeFile())
})


gulp.task("html",function(){
	gulp.src("./index.html")
	.pipe(htmlStream())
	.pipe(htmlMin({collapseWhitespace: true}))
	.pipe(gulp.dest("./"))
});

function htmlStream(){
	
	
	function transform(file,callback){
		

		// var test  = new Buffer();

		console.log(JSON.stringify(file));

		file.contents = new Buffer(String(file.contents).replace(/val/g,"rep"))


		callback(null,file)

	}
	


	return str.map(transform);
}





gulp.task("default",["clean","css","image","index","html"]);


gulp.task("watch",function(){
	watch("./css/style.css",function(events,done){
		gulp.start("css")
	})
})




