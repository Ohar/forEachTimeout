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
			
		}
);
