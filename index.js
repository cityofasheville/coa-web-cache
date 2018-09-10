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
    return Promise.resolve('OK');
  }

  get(key) {
    return Promise.resolve(this.cache.get(key));
  }

  mget(keys) { // Array of keys
    return Promise.resolve(keys.map(key => this.cache.get(key)));
  }

  del(key) {
    this.cache.del(key);
    return Promise.resolve(1);
  }

  peek(key) {
    return Promise.resolve(this.cache.peek(key));
  }
}

module.exports = new CacheClient();


