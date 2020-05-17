const _M = require('../src/main');
const _T = require('../src/tape');
const _I = require('../src/userInput');


test('basic parse', () => {
	const sample = "wrt a";
	let t = new _T.Tape(15);
	let IN = _I.InputFactory.getInstance(sample);

	_M.parseNext(IN, t);

	expect(t.read()).toBe("a");
	_I.InputFactory.clear();
});


test('multiple lines', () => {
	const sample = "wrt a\nmov l\nmov l\nwrt b\nmov r\nmov r\n";
	let t = new _T.Tape(15);
	let IN = _I.InputFactory.getInstance(sample);

	_M.parseNext(IN, t);
	expect(t.read()).toBe("a");
	_M.parseNext(IN, t);
	expect(t.read()).toBe("");
	_M.parseNext(IN, t);
	expect(t.read()).toBe("");
	expect(t.index).toBe(2);
	_M.parseNext(IN, t);
	expect(t.read()).toBe("b");
	_M.parseNext(IN, t);
	_M.parseNext(IN, t);
	expect(t.read()).toBe("a");

	_I.InputFactory.clear();
});


test('test read', () => {
	const sample = "red a\nwrt a\nred a wrt b\n";
	let t = new _T.Tape(15);
	let IN = _I.InputFactory.getInstance(sample);

	_M.parseNext(IN, t);
	expect(t.read()).toBe("");
	expect(t.index).toBe(0);
	_M.parseNext(IN, t);
	_M.parseNext(IN, t);
	expect(t.read()).toBe("b");

	_I.InputFactory.clear();
});


test('test loop', () => {
	const sample = "mov r";
	let t = new _T.Tape(15);
	let IN = _I.InputFactory.getInstance(sample);

	for(var i = 0; i < 20; i++){
		_M.parseNext(IN, t);
	}

	expect(t.index).toBe(-20);

	_I.InputFactory.clear();
});


