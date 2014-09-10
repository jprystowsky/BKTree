(function () {
	'use strict';

	var _ = require('lodash');

	function Tree() {
	}

	Tree.prototype.root = null;

	Tree.prototype.addNode = function (newNode) {
		if (_.isNull(this.root)) {
			this.root = newNode;
		} else {
			var currentNode = this.root;
			var dist = currentNode.distanceTo(newNode);
			while (currentNode.hasEdge(dist)) {
				if (dist === 0) {
					return;
				}

				currentNode = currentNode.children[dist];
				dist = currentNode.distanceTo(newNode);
			}

			currentNode.addChild(newNode, dist);
		}
	};

	Tree.prototype.search = function (searchNode, distance) {
		return recursiveSearch(this.root, searchNode, distance);
	};

	function recursiveSearch(startNode, candidateNode, distAllowance) {
		var returnWords = [];

		var currentDistance = startNode.distanceTo(candidateNode);
		var minDistance = currentDistance - distAllowance;
		var maxDistance = currentDistance + distAllowance;

		if (currentDistance <= distAllowance) {
			returnWords.push(startNode.word);
		}

		_(startNode.children).keys().filter(function (elt) {
			return elt >= minDistance && elt <= maxDistance;
		}).forEach(function (distVal) {
			returnWords = returnWords.concat(recursiveSearch(startNode.children[distVal], candidateNode, distAllowance));
		});

		return returnWords;
	}

	module.exports = Tree;
})();