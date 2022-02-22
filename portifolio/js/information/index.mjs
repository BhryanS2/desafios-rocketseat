import { styleInfo } from "./style.js";

class Information extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.InformationData = [
      {
        name: 'Brasil',
        icon: '<i class="fa-solid fa-location-dot"></i>',
      },
      {
        name: 'Rocketseat',
        icon: '<i class="fa-solid fa-suitcase"></i>',
      },
      {
        name: 'birobirobiro',
        icon: '<i class="fa-brands fa-github"></i>',
      },
      {
        name: 'joao-inacio-neto',
        icon: '<i class="fa-brands fa-linkedin-in"></i>',
      },
      {
        name: 'birobirobiro',
        icon: '<i class="fa-brands fa-twitter"></i>',
      },
      {
        name: 'https://birobirobiro.dev',
        icon: '<i class="fa-solid fa-globe"></i>',
      },
      {
        name: 'birobirobiro.dev@gmail.com',
        icon: '<i class="fa-regular fa-envelope"></i>',
      },
    ]

    const section = this.createHTML();
    const style = document.createElement('style');
    style.textContent = styleInfo;
    shadow.appendChild(style);
    shadow.appendChild(section);
  }

  createHTML() {

    const section = document.createElement('section');
    section.classList.add('information');
    this.InformationData.forEach((item) => {
      const link = document.createElement('a');
      link.href = '#';
      link.classList.add('information-content');
      link.target = '_blank';

      const paragraph = document.createElement('p');
      paragraph.textContent = item.name;
      link.innerHTML += item.icon;
      link.appendChild(paragraph);
      section.appendChild(link);
    });


    return section;

  }
}

customElements.define('information-element', Information);