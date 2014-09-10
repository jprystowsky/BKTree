(function () {
	'use strict';

	var _ = require('lodash'),
		Node = require('./src/node'),
		Tree = require('./src/tree'),
		util = require('util'),
		argv = require('optimist').argv;

	if (!_.isString(argv.term) || !_.isNumber(argv.dist)) {
		console.log("Usage: --term term --dist distance");
		process.exit(1);
	}

	// Stupid random hard-coded corpus that can/should be replaced with reading from input file
	var knownWords = 'alphba alpine aspirin abracadabra bat beach butcher baseball blob copy clobber cougar candy cart camera daft daffy drab dreary dream drunk elephant eskimo equine esquire frag fantasy flop flipper grand graceful great gobble hip hunk hurl hurdle inquire incline igloo just jerk jam jar junk kangaroo large leaping lizard mongoose monorail mono mink monk new noodle noose neck orangutan orange old peak pip pit plop quagmire quark quick rut rung ralph stupid silly sexy serpent true test taste tongue top ugly ultimate urge view very vanish varnish velvet velcro wick wax wet wrung wrought xylophone young yes yellow zebra zed'.split(' ');

	// Build a BK tree
	var tree = new Tree();
	_(knownWords).forEach(function (word) {
		var node = new Node();
		node.word = word;
		tree.addNode(node);
	});

	// Create the start node
	var startNode = new Node();
	startNode.word = argv.term;

	if (argv.debug) {
		console.log("Created tree\n", util.inspect(tree, { depth: null, colors: true }));
	}

	console.log("Searching for", startNode, "within", argv.dist, "and found", tree.search(startNode, argv.dist));
})();