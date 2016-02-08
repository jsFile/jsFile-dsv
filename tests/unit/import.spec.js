import DsvEngine from './../../src/index';

describe('jsFile-dsv', () => {
    describe('Library imports', () => {
        it('should import JS module', () => {
            assert.isFunction(DsvEngine);
        });

        it('should exist in global scope', () => {
            assert.isFunction(window.JsFileDsv.default);
        });
    });
});