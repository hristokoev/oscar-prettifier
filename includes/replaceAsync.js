const replaceAsync = (string, searchValue, replacer) => {
	try {
		if (typeof replacer === "function") {
			var values = [];
			String.prototype.replace.call(string, searchValue, function () {
				values.push(replacer.apply(undefined, arguments));
				return "";
			});
			return Promise.all(values).then(function (resolvedValues) {
				return String.prototype.replace.call(string, searchValue, function () {
					return resolvedValues.shift();
				});
			});
		} else {
			return Promise.resolve(
				String.prototype.replace.call(string, searchValue, replacer)
			);
		}
	} catch (error) {
		return Promise.reject(error);
	}
}