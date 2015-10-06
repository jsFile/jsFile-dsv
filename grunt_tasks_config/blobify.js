module.exports = function () {
    return {
        main: {
            options: {
                target: 'global'
            },
            src: ['tests/files/**/*.*'],
            dest: 'tests/filesCache.js'
        }
    };
};