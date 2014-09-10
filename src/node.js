(function () {
	'use strict';

	var _ = require('lodash');

	function Node() {}

	Node.prototype.addChild = function (child, givenDist) {
		if (!_.isObject(this.children)) {
			this.children = {};
		}

		if (child instanceof Node) {
			var childDistance;

			if (!_.isNumber(givenDist)) {
				childDistance = this.distanceTo(child);
			} else {
				childDistance = givenDist;
			}

			this.children[childDistance] = child;
		}
	};

	Node.prototype.hasEdge = function (distance) {
		// Note that distance will be an integer but JS stores objects with integral keys as stringified integers!
		return _(this.children).keys().contains(distance.toString());
	};

	Node.prototype.distanceTo = function (otherNode) {
		if (otherNode instanceof Node) {
			if (this.word.length === 0 || otherNode.word.length === 0) {
				return Math.max(this.word.length, otherNode.word.length);
			}

			// Build the zero matrix
			var d = [];
			for (var zeroI = 0; zeroI < this.word.length + 1; zeroI++) {
				d[zeroI] = [];

				for (var zeroJ = 0; zeroJ < otherNode.word.length + 1; zeroJ++) {
					d[zeroI][zeroJ] = 0;
				}
			}

			// Initialize the matrix
			for (var initI = 0; initI <= this.word.length; initI++) {
				for (var initJ = 0; initJ <= otherNode.word.length; initJ++) {
					d[0][initJ] = initJ;
				}

				d[initI][0] = initI;
			}

			for (var i = 1; i <= this.word.length; i++) {
				for (var j = 1; j <= otherNode.word.length; j++) {
					var match = (this.word[i - 1] === otherNode.word[j - 1]) ? 0 : 1;

					d[i][j] = Math.min(Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1), d[i - 1][j - 1] + match);
				}
			}

			return d[this.word.length][otherNode.word.length];
		}
	};

	module.exports = Node;
})();