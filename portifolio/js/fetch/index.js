import { CacheGithub } from "./cache.js";
import { userName } from "./getUserName.js";
import { toRespose } from "./promisse.js";

export class fetchGithub {
  constructor(options) {
    this.options = options;
    this.url = 'https://api.github.com/users/';
    this.userName = userName;
  }

  async get() {
    const cache = new CacheGithub();
    const keyCache = `user${this.userName}@portifio-challenge`
    const cacheData = cache.getCache(keyCache);
    if (cacheData) {
      const user = JSON.parse(cacheData);
      if (user.avatar_url) {
        return user;
      }
    }
    const url = `${this.url}${this.userName}`;
    const promise = fetch(url, this.options);
    const [error, respose] = await toRespose(promise);
    if (error) {
      throw error;
    }
    const data = await respose.json();
    cache.setCache(keyCache, JSON.stringify(data));
    return data;
  }

  async getRepos(searchNumber = 5) {
    const cache = new CacheGithub();
    const keyCache = `repos${this.userName}@portifio-challenge`;
    const cacheData = cache.getCache(keyCache);
    if (cacheData) {
      const repos = JSON.parse(cacheData);
      const reposSplit = repos.slice(0, searchNumber);
      return reposSplit;
    }
    const url = `${this.url}${this.userName}/repos?sort=stargazers`;
    const promise = fetch(url, this.options);
    const [error, respose] = await toRespose(promise);
    if (error) {
      throw error;
    }
    const data = Array.from(await respose.json());
    data.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    });
    const repos = data.slice(0, searchNumber);
    cache.setCache(keyCache, JSON.stringify(data));
    return repos;
  }

  logStars(repos) {
    repos.forEach((repo) => {
      console.log(`${repo.name} has ${repo.stargazers_count} stars`);
    });
  }

}