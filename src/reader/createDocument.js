import JsFile from 'JsFile';
const {Document} = JsFile;
const quote = '"';

/**
 * @description Find delimiter of lines
 * @param text {String}
 * @returns {String}
 */
function getNewLineDelimiter (text) {
    text = text.substr(0, 1024 * 1024);	// max length 1 MB
    const r = text.split('\r');
    const len = r.length;

    if (len === 1) {
        return '\n';
    }

    let nCount = 0;
    for (let i = 0; i < len; i++) {
        if (r[i][0] === '\n') {
            nCount++;
        }
    }

    return nCount >= (len / 2) ? '\r\n' : '\r';
}

/**
 *
 * @param text {String}
 * @private
 */
export default function (text) {
    return new Promise(function (resolve) {
        const delimiterType = this.isTsv() ? 'tab' : 'comma';
        const newLineDelimiter = getNewLineDelimiter(text);
        const length = text.length;
        const table = Document.elementPrototype;
        const content = Document.elementPrototype;
        let delimiter = ',';
        let comment = false;
        let i = 0;
        let ch = text[i];
        let quotesCount = 0;
        let delimiterLen;
        let page = Document.elementPrototype;
        let cell = Document.elementPrototype;
        let row = Document.elementPrototype;

        if (delimiterType === 'tab') {
            delimiter = '\t';
        }

        delimiterLen = delimiter.length;
        table.properties.tagName = 'TABLE';
        content.properties.tagName = 'TBODY';
        row.properties.tagName = 'TR';
        cell.properties.tagName = 'TD';

        while (i < length) {
            if (ch === '#' && !cell.properties.textContent) {
                comment = true;
            } else if (ch === newLineDelimiter) {
                if (!comment) {
                    row.children.push(cell);
                    content.children.push(row);
                    row = Document.elementPrototype;
                    row.properties.tagName = 'TR';
                }

                comment = false;
                quotesCount = 0;
            } else if (!comment) {
                if (ch === quote) {
                    quotesCount++;
                } else if (
                    quotesCount % 2 === 0 &&
                    ((ch === delimiter) || (ch === delimiter[0] && text.substr(i, delimiterLen) === delimiter))
                ) {
                    row.children.push(cell);
                    cell = Document.elementPrototype;
                    cell.properties.tagName = 'TD';

                    // -1 because we make i++ each iteration
                    i += delimiterLen - 1;
                } else {
                    cell.properties.textContent += ch;
                }
            }

            i++;
            ch = text[i];
        }

        table.children.push(content);
        page.children.push(table);

        resolve(new Document({
            meta: {
                name: this.fileName
            },
            content: [page]
        }));
    }.bind(this));
}