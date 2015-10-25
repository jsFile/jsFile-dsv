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
        let isNotEmpty = false;
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

        page.children.push(table);
        table.children.push(content);
        content.children.push(row);
        row.children.push(cell);

        while (i < length) {
            if (ch === '#' && !cell.properties.textContent) {
                comment = true;
            } else if (ch === newLineDelimiter) {
                if (!comment) {
                    row = Document.elementPrototype;
                    cell = Document.elementPrototype;
                    row.properties.tagName = 'TR';
                    cell.properties.tagName = 'TD';

                    row.children.push(cell);
                    content.children.push(row);
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
                    cell = Document.elementPrototype;
                    cell.properties.tagName = 'TD';
                    row.children.push(cell);

                    // -1 because we make i++ each iteration
                    i += delimiterLen - 1;
                } else {
                    isNotEmpty = isNotEmpty || Boolean(ch);
                    cell.properties.textContent += ch;
                }
            }

            i++;
            ch = text[i];
        }

        //remove all rows if table is empty
        if (!isNotEmpty) {
            content.children = [];
        }

        resolve(new Document({
            meta: {
                name: this.fileName
            },
            content: [page],
            styles: [
                {
                    selector: 'table',
                    properties: {
                        borderCollapse: 'collapse'
                    }
                },
                {
                    selector: 'table td, table th',
                    properties: {
                        borderWidth: {
                            value: 1,
                            unit: 'pt'
                        },
                        borderStyle: 'solid',
                        borderColor: '#000000',

                    }
                }
            ]
        }));
    }.bind(this));
}