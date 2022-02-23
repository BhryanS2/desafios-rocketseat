import { fetchGithub } from "../fetch/index.js";
import { style as getStyle } from "./style.js";

class Profile extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const github = new fetchGithub();
    github.get().then(user => {
      user['job'] = ''
      const section = this.createHTML(user);
      const style = document.createElement('style');
      style.textContent = getStyle();
      shadow.appendChild(style);
      shadow.appendChild(section);
    });
  }
  createHTML(user) {
    const section = document.createElement('section');
    section.classList.add('profile-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const img = document.createElement('img');
    img.src = user.avatar_url
    img.alt = user.name;
    imageContainer.appendChild(img);

    const h1 = document.createElement('h1');
    h1.innerText = user.name;
    const h2 = document.createElement('h2');
    h2.innerText = user.job;

    section.appendChild(imageContainer);
    section.appendChild(h1);
    section.appendChild(h2);

    return section;

  }
}

customElements.define('profile-element', Profile);