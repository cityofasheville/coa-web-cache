const LRU = require('lru-cache');
const defaultOptions = {
  max: 1024 * 250,
  length: function (val, key) { return (val.length + key.length) },
  maxAge: 1000 * 60 * 60 * 24,
};

class CacheClient {
  constructor(options = null) {
    this.cache = LRU(options || defaultOptions);
  }

  store(key, value, hours) {
    this.cache.set(key, value);
  }

  get(key) {
    return this.cache.get(key);
  }

  del(key) {
    this.cache.del(key);
  }

  peek(key) {
    return this.cache.peek(key);
  }
}

module.exports = CacheClient;


