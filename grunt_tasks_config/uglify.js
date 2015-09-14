module.exports = function () {
    return {
        options: {
            compress: true,
            report: false
        },
        engine: {
            'src': 'dist/jsfile-dsv.js',
            'dest': 'dist/jsfile-dsv.min.js'
        }
    };
};