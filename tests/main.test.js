import {Node, Arrow, deserializeArrow} from '../src/FSS/src/elements.js';
import {Point} from '../src/FSS/src/lib/geometry.js';
import {buildFakeCanvas} from '../src/FSS/tests/common.js';
import {canvasManager} from '../src/FSS/src/canvasManager.js';

beforeEach(() => {
	canvasManager.init(buildFakeCanvas());
});


test('inject tape direction', () => {
	//inject the information on what direction the tape should be moved

	let a = new Arrow(
		new Node( new Point(0,1), "1" ),
		new Node( new Point(0,2), "2" ),
	);

	a.move_direction = "left";

	//tape info should be saved
	let data = a.serialize();
	expect(JSON.parse(data)["move_direction"]).toBe("left");

	data = deserializeArrow(data);
	expect(data["move_direction"]).toBe("left");
});


