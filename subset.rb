
bars = [20, 15, 10, 5, 4, 3, 2]
bars.concat(bars)

def subsets(array, skip = 0, &block)
	#puts "#{skip} #{array}"
	yield(array)
	(array.length-1).downto(skip){|i|
		first = array[0...i]
		second = array[i+1..-1]
		subsets(first + second, i, &block)
	}
end

def subset_sum(values, want, max_seconds=nil)
	raise(TypeError, "values must be an array of Integers") unless values.is_a?(Array)
	raise(TypeError, "want must be an Integer") unless want.is_a?(Integer)

	sums = {}
	start_time = Time.now if max_seconds
	l = values.length/2

	first = values[0...l]
	second = values[l..-1]

	subsets(first) do |subset|
		raise(TimeoutError, "timeout expired") if max_seconds and Time.now - start_time > max_seconds
		sums[sum(subset)] = subset
	end

	subsets(second) do |subset|
		raise(TimeoutError, "timeout expired") if max_seconds and Time.now - start_time > max_seconds
		if subset2 = sums[want - sum(subset)]
			#puts "-- #{subset2.inspect}"
			return subset2 + subset
		end
	end
	nil
end

def self.sum(values)
	values.inject(0){|x,y| x+=y}
end

(1..100).each do |n|
	puts subset_sum(bars, n).inspect
end
