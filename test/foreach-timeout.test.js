'use strict';

const chai           = require('chai'),
      forEachTimeout = require('./../foreach-timeout'),
      assert         = chai.assert;

describe(
		'forEachTimeout', () => {
			
			it(
					'Is function',
					() =>
							assert.isFunction(forEachTimeout)
			);
			
			it(
					'Returns Promise',
					() =>
							assert.instanceOf(forEachTimeout(), Promise)
			);
			
			it(
					'Correct result',
					done => {
						forEachTimeout(
								[1, 'foo'],
								e => Promise.resolve(e + ' bar'),
								50
						)
								.then(
										results => {
											assert.equal(
													JSON.stringify(results),
													JSON.stringify(['1 bar', 'foo bar'])
											);
											
											done();
										}
								);
					}
			);
			
			it(
					'Correct timeout',
					done => {
						const TIMEOUT    = 180,
						      INPUT_ARR  = [1, 2, 3, 4, 5],
						      iterations = [],
						      start      = new Date();
						
						forEachTimeout(
								INPUT_ARR,
								e => {
									iterations.push(new Date());
									return e;
								},
								TIMEOUT
						)
								.then(
										() => {
											iterations.forEach(
													(time, i, arr) => {
														let prevTime      = i === 0
																    ? start
																    : arr[i - 1],
														    executionTime = time - prevTime;
														
														assert.isAtLeast(executionTime, TIMEOUT);
														assert.isAtMost(executionTime, TIMEOUT * 2);
													}
											);
											
											done();
										}
								);
					}
			);
			
		}
);
