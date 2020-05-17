const _T = require('../src/tape');

test('basic write', () => {
	let t = new _T.Tape(11);
	t.write("foo");

	expect(t.mem.get(t.index)).toBe("foo");
});


test('basic read', () => {
	let t = new _T.Tape(11);
	t.write("foo");

	expect(t.read()).toBe("foo");
	expect(t.readAt(1)).toBe("");
});


test('test move', () => {
	let t = new _T.Tape(11);
	t.write("a");

	for (var i = 0; i < 20; i++)
		t.moveRight();

	t.write("b");
	expect(t.read()).toBe("b");
	expect(t.index).toBe(-20);
	expect(t.mem.get(t.index)).toBe(t.read());

	for (var i = 0; i < 20; i++)
		t.moveLeft();

	expect(t.index).toBe(0);
	expect(t.read()).toBe("a");
	expect(t.readAt(-20)).toBe("b");
});


