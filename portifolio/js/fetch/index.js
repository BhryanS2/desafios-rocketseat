import { userName } from "./getUserName.js";
import { toRespose } from "./promisse.js";

export class fetchGithub {
  constructor(options) {
    this.options = options;
    this.url = 'https://api.github.com/users/';
    this.userName = userName;
  }

  async get() {
    const url = `${this.url}${this.userName}`;
    const promise = fetch(url, this.options);
    const [error, respose] = await toRespose(promise);
    if (error) {
      throw error;
    }
    const data = respose.json();
    return data;
  }

  async getRepos(searchNumber = 5) {
    const url = `${this.url}${this.userName}/repos`;
    const promise = fetch(url, this.options);
    const [error, respose] = await toRespose(promise);
    if (error) {
      throw error;
    }
    const data = Array.from(await respose.json());
    return data.slice(0, searchNumber);
  }

}