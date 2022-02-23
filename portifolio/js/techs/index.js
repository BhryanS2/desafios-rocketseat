import { fetchGithub } from '../fetch/index.js';

class Techs {
  constructor() {
    const github = new fetchGithub();
    this.Container = document.querySelector('.techs-content');

    github.getRepos(10)
      .then(async repos => {
        const urls = repos.map(repo => repo.languages_url);
        const array = await this.createHTML(urls)
        array.forEach(item => this.Container.appendChild(item))
      })

  }

  async createHTML(repos) {
    const array = [];
    const response = await this.getTechs(repos);
    response.forEach(tech => {
      const paragraph = document.createElement('p');
      paragraph.textContent = tech;
      paragraph.classList.add('tech');
      array.push(paragraph);
    });
    return array;
  }

  async getTechs([...repos]) {
    const promises = repos.map(async url => await fetch(url));
    const responses = await Promise.all(promises);
    const responsesToJson = responses.map(response => response.json());
    const lenguages = await Promise.all(responsesToJson);
    const lenguagesReduce = lenguages.reduce((acc, curr) => {
      for (const key in curr) acc.add(key);
      return acc;
    }, new Set());
    const arrayFinal = Array.from(lenguagesReduce);
    return arrayFinal;
  }

}
new Techs();