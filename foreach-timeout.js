'use strict';

function forEachTimeout (arr, callback, TIMEOUT = 1000) {
  if (Array.isArray(arr)) {
    return new Promise(
      resolve => {
	      const MAX      = arr.length - 1,
	            promises = [];

        let timer    = setTimeout(tick, TIMEOUT),
            i        = 0;
  
        function tick () {
          if (i <= MAX) {
            promises.push(
                Promise.resolve(callback(arr[i], i, arr))
                .then(
                    data => {
                      i++;
                      timer = setTimeout(tick, TIMEOUT);
                      return data;
                    }
                )
                .catch(
                    err => {
                      i++;
                      timer = setTimeout(tick, TIMEOUT);
                      return err;
                    }
                )
            )
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
