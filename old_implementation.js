var subsetSum = function(items, target) {
		"use strict";
		var perms = []
		var layer = 0
		var depth = 35
		var attempts = 5
		var sum
		var perm
		var ss = function(items) {
				var item = items.shift();
				for(var i = 0; i < items.length; i=i+1) {
					attempts = attempts + 1;
					if(attempts <= items.length * items.length) {
						if(layer === 0) {
							perm = [items[0], items[i]];
						} else {
							perm = perms.shift();
							perm.push(items[0]);
						}
						sum = 0;
						for(var j = 0; j < perm.length; j=j+1) {
							sum += perm[j];
						}
						perms.push(perm);
						if(sum == target) {
							return perm;
						}
					} else {
						if(layer < depth) {
							attempts = 0;
							layer = layer + 1;
						} else {
							return null;
						}
					}
				}
				items.push(item);
				return ss(items);
			};
		return ss(items);
	}
var getCombinations = function(list) {
		var combinations = []; //All combinations
		var combination = []; //Single combination
		var quantity = (1 << list.length);
		for(var i = 0; i < quantity; i=i+1) {
			combination = [];
			for(var j = 0; j < list.length; j=j+1) {
				if((i & (1 << j))) {
					combination.push(list[j]);
				}
			}
			if(combination.length !== 0) {
				combinations.push(combination);
			}
		}
		return combinations;
	}
var listSum = function(list) {
		var product = 0;
		for(var i = 0; i < list.length; i=i+1) {
			product += list[i];
		}
		return product;
	}
var _sorter = function(a, b) {
		return a > b ? 1 : -1
	}
var indexesOf = function(array, values) {
		var holder = {}
		return values.map(function(v) {
			var index = array.indexOf(v, holder[v] || 0)
			holder[v] = index > -1 ? index + 1 : 0
			return index
		})
	}
var removeOnceAndExactly = function(array, values) {
		var _indexesOf = indexesOf(array, values),
			copy = array.slice(0),
			i = 0
		if(_indexesOf.indexOf(-1) == -1) {
			_indexesOf.sort(_sorter).forEach(function(value) {
				copy.splice(value + i, 1)
				i = i-1
			})
			return copy
		} else {
			return false
		}
	}
var simplifyList = function(result, bars) {
		var combinations = getCombinations(result).filter(function(line) {
			return line.length > 1
		})
		var sumOfAll = combinations.map(function(line) {
			return listSum(line)
		})
		bars.forEach(function(v) {
			sumOfAll.map(function(value, index, me) {
				return(value == v) ? index : null
			}).forEach(function(index) {
				if(!index) {
					return;
				}
				var copy = removeOnceAndExactly(result, combinations[index])
				if(copy) {
					result = copy
					result.push(v)
				}
			})

		})
		return result
	}
var distributePlates = function(bars, target) {
		for(var i = 0; i <= 1; i=i+1) {
			bars = bars.concat(bars)
		}
		var result = subsetSum(bars.slice(0), target)
		if(result !== null) {
			result = result.sort(_sorter)
			return simplifyList(result, bars)
		} else {
			return null
		}
	}

module.exports = {
	indexesOf: indexesOf,
	removeOnceAndExactly: removeOnceAndExactly,
	distributePlates : distributePlates
}
