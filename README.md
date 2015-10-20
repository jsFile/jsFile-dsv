# jsFile-dsv [![Build Status](https://secure.travis-ci.org/jsFile/jsFile-dsv.png?branch=master)](https://travis-ci.org/jsFile/jsFile-dsv)
Engine for jsFile library for working with documents in [DSV](https://en.wikipedia.org/wiki/Delimiter-separated_values) format (like .csv, .tsv)

## Installation
### via NPM

You can install a <code>jsFile-dsv</code> package very easily using NPM. After
installing NPM on your machine, simply run:
````
$ npm install jsfile-dsv
````

### with Git

You can clone the whole repository with Git:
````
$ git clone git://github.com/jsFile/jsFile-dsv.git
````

### from latest version

Also you can download [the latest release](https://github.com/jsFile/jsFile-dsv/tree/master/dist) of `DSV` engine and include built files to your project.


##Usage
````js
import JsFile from 'JsFile';
import JsFileDsv from 'jsfile-dsv';

const jf = new JsFile(file, options);
````
`file` - a file of [DSV](https://en.wikipedia.org/wiki/Delimiter-separated_values) type. You may find information about options and `jsFile` in [documentation](https://github.com/jsFile/jsFile#installation)