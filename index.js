(function () {
	'use strict';

	var _ = require('lodash'),
		Node = require('./src/node'),
		Tree = require('./src/tree'),
		util = require('util'),
		fs = require('fs'),
		argv = require('optimist').argv;

	if (!_.isString(argv.term) || !_.isNumber(argv.dist) || !_.isString(argv.words)) {
		console.log("Usage: --words wordFile --term searchTerm --dist maxDistance [--debug [--show-tree]]");
		process.exit(1);
	}

	if (argv.debug) {
		console.log("Reading from", argv.words, "...");
	}

	fs.readFile(argv.words, { encoding: 'utf8' }, function (err, data) {
		if (err) {
			console.log(err);
			process.exit(1);
		}

		if (argv.debug) {
			console.log("Building tree...");
		}

		// Build a BK tree
		var tree = new Tree();
		_(data.split(/\s+/)).forEach(function (word) {
			var node = new Node();
			node.word = word.toLowerCase();
			tree.addNode(node);
		});

		if (argv.debug && argv['show-tree']) {
			console.log("Created tree\n", util.inspect(tree, { depth: null, colors: true }));
		}

		if (argv.debug) {
			console.log("Searching...");
		}

		var startNode = new Node();
		startNode.word = argv.term.toLowerCase();

		var searchResults = tree.search(startNode, argv.dist);

		console.log("Searched for", startNode, "within distance", argv.dist, "and found", searchResults);
	});
})();