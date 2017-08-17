var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    uglifycss = require('gulp-uglifycss'),
    uglifyjs = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon'),
    browserSync = require('browser-sync').create(),
    path = require("path"),
    html = require('gulp-processhtml'),
    watch = require('gulp-watch'),
    runs = require('run-sequence'),
    clean = require('gulp-clean'),
    injectPartials = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin');

 var targetDebug = "../assets-debug";

//PATH TO WATCH AUTOMATICALLY AFTER CHANGES IS SAVED WHILE GULP IS RUNNING
var paths = {
    css: [
        //ALL CSS
        path.join(__dirname, 'css/*.scss'),
        path.join(__dirname, 'css/**/*.scss')
    ],
    js: [
        //ALL JS
        path.join(__dirname, 'js/*.js'),
        path.join(__dirname, 'js/**/*.js')
    ]
}

//FOR ASSETS
var common = {
    css: [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'css/common.scss',
        'css/Common/*.scss'
    ],
    js: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'js/common.js',
        'js/Common/*.js'
    ]
};
var flight = {
    css: [
        'css/flight.scss'
    ],
    js: [
        'js/flight.js',
        'js/Flight/*.js'
    ]
};
var hotel = {
    css: [
        'css/hotel.scss'
    ],
    js: [
        'js/hotel.js',
        'js/Hotel/*.js'
    ]
};
var booking = {
    css: [
        'css/Booking.scss'
    ],
    js: [
        'js/booking.js',
        'js/Booking/*.js'
    ]
};
var payment = {
    css: [
        'css/payment.scss'
    ],
    js: [
        'js/payment.js',
        'js/Payment/*.js'
    ]
};
var membership = {
    css: [
        'css/membership.scss'
    ],
    js: [
        'js/membership.js',
        'js/Membership/*.js'
    ]
};

// //FOR GULP TASK
// var pathCommon = {};
// pathCommon.css.push(common.css);
// pathCommon.js.push(common.js);

// var pathFlight = {};
// var flightcss = common.css.concat(flight.css);
// var flightjs = common.js.concat(flight.js);
// pathFlight.css.push(flightcss);
// pathFlight.js.push(flightjs);

// var pathHotel = {};
// var hotelcss = common.css.concat(hotel.css);
// var hoteljs = common.js.concat(hotel.js);
// pathHotel.css.push(hotelcss);
// pathHotel.js.push(hoteljs);

// var pathBooking = {};
// var bookingcss = common.css.concat(booking.css);
// var bookingjs = common.js.concat(booking.js);
// pathBooking.css.push(bookingcss);
// pathBooking.js.push(bookingjs);

// var pathPayment = {};
// var paymentcss = common.css.concat(payment.css);
// var paymentjs = common.js.concat(payment.js);
// pathPayment.css.push(paymentcss);
// pathPayment.js.push(paymentjs);

// var pathMembership = {};
// var membershipcss = common.css.concat(membership.css);
// var membershipjs = common.js.concat(membership.js);
// pathMembership.css.push(common.concat(membership.css));
// pathMembership.js.push(common.concat(membership.js));

// HTML task
gulp.task('html', function() {
    return gulp.src("../views/pages/*.html")
        //.pipe(html())
        .pipe(injectPartials({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream())
});

//DEBUG TASK -------------//
//------MAIN-------//
gulp.task('sassMainDbg', function() {
    return gulp.src(common.css)
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(sass({
            // outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/css/')))
        .pipe(browserSync.stream());
});

gulp.task('jsMainDbg', function() {
    return gulp.src(common.js)
        .pipe(concat('main.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});
//------MAIN-------//
//------FLIGHT-------//
gulp.task('sassFlightDbg', function() {
    return gulp.src(common.css, flight.css)
        .pipe(sourcemaps.init())
        .pipe(concat('Flight.css'))
        .pipe(sass({
            // outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/css/')))
        .pipe(browserSync.stream());
});

gulp.task('jsFlightDbg', function() {
    return gulp.src(common.js, flight.js)
        .pipe(concat('Flight.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});
//------FLIGHT-------//
//------HOTEL-------//
gulp.task('sassHotelDbg', function() {
    return gulp.src(common.css, hotel.css)
        .pipe(sourcemaps.init())
        .pipe(concat('Hotel.css'))
        .pipe(sass({
            // outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/css/')))
        .pipe(browserSync.stream());
});

gulp.task('jsHotelDbg', function() {
    return gulp.src(common.js, hotel.js)
        .pipe(concat('Hotel.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});
//------HOTEL-------//
//------BOOKING-------//
gulp.task('sassBookDbg', function() {
    return gulp.src(common.css, booking.css)
        .pipe(sourcemaps.init())
        .pipe(concat('Booking.css'))
        .pipe(sass({
            // outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/css/')))
        .pipe(browserSync.stream());
});

gulp.task('jsBookDbg', function() {
    return gulp.src(common.js, booking.js)
        .pipe(concat('Booking.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});
//------BOOKING-------//
//------PAYMENT-------//
gulp.task('sassPaymentDbg', function() {
    return gulp.src(common.css, payment.css)
        .pipe(sourcemaps.init())
        .pipe(concat('Payment.css'))
        .pipe(sass({
            // outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/css/')))
        .pipe(browserSync.stream());
});

gulp.task('jsPaymentDbg', function() {
    return gulp.src(common.js, payment.js)
        .pipe(concat('Payment.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});
//------PAYMENT-------//
//------MEMBERSHIP-------//
gulp.task('sassMembershipDbg', function() {
    return gulp.src(common.css, membership.css)
        .pipe(sourcemaps.init())
        .pipe(concat('Membership.css'))
        .pipe(sass({
            // outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/css/')))
        .pipe(browserSync.stream());
});

gulp.task('jsMembershipDbg', function() {
    return gulp.src(common.js, membership.js)
        .pipe(concat('Membership.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});
//------MEMBERSHIP-------//

//Watcher
gulp.task('watchMain', function() {
    watch(paths.css, function() { runs('sassMainDbg'); });
    watch(paths.js, function() { runs('jsMainDbg'); });
});
gulp.task('watchFlight', function() {
    watch(paths.css, function() { runs('sassFlightDbg'); });
    watch(paths.js, function() { runs('jsFlightDbg'); });
});
gulp.task('watchHotel', function() {
    watch(paths.css, function() { runs('sassHotelDbg'); });
    watch(paths.js, function() { runs('jsHotelDbg'); });
});
gulp.task('watchBook', function() {
    watch(paths.css, function() { runs('sassBookDbg'); });
    watch(paths.js, function() { runs('jsBookDbg'); });
});
gulp.task('watchPayment', function() {
    watch(paths.css, function() { runs('sassPaymentDbg'); });
    watch(paths.js, function() { runs('jsPaymentDbg'); });
});
gulp.task('watchMembership', function() {
    watch(paths.css, function() { runs('sassMembershipDbg'); });
    watch(paths.js, function() { runs('jsMembershipDbg'); });
});

//ALL IN ONE TASK
gulp.task('allDbg', ['sassMainDbg', 'jsMainDbg','sassFlightDbg', 'jsFlightDbg','sassHotelDbg', 'jsHotelDbg','sassBookDbg', 'jsBookDbg','sassPaymentDbg', 'jsPaymentDbg','sassMembershipDbg', 'jsMembershipDbg']);

//GULP COMMAND
gulp.task('debug', ['allDbg', 'html', 'watchMain', 'watchFlight', 'watchHotel', 'watchBook', 'watchPayment', 'watchMembership'], function() {

    browserSync.init({
        server: {
            baseDir: [(path.join(__dirname, '../'))]
        }
    });
    watch(path.join(__dirname, '../views/Pages/*.html'), function() {
        runs('html');
    });
});


//SEPARATELY TASK GULP COMMAND
gulp.task('maindebug', ['sassMainDbg', 'jsMainDbg', 'watchMain'], function() {
    
        browserSync.init({
            server: {
                baseDir: [(path.join(__dirname, '../'))]
            }
        });
        watch(path.join(__dirname, '../views/Pages/*.html'), function() {
            runs('html');
        });
    });
gulp.task('flightdebug', ['sassFlightDbg', 'jsFlightDbg','watchFlight'], function() {
    
        browserSync.init({
            server: {
                baseDir: [(path.join(__dirname, '../'))]
            }
        });
        watch(path.join(__dirname, '../views/Pages/*.html'), function() {
            runs('html');
        });
    });
gulp.task('hoteldebug', ['sassHotelDbg', 'jsHotelDbg','watchHotel'], function() {
    
        browserSync.init({
            server: {
                baseDir: [(path.join(__dirname, '../'))]
            }
        });
        watch(path.join(__dirname, '../views/Pages/*.html'), function() {
            runs('html');
        });
    });
gulp.task('bookingdebug', ['sassBookDbg', 'jsBookDbg','watchBook'], function() {
    
        browserSync.init({
            server: {
                baseDir: [(path.join(__dirname, '../'))]
            }
        });
        watch(path.join(__dirname, '../views/Pages/*.html'), function() {
            runs('html');
        });
    });
gulp.task('paymentdebug', ['sassPaymentDbg', 'jsPaymentDbg','watchPayment'], function() {
    
        browserSync.init({
            server: {
                baseDir: [(path.join(__dirname, '../'))]
            }
        });
        watch(path.join(__dirname, '../views/Pages/*.html'), function() {
            runs('html');
        });
    });
gulp.task('membershipdebug', ['sassMembershipDbg', 'jsMembershipDbg','watchMembership'], function() {
    
        browserSync.init({
            server: {
                baseDir: [(path.join(__dirname, '../'))]
            }
        });
        watch(path.join(__dirname, '../views/Pages/*.html'), function() {
            runs('html');
        });
    });

//DEBUG TASK -------------//

//------------------------ASSETS-BIN----------------------------//
//MAIN------//
gulp.task('sassMainBin', function() {
    return gulp.src(common.css)
        .pipe(concat('main.css'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/css/')));
});

gulp.task('jsMainBin', function() {
    return gulp.src(common.js)
        .pipe(concat('main.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/js/')))
});
//MAIN------//
//------FLIGHT-------//
gulp.task('sassFlightBin', function() {
    return gulp.src(common.css, flight.css)
        .pipe(concat('Flight.css'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/css/')));
});

gulp.task('jsFlightBin', function() {
    return gulp.src(common.js, flight.js)
        .pipe(concat('Flight.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/js/')));
});
//------FLIGHT-------//
//------HOTEL-------//
gulp.task('sassHotelBin', function() {
    return gulp.src(common.css, hotel.css)
        .pipe(concat('Hotel.css'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/css/')));
});

gulp.task('jsHotelBin', function() {
    return gulp.src(common.js, hotel.js)
        .pipe(concat('Hotel.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/js/')));
});
//------HOTEL-------//
//------BOOKING-------//
gulp.task('sassBookBin', function() {
    return gulp.src(common.css, booking.css)
        .pipe(concat('Booking.css'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/css/')));
});

gulp.task('jsBookBin', function() {
    return gulp.src(common.js, booking.js)
        .pipe(concat('Booking.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/js/')));
});
//------BOOKING-------//
//------PAYMENT-------//
gulp.task('sassPaymentBin', function() {
    return gulp.src(common.css, payment.css)
        .pipe(concat('Payment.css'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/css/')));
});

gulp.task('jsPaymentBin', function() {
    return gulp.src(common.js, payment.js)
        .pipe(concat('Payment.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/js/')));
});
//------PAYMENT-------//
//------MEMBERSHIP-------//
gulp.task('sassMembershipBin', function() {
    return gulp.src(common.css, membership.css)
        .pipe(concat('Membership.css'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/css/')));
});

gulp.task('jsMembershipBin', function() {
    return gulp.src(common.js, membership.js)
        .pipe(concat('Membership.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/js/')));
});
//------MEMBERSHIP-------//

gulp.task('initBin', ['sassMainBin', 'jsMainBin','sassFlightBin', 'jsFlightBin','sassHotelBin', 'jsHotelBin','sassBookBin', 'jsBookBin','sassPaymentBin', 'jsPaymentBin','sassMembershipBin', 'jsMembershipBin']);

gulp.task('bin', ['initBin']);

