# forEachTimeout

[![NPM](https://nodei.co/npm/foreach-timeout.png)](https://npmjs.org/package/foreach-timeout)

Run callback on every array element and return array of callback results with promise

## Goal

Sometimes you need to run handler on array with timeouts. For example when you parse web pages you need to pause before getting next page to prevent server from shutting down. 
That is why `forEachTimeout` is developed.

## Example usage

```js
forEachTimeout(
  [1, 2, 5, 'foo'], // Array to handle
  e => Promise.resolve(e + ' bar'), // Handler function
  1000 // Timeout in ms between runs
)
.then( // After 4 seconds
  results => {
    console.info('results', results); // ['1 bar', '2 bar', '5 bar', 'foo bar']
  }
);
```
