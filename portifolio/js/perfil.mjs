import { colors } from "./constants.mjs";

class Perfil extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = this.getStyle();
    const data = {
      name: 'Bhryan',
      job: 'Desenvolvedor Web',
      image: 'https://github.com/bhryans2.png',
    };

    this.user = data;

    const section = this.createHTML(this.user);
    shadow.appendChild(style);
    shadow.appendChild(section);
  }

  getStyle() {
    const style = document.createElement('style');

    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .perfil-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 348px;
      }

      .perfil-container .image-container {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        border: 2px solid ${colors.borderImage};
        margin-bottom: 2rem;
      }

      .image-container img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .perfil-container h1 {
        font-family: "Merriweather Sans", sans-serif;
        font-weight: bold;
        font-size: 23px;
        line-height: 29px;

        color: ${colors.textColor};
      }

      .perfil-container h2 {
        font-family: "Merriweather Sans", sans-serif;
        font-weight: 300;
        font-size: 13px;
        line-height: 16px;
        color: ${colors.textColor};
      }
    `;
    return style;
  }

  createHTML(user = this.user) {
    const section = document.createElement('section');
    section.classList.add('perfil-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const img = document.createElement('img');
    img.src = user.image
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

customElements.define('perfil-element', Perfil);