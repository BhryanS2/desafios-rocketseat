import { userName } from "../fetch/getUserName.js";
import { SearchApi } from "./searchApi.js";

class Repository {
  constructor() {
    this.shadowRoot = document.querySelector('.repos-main');
    const linkToGithubEl = document.querySelector('.projects-title a');
    linkToGithubEl.attributes.href.value = `https://github.com/${userName}`;
    const searchApi = new SearchApi();
    searchApi.PromisesResolve()
      .then(repos => {
        const shadowRoot = this.shadowRoot;
        const sections = repos.map(repo => this.createHTML(repo));
        sections.forEach(section => shadowRoot.appendChild(section));

      });
  }

  createHTML(repos) {
    const section = document.createElement("section");
    const header = document.createElement("header");
    const icon = document.createElement("i");
    const h2 = document.createElement("h2");
    const main = document.createElement("main");
    const p = document.createElement("p");
    const footer = document.createElement("footer");
    const actions = document.createElement("div");
    const stars = document.createElement("div");
    const starIcon = document.createElement("i");
    const starP = document.createElement("p");
    const forks = document.createElement("div");
    const forkIcon = document.createElement("i");
    const forkP = document.createElement("p");
    const tech = document.createElement("div");
    const color = document.createElement("div");
    const techP = document.createElement("p");
    const lenguageName = String(repos.tech).toLowerCase();

    h2.innerText = repos.name;
    techP.innerText = repos.tech;
    forkP.innerText = repos.forks;
    starP.innerText = repos.stars;
    p.innerText = repos.description;


    // class
    header.classList.add("repo-title");
    icon.classList.add("fa-solid", "fa-folder");
    main.classList.add("repo-description");
    footer.classList.add("repo-footer");
    actions.classList.add("actions-repo");
    stars.classList.add("repo-stars");
    starIcon.classList.add("fa-regular", "fa-star");
    forks.classList.add("repo-forks");
    forkIcon.classList.add("fa-solid", "fa-code-fork");
    tech.classList.add("repo-main-tech");
    color.classList.add("color-tech", lenguageName === 'c++' ? 'cpp' : lenguageName);
    techP.classList.add("repo-tech");
    section.classList.add("repo", "card");

    // appendChildheader.appendChild(icon);
    header.appendChild(icon);
    header.appendChild(h2);
    section.appendChild(header);
    main.appendChild(p);
    section.appendChild(main);
    stars.appendChild(starIcon);
    stars.appendChild(starP);
    actions.appendChild(stars);
    forks.appendChild(forkIcon);
    forks.appendChild(forkP);
    actions.appendChild(forks);
    footer.appendChild(actions);
    tech.appendChild(color);
    tech.appendChild(techP);
    footer.appendChild(tech);
    section.appendChild(footer);

    // event
    section.addEventListener("click", () =>
      window.open(repos.url, "_blank"));
    return section;
  }


}

new Repository();