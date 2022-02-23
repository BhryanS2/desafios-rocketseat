export class CacheGithub {
  constructor() {
    this.storage = window.localStorage;
  }

  setCache(key, value) {
    this.storage.setItem(key, value);
  }

  getCache(key) {
    return this.storage.getItem(key);
  }
}