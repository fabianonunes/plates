/*global describe,it, beforeEach*/
var subsetSum = require('../subset.js')

describe('accessory operations', function () {
	describe('#indexesOf', function () {
		it('should return an array of -1 if nothing was matched', function () {
			subsetSum.indexesOf([0, 1, 2, 3, 4, 5], [6, 7]).should.eql([-1, -1])
		})
		it('should return an array of indexes for each match', function () {
			 subsetSum.indexesOf([1, 2, 3, 4, 5], [5, 0, 2]).should.eql([4, -1, 1])
		})
	})
	describe('#removeOnceAndExactly', function () {
		it('should remove all itens once when a perfect match', function () {
			subsetSum.removeOnceAndExactly([0, 2, 4, 6, 8, 8, 6], [8, 6]).should.eql([0, 2, 4, 8, 6])
		})
		it('should return original array when a partial or nothing match', function () {
			subsetSum.removeOnceAndExactly([0, 2, 4, 6, 8, 8, 6], [8, 6, 1]).should.eql([0, 2, 4, 6, 8, 8, 6])
		});
	})
	describe('#sum', function () {
		it('should return the sum of all elements', function () {
			subsetSum.sum([1, 2, 3, 4]).should.eql(10)
		})
		it('should convert automatically strings to number', function () {
			subsetSum.sum(['1', '02', '3a']).should.eql(6)
		})
		it('should return 0 when array is empty or null', function () {
			subsetSum.sum([]).should.eql(0)
			subsetSum.sum(null).should.eql(0)
		})
	})
	describe('#sort', function () {
		it('should equals a _reverser array with a _sorter.reverse()', function () {
			[3,1,4,5,2].sort(subsetSum._reverser).should.eql([3,1,4,5,2].sort(subsetSum._sorter).reverse())
		})
	})
	describe('#subsets', function () {
		var subsets, array
		beforeEach(function () {
			subsets = [], array = ['a', 'b', 'c', 'd', 'e', 'f']
			subsetSum.subsets(array, function (subset) {
				subsets.push(subset)
			})
		})
		it('should return all k-combinations for all k', function () {
			subsets.length.should.eql(Math.pow(2, array.length))
		})
		it('should return a uniq number of combinations', function () {
			var comb = {}
			subsets.forEach(function (subset) {
				comb[subset.join(',')] = true
			})
			Object.keys(comb).length.should.eql(Math.pow(2, array.length))
		})
	})
})