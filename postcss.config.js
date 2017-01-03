module.exports = {
    plugins: [
//         require('postcss-smart-import')({ /* ...options */ }),
//         require('precss')({ /* ...options */ }),
        require('autoprefixer')({
            //check http://browserl.ist/
            browsers: [ '>1%', 'last 2 versions', 'safari 7', 'safari 8' ]
        })
    ]
};
