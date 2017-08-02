function compileJsx(path) {
	return __compileJsx(path);
//	var jsx = __read(path);
//	return babel.transform(jsx).code;
}

function require(path) {
	console.log(path);
	
	var isJsx = false;
	if (path.startsWith('jsx!')) {
		path = path + '.jsx';
		isJsx = true;
	}
	
	path = path.replace('jsx!', '');
	
	if (isJsx) {
		string = compileJsx(require.basePath + path);
	} else {
		var string = __read(require.basePath + path);
		if (!string) {
			return null;
		}
	}
	
	eval(string);
	return __module(require);
}

function define(func) {
	__module = func;
}

require.basePath = '';
require.paths = [];
__cache = [];
__module = function(){};
