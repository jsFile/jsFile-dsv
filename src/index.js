import JsFile from 'JsFile';
import createDocument from './reader/createDocument';

const {Engine, defineEngine} = JsFile;
const csvFiles = {
    extension: ['csv'],
    mime: ['text/csv']
};

const tsvFiles = {
    extension: ['tsv', 'tab'],
    mime: ['text/tab-separated-values']
};

/**
 * @description Supported files by engine
 * @type {{extension: Array, mime: Array}}
 */
const files = {
    extension: [],
    mime: []
};

[csvFiles, tsvFiles].forEach(({extension, mime}) => {
    files.extension.push.apply(files.extension, extension);
    files.mime.push.apply(files.mime, mime);
});

class DsvEngine extends Engine {
    constructor () {
        super(...arguments);
        this.createDocument = createDocument;
        this.files = files;
    }

    isCsv () {
        return Boolean(this.file && Engine.validateFile(this.file, csvFiles));
    }

    isTsv () {
        return Boolean(this.file && Engine.validateFile(this.file, tsvFiles));
    }

    static test (file) {
        return Boolean(file && Engine.validateFile(file, files));
    }
}

DsvEngine.mimeTypes = files.mime.slice(0);
defineEngine(DsvEngine);

export default DsvEngine;