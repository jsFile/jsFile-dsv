(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JsFile"));
	else if(typeof define === 'function' && define.amd)
		define(["JsFile"], factory);
	else if(typeof exports === 'object')
		exports["JsFileDsv"] = factory(require("JsFile"));
	else
		root["JsFileDsv"] = factory(root["JsFile"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _createDocument = __webpack_require__(2);

	var _createDocument2 = _interopRequireDefault(_createDocument);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Engine = _JsFile2.default.Engine;

	var csvFiles = {
	    extension: ['csv'],
	    mime: ['text/csv']
	};

	var tsvFiles = {
	    extension: ['tsv', 'tab'],
	    mime: ['text/tab-separated-values']
	};

	/**
	 * @description Supported files by engine
	 * @type {{extension: Array, mime: Array}}
	 */
	var files = {
	    extension: [],
	    mime: []
	};

	[csvFiles, tsvFiles].forEach(function (_ref) {
	    var extension = _ref.extension;
	    var mime = _ref.mime;

	    files.extension.push.apply(files.extension, extension);
	    files.mime.push.apply(files.mime, mime);
	});

	var DsvEngine = function (_Engine) {
	    _inherits(DsvEngine, _Engine);

	    function DsvEngine() {
	        _classCallCheck(this, DsvEngine);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DsvEngine).apply(this, arguments));

	        _this.createDocument = _createDocument2.default;
	        _this.files = files;
	        return _this;
	    }

	    _createClass(DsvEngine, [{
	        key: 'isCsv',
	        value: function isCsv() {
	            return Boolean(this.file && Engine.validateFile(this.file, csvFiles));
	        }
	    }, {
	        key: 'isTsv',
	        value: function isTsv() {
	            return Boolean(this.file && Engine.validateFile(this.file, tsvFiles));
	        }
	    }], [{
	        key: 'test',
	        value: function test(file) {
	            return Boolean(file && Engine.validateFile(file, files));
	        }
	    }]);

	    return DsvEngine;
	}(Engine);

	DsvEngine.mimeTypes = files.mime.slice(0);

	exports.default = DsvEngine;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = createDocument;

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Document = _JsFile2.default.Document;

	var quote = '"';

	/**
	 * @description Find delimiter of lines
	 * @param text {String}
	 * @returns {String}
	 */
	function getNewLineDelimiter(text) {
	    text = text.substr(0, 1024 * 1024); // max length 1 MB
	    var r = text.split('\r');
	    var len = r.length;

	    if (len === 1) {
	        return '\n';
	    }

	    var nCount = 0;
	    for (var i = 0; i < len; i++) {
	        if (r[i][0] === '\n') {
	            nCount++;
	        }
	    }

	    return nCount >= len / 2 ? '\r\n' : '\r';
	}

	/**
	 *
	 * @param text {String}
	 * @private
	 */
	function createDocument(text) {
	    var _this = this;

	    return new Promise(function (resolve) {
	        var delimiterType = _this.isTsv() ? 'tab' : 'comma';
	        var newLineDelimiter = getNewLineDelimiter(text);
	        var length = text.length;
	        var table = Document.elementPrototype;
	        var content = Document.elementPrototype;
	        var delimiter = ',';
	        var isNotEmpty = false;
	        var comment = false;
	        var i = 0;
	        var ch = text[i];
	        var quotesCount = 0;
	        var delimiterLen = undefined;
	        var page = Document.elementPrototype;
	        var cell = Document.elementPrototype;
	        var row = Document.elementPrototype;

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
	                } else if (quotesCount % 2 === 0 && (ch === delimiter || ch === delimiter[0] && text.substr(i, delimiterLen) === delimiter)) {
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
	                name: _this.fileName
	            },
	            content: [page],
	            styles: [{
	                selector: 'table',
	                properties: {
	                    borderCollapse: 'collapse'
	                }
	            }, {
	                selector: 'table td, table th',
	                properties: {
	                    borderWidth: {
	                        value: 1,
	                        unit: 'pt'
	                    },
	                    borderStyle: 'solid',
	                    borderColor: '#000000'
	                }
	            }]
	        }));
	    });
	}

/***/ }
/******/ ])
});
;