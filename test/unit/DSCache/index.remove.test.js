describe('DSCache.remove(key)', function () {
	it('should remove the item with the specified key.', function () {
		var cache = DSCacheFactory('cache');
		var value1 = 'value1',
			value2 = 2,
			value3 = {
				value3: 'stuff'
			};
		cache.put('item1', value1);
		cache.put('item2', value2);
		cache.put('item3', value3);
		cache.remove('item1');
		assert.isUndefined(cache.get('item1'));
		cache.remove('item2');
		assert.isUndefined(cache.get('item2'));
		cache.remove('item3');
		assert.isUndefined(cache.get('item3'));
	});
	it('should reduce the size of the cache by one if the size is greater than zero.', function () {
		var cache = DSCacheFactory('cache');
		cache.put('item1', 'value1');
		assert.equal(cache.info().size, 1);
		cache.put('item2', 'value2');
		assert.equal(cache.info().size, 2);
		cache.remove('item1');
		assert.equal(cache.info().size, 1);
		cache.remove('item2');
		assert.equal(cache.info().size, 0);
		cache.remove('item1');
		assert.equal(cache.info().size, 0);
		cache.remove('item2');
		assert.equal(cache.info().size, 0);
	});
	it('should remove items from localStorage when storageMode is used.', function () {
		var localStorageCache = DSCacheFactory('localStorageCache', { storageMode: 'localStorage', storageImpl: $window.localStorage }),
			sessionStorageCache = DSCacheFactory('sessionStorageCache', { storageMode: 'sessionStorage', storageImpl: $window.sessionStorage });

		localStorageCache.put('item1', 'value1');
		sessionStorageCache.put('item1', 'value1');

		assert.equal(angular.fromJson($window.localStorage.getItem(localStorageCache.$$storagePrefix + 'localStorageCache.data.item1')).value, 'value1');
		assert.equal($window.localStorage.getItem(localStorageCache.$$storagePrefix + 'localStorageCache.keys'), '["item1"]');
		assert.equal(angular.fromJson($window.sessionStorage.getItem(sessionStorageCache.$$storagePrefix + 'sessionStorageCache.data.item1')).value, 'value1');
		assert.equal($window.sessionStorage.getItem(sessionStorageCache.$$storagePrefix + 'sessionStorageCache.keys'), '["item1"]');

		localStorageCache.remove('item1');
		sessionStorageCache.remove('item1');

		assert.isNull(angular.fromJson($window.localStorage.getItem(localStorageCache.$$storagePrefix + 'localStorageCache.data.item1')));
		assert.equal($window.localStorage.getItem(localStorageCache.$$storagePrefix + 'localStorageCache.keys'), '[]');
		assert.isNull(angular.fromJson($window.sessionStorage.getItem(sessionStorageCache.$$storagePrefix + 'sessionStorageCache.data.item1')));
		assert.equal($window.sessionStorage.getItem(sessionStorageCache.$$storagePrefix + 'sessionStorageCache.keys'), '[]');
	});
});
