'use strict';

function forEachTimeout (arr, callback, TIMEOUT = 1000) {
	if (Array.isArray(arr)) {
		return new Promise(
			async resolve => {
				const MAX      = arr.length - 1,
				      promises = [];

				let timer = setTimeout(tick, TIMEOUT),
				    i     = 0;

				async function tick () {
					if (i <= MAX) {
						try {
							promises.push(await callback(arr[i], i, arr));
						} catch (err) {
							promises.push(err);
						}

						i++;
						timer = setTimeout(tick, TIMEOUT);
					} else {
						clearTimeout(timer);
						resolve(Promise.all(promises));
					}
				}
			}
		);
	} else {
		return Promise.reject(new Error('Incorrect input array: ', arr));
	}
}

module.exports = forEachTimeout;
