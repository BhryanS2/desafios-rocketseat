import { fetchGithub } from '../fetch/index.js';

class Techs {
  constructor() {
    const github = new fetchGithub();
    this.Container = document.querySelector('.techs-content');

    github.getRepos()
      .then(async repos => {
        const [first, second] = repos;
        const array = await this.createHTML([first.languages_url, second.languages_url])
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

  async getTechs([first, second]) {
    const techs = new Set();
    const [firstLanguages, secondLanguages] = await Promise.all([
      fetch(first).then(res => res.json()),
      fetch(second).then(res => res.json())
    ]);
    const firstArray = Array.from(Object.entries(firstLanguages));
    const secondArray = Array.from(Object.entries(secondLanguages));
    const array = [...firstArray, ...secondArray];
    array.reduce((acc, [key, value]) => {
      if (value) acc.add(key);
      return acc;
    }, techs);
    return Array.from(techs);
  }

}
new Techs();