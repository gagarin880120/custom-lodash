const methods = require('./lodash-methods');

test(`chunk function creates an array of elements split into groups the length of size. 
If array can't be split evenly, the final chunk will be the remaining elements.`, () => {
  expect(methods.chunk(['a', 'b', 'c', 'd'], 2)).toStrictEqual([['a', 'b'], ['c', 'd']]);
  expect(methods.chunk(['a', 'b', 'c', 'd'], 3)).toStrictEqual([['a', 'b', 'c'], ['d']]);
  expect(methods.chunk(['a', 'b', 'c', 'd'])).toStrictEqual([['a'], ['b'], ['c'], ['d']]);
  expect(methods.chunk(['a', 'b', 'c', 'd'], 5)).toStrictEqual([['a', 'b', 'c', 'd']]);
  expect(methods.chunk('34', 2)).toStrictEqual([['3', '4']]);
  expect(methods.chunk([1, 2, 3], 0)).toStrictEqual([]);
  expect(methods.chunk(3, 2)).toStrictEqual([]);
  expect(methods.chunk(false)).toStrictEqual([]);
  expect(methods.chunk([])).toStrictEqual([]);
  expect(methods.chunk({ a: 10, b: '12' })).toStrictEqual([]);
});

test(`compact function creates an array with all falsey values removed. 
The values false, null, 0, "", undefined, and NaN are falsey.`, () => {
  expect(methods.compact(['a', '', 1, 0])).toStrictEqual(['a', 1]);
  expect(methods.compact(['', 0, false])).toStrictEqual([]);
  expect(methods.compact(['15', null, 10, NaN])).toStrictEqual(['15', 10]);
  expect(methods.compact(['a', 'f', 1, true])).toStrictEqual(['a', 'f', 1, true]);
  expect(methods.compact({ a: 0 })).toStrictEqual([]);
  expect(methods.compact([])).toStrictEqual([]);
  expect(methods.compact('aavad')).toStrictEqual(['a', 'a', 'v', 'a', 'd']);
});

test(`drop function creates a slice of array with n elements dropped from the beginning.`, () => {
  expect(methods.drop([1, 2, 3])).toStrictEqual([2, 3]);
  expect(methods.drop(['a', 'b', 'c', 'd'], 2)).toStrictEqual(['c', 'd']);
  expect(methods.drop([1, 2, 3], 0)).toStrictEqual([1, 2, 3]);
  expect(methods.drop('12', 0)).toStrictEqual(['1', '2']);
  expect(methods.drop([1, 2, 3], 3)).toStrictEqual([]);
  expect(methods.drop(12, 2)).toStrictEqual([]);
  expect(methods.drop(true, 2)).toStrictEqual([]);
  expect(methods.drop('Mandalorian', 8)).toStrictEqual(['i', 'a', 'n']);
});

test(`dropWhile function creates a slice of array excluding elements dropped from the beginning. 
Elements are dropped until predicate returns falsey.`, () => {
  expect(methods.dropWhile([
    { 'user': 'barney',  'active': false },
    { 'user': 'fred',    'active': false },
    { 'user': 'pebbles', 'active': true }
  ], (v) => !v.active)).toStrictEqual([ { user: 'pebbles', active: true } ]);
  expect(methods.dropWhile([1, 2, 3, 4, 1], (v) => v < 2)).toStrictEqual([ 2, 3, 4, 1 ]);
  expect(methods.dropWhile('Hold Your Color', (v) => v === v.toUpperCase())).toStrictEqual([ 'o', 'l', 'd', ' ', 'Y', 'o', 'u', 'r', ' ', 'C', 'o', 'l', 'o', 'r' ]);
  expect(methods.dropWhile({a: 5, b: 10}, (v) => v % 2)).toStrictEqual([]);
  expect(methods.dropWhile(10, (v) => v > 2)).toStrictEqual([]);
});

test(`take function creates a slice of array with n elements taken from the beginning.`, () => {
  expect(methods.take([1, 2, 3])).toStrictEqual([1]);
  expect(methods.take([1, 2, 3], 2)).toStrictEqual([1, 2]);
  expect(methods.take([1, 2, 3], 5)).toStrictEqual([1, 2, 3]);
  expect(methods.take([1, 2, 3], 0)).toStrictEqual([]);
  expect(methods.take(true, 2)).toStrictEqual([]);
  expect(methods.take('Little Yoda', 3)).toStrictEqual(['L', 'i', 't']);
});

test(`filter function iterates over elements of collection, returning an array of all elements predicate returns truthy for.`, () => {
  expect(methods.filter([1, 2, 3, 4], (v) => v > 2)).toStrictEqual([ 3, 4 ]);
  expect(methods.filter({a: 10, b: 12, c: 9}, (v) => !(v % 2))).toStrictEqual([ 10, 12 ]);
  expect(methods.filter('Stormtroopers', (v) => v !== 'o')).toStrictEqual([ 'S', 't', 'r', 'm', 't', 'r', 'p', 'e', 'r', 's' ]);
  expect(methods.filter(12, (v) => v > 2)).toStrictEqual([]);
  expect(methods.filter(null, (v) => v !== 3)).toStrictEqual([]);
});

test(`find function iterates over elements of collection, returning the first element predicate returns truthy for.`, () => {
  expect(methods.find([1, 2, 3], (v) => v > 2)).toStrictEqual(3);
  expect(methods.find([1, 9, 3], (v) => !(v % 3))).toStrictEqual(9);
  expect(methods.find([1, 9, 3], (v) => !(v % 3), 2)).toStrictEqual(3);
  expect(methods.find([1, 9, 3], (v) => !(v % 2))).toStrictEqual(undefined);
  expect(methods.find([1, 4, 8], (v) => !(v % 2), -1)).toStrictEqual(8);
  expect(methods.find(12, (v) => v === 12)).toStrictEqual(undefined);
  expect(methods.find({a: 10, b: 5}, (v) => v !== 5)).toStrictEqual(10);
  expect(methods.find({a: 10, b: 5}, (v) => v > 15)).toStrictEqual(undefined);
  expect(methods.find('Godzilla', (v) => v === v.toUpperCase())).toStrictEqual('G');
  expect(methods.find('Godzilla', (v) => v === v.toUpperCase(), 3)).toStrictEqual(undefined);
  expect(methods.find('Godzilla', (v) => v === v.toUpperCase(), -3)).toStrictEqual(undefined);
});

test(`includes function checks if value is in collection. If collection is a string, it's checked for a substring of value.
 If third argument is negative, it's used as the offset from the end of collection.`, () => {
  expect(methods.includes([1, 2, 3], 1)).toStrictEqual(true);
  expect(methods.includes([1, 2, 3], 1, 2)).toStrictEqual(false);
  expect(methods.includes([1, 2, 3], 2, -2)).toStrictEqual(true);
  expect(methods.includes({ 'a': 1, 'b': 2 }, 1)).toStrictEqual(true);
  expect(methods.includes({ 'a': 1, 'b': 2 }, 2, -1)).toStrictEqual(true);
  expect(methods.includes({ 'a': 1, 'b': 2 }, 'a')).toStrictEqual(false);
  expect(methods.includes('abcd', 'bc')).toStrictEqual(true);
  expect(methods.includes([1, 2, 3], 1, 2)).toStrictEqual(false);
  expect(methods.includes(10, 1)).toStrictEqual(false);
});

test(`map function creates an array of values by running each element in collection thru iteratee`, () => {
  expect(methods.map([1, 2, 3, 4], (v) => v * 2)).toStrictEqual([ 2, 4, 6, 8 ]);
  expect(methods.map({a: 8, b: 10}, (v) => v / 2)).toStrictEqual([ 4, 5 ]);
  expect(methods.map('Toss a Coin to Your Witcher', (v) => v.toUpperCase())).toStrictEqual([ 'T','O','S','S',' ','A',' ','C','O','I','N',' ','T','O',' ','Y','O','U','R',' ','W','I','T','C','H','E','R' ]);
  expect(methods.map(true, (v) => !v)).toStrictEqual([]);
  expect(methods.map(10, (v) => v + 2)).toStrictEqual([]);
});

test(`zip function creates an array of grouped elements, the first of which contains the first elements of the given arrays, 
the second of which contains the second elements of the given arrays, and so on.`, () => {
  expect(methods.zip(['a', 'b'], [1, 2], [true, false])).toStrictEqual([['a', 1, true], ['b', 2, false]]);
  expect(methods.zip(['a', 'b'], [1, 1], 12, [8])).toStrictEqual([['a', 1, 8], ['b', 1, undefined]]);
  expect(methods.zip(['a', 'b', 'c'], [1, 1], [8, 16])).toStrictEqual([ [ 'a', 1, 8 ], [ 'b', 1, 16 ], [ 'c', undefined, undefined ]]);
});

test(`merge function recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.`, () => {
  expect(methods.merge({a: 3, b: 6},{c: 7, d: 1})).toStrictEqual({ a: 3, b: 6, c: 7, d: 1 });
  expect(methods.merge({a: 3, f: 8},{b: 3, a: 5, c: 7})).toStrictEqual({ a: 5, f: 8, b: 3, c: 7 });
  expect(methods.merge({a: 3, a: 6},{c: 2, d: 4, a: 1})).toStrictEqual({ a: 1, c: 2, d: 4 });
});

test(`omit function creates an object composed of the own and inherited enumerable property paths of object that are not omitted.`, () => {
  expect(methods.omit({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c'])).toStrictEqual({ b: '2' });
  expect(methods.omit({ 'a': 1, 'b': '2', 'c': 3 }, 2)).toStrictEqual({ a: 1, b: '2', c: 3 });
  expect(methods.omit([1, 2, 4], 1)).toStrictEqual({ '0': 1, '2': 4 });
  expect(methods.omit([1, 2, 4], [0, 1])).toStrictEqual({ '2': 4 });
  expect(methods.omit('Jesus is king', [2, 7])).toStrictEqual({ '0': 'J','1': 'e','3': 'u','4': 's','5': ' ','6': 'i','8': ' ','9': 'k','10': 'i','11': 'n','12': 'g' });
  expect(methods.omit(false, 3)).toStrictEqual({});
});

test(`omitBy function creates an object composed of the own and inherited enumerable string keyed properties of object 
that predicate doesn't return truthy for.`, () => {
  expect(methods.omitBy({ 'a': 1, 'b': '2', 'c': 3 }, (v) => v > 1)).toStrictEqual({ a: 1 });
  expect(methods.omitBy({ 'a': 1, 'b': '2', 'c': 3 }, (v) => v < 1)).toStrictEqual({ a: 1, b: '2', c: 3 });
  expect(methods.omitBy([1, 2, 4], (v) => v % 2)).toStrictEqual({ '1': 2, '2': 4 });
  expect(methods.omitBy('Salem', (v) => v === v.toLowerCase())).toStrictEqual({ '0': 'S' });
  expect(methods.omitBy(null, (v) => !v === true)).toStrictEqual({});
});

test(`pick function creates an object composed of the picked object properties.`, () => {
  expect(methods.pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c'])).toStrictEqual({ a: 1, c: 3 });
  expect(methods.pick({ 'a': 1, 'b': '2', 'c': 3 }, 2)).toStrictEqual({});
  expect(methods.pick([1, 2, 4], 1)).toStrictEqual({ '1': 2 });
  expect(methods.pick('Jesus is king', [2, 7])).toStrictEqual({ '2': 's', '7': 's' });
  expect(methods.pick(false, 3)).toStrictEqual({});
});

test(`pickBy function creates an object composed of the object properties predicate returns truthy for.`, () => {
  expect(methods.pickBy({ 'a': 1, 'b': '2', 'c': 3 }, (v) => v > 1)).toStrictEqual({ b: '2', c: 3 });
  expect(methods.pickBy({ 'a': 1, 'b': '2', 'c': 3 }, (v) => v < 1)).toStrictEqual({});
  expect(methods.pickBy([1, 2, 4], (v) => v % 2)).toStrictEqual({ '0': 1 });
  expect(methods.pickBy('Salem', (v) => v === v.toLowerCase())).toStrictEqual({ '1': 'a', '2': 'l', '3': 'e', '4': 'm' });
  expect(methods.pickBy(null, (v) => !v === true)).toStrictEqual({});
});

test(`toPairs function creates an array of own enumerable string keyed-value pairs for object.`, () => {
  expect(methods.toPairs({a: 5, b: 7})).toStrictEqual([ [ 'a', 5 ], [ 'b', 7 ] ]);
  expect(methods.toPairs({j: 'e', s: 'us'})).toStrictEqual([ [ 'j', 'e' ], [ 's', 'us' ] ]);
  expect(methods.toPairs([1, 2, 3])).toStrictEqual([ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]);
  expect(methods.toPairs('Nancy')).toStrictEqual([ [ '0', 'N' ], [ '1', 'a' ], [ '2', 'n' ], [ '3', 'c' ], [ '4', 'y' ] ]);
  expect(methods.toPairs(null)).toStrictEqual([]);
});