/*global window*/
var _sorter = function(a, b) {
	return a * 1 > b * 1 ? 1 : -1
}
var _reverser = function(a, b) {
	return a * 1 > b * 1 ? -1 : 1
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
			i = i - 1
		})
		return copy
	} else {
		return array
	}
}
var sum = function(array) {
	return array ? array.reduce(function(memo, num) {
		return parseFloat(num) + memo
	}, 0) : 0
}
var subsets = function(array, block, skip) {
	var control;
	var _subsets = function(array, skip, block) {
		skip = skip || 0
		if (block(array)) { return true }
		if (!array) { return }
		for (var i = array.length - 1; i >= skip; i = i - 1) {
			if (!control) {
				var first = array.slice(0)
				var second = first.splice(i).splice(1)
				control = _subsets(first.concat(second), i, block) ? true : control
			}
		}
	}
	return _subsets(array, skip, block)
}

var subset_sum = function(values, want) {

	var sums     = {},
		comb       = {},
		l          = Math.floor(values.length / 2),
		sum_subset = null,
		first      = values.slice(0, l),
		second     = values.slice(l)

		//calculate a subset sum to want value
		subsets(first, function(subset) {
			sums[sum(subset)] = subset
		})

		if (!(sum_subset = sums[want])) {
			subsets(second, function(subset) {
				var snd_half = sums[want - sum(subset)]
				if(snd_half) {
					sum_subset = snd_half.concat(subset)
					return sum_subset
				}
			})
		}

		// calculate the sum of all combinations
		subsets(sum_subset, function(subset) {
			if(subset && subset.length) {
				var sum_of_all = sum(subset)
				if(values.indexOf(sum_of_all) != -1) {
					(comb[sum_of_all] || (comb[sum_of_all] = [])).push(subset)
				}
			}
		})

		// optimize the combinations: choose greater values when possible
		Object.keys(comb).sort(_reverser).forEach(function(key) {
			key = key * 1
			comb[key].forEach(function(set) {
				var copy = removeOnceAndExactly(sum_subset, set)
				if(copy) {
					(sum_subset = copy).push(key)
				}
			})
		})

		return sum_subset// ? sum_subset.sort(_sorter).reverse() : []

}
var distributePlates = function(bars, target, filled) {
	var result = []
	bars = bars.concat(bars)
	if(filled) {
		target = target - sum(filled)
		result = result.concat(filled)
	}
	return result.concat(subset_sum(bars, target))
}

module.exports = {
	subsets : subsets,
	sum : sum,
	_sorter : _sorter,
	_reverser : _reverser,
	indexesOf : indexesOf,
	removeOnceAndExactly : removeOnceAndExactly,
	subset_sum : subset_sum,
	distributePlates : distributePlates
}

