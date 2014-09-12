(function () {
	'use strict';

	var _ = require('lodash'),
		Node = require('./src/node'),
		Tree = require('./src/tree'),
		util = require('util'),
		fs = require('fs'),
		argv = require('optimist').argv,
		recursive = require('recursive-readdir');

	if (!_.isString(argv.term) || !_.isNumber(argv.dist) || !_.isString(argv.words)) {
		console.log("Usage: --words wordFile --term searchTerm --dist maxDistance [--debug [--show-tree]]");
		process.exit(1);
	}

	readFiles(argv.words, function (fileArray) {
		processFiles(fileArray, function (tree) {
			if (argv.debug && argv['show-tree']) {
				console.log("Created tree\n", util.inspect(tree, { depth: null, colors: true }));
			}

			var startNode = new Node();
			startNode.word = argv.term.toLowerCase();

			searchTree(tree, startNode, argv.dist);
		});
	});

	function readFiles(inputPath, cb) {
		fs.stat(inputPath, function (err, stats) {
			if (err) {
				console.log(err);
				process.exit(1);
			}

			if (stats.isDirectory()) {
				recursive(argv.words, function (err, files) {
					if (err) {
						console.log(err);
						process.exit(1);
					}

					cb(files);
				});
			} else if (stats.isFile()) {
				cb([argv.words]);
			} else {
				console.log(argv.words, "should be either a dir or a file");
				process.exit(1);
			}
		});
	}

	function processFiles(files, cb) {
		var tree = new Tree();

		_(files).forEach(function (file) {
			if (argv.debug) {
				console.log("Reading from", file, "...");
			}

			var data = fs.readFileSync(file, { encoding: 'utf8' });
			if (argv.debug) {
				console.log("Adding to tree...");
			}

			_(data.split(/[^\w\d]+/)).forEach(function (word) {
				if (_.isString((word)) && word.length > 0) {
					var node = new Node();
					node.word = word.toLowerCase();
					tree.addNode(node);
				}
			});
		});

		cb(tree);
	}

	function searchTree(tree, node, distance) {
		if (argv.debug) {
			console.log("Searching...");
		}

		var searchResults = tree.search(node, distance);

		console.log("Searched for", node, "within distance", distance, "and found", searchResults);
	}
})();
