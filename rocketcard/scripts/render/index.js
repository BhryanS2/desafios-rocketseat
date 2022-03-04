export class RenderCard {
  constructor(user) {
    console.log(user);
    this.#render();
  }

  #render() {
    const card = document.querySelector(".card");
    const user = {
      name: "Birobirobiro",
      followers: 716,
      following: 193,
      repository: 38,
      company: "@Rocketseat",
      location: "Bebedouro",
      image: "https://github.com/birobirobiro.png",
    }

    const map = new Map();
    // 
    // followers: 'seguidores',
    // following: 'seguindo',
    // repository: 'repositórios',
    // company: '',
    // location: '',
    map.set("followers", "Seguidores");
    map.set("following", "Seguindo");
    map.set("repository", "Repositórios");
    map.set("company", "");
    map.set("location", "");

    const header = document.createElement("header");
    const logo = document.createElement("img");
    const h2 = document.createElement("h2");
    const main = document.createElement("main");
    const divImageProfile = document.createElement("div");
    const imgProfile = document.createElement("img");
    const ulInformationProfile = document.createElement("ul");
    const liInfoItem = document.createElement("li");
    const imageInfoItem = document.createElement("img");
    const pInfoItem = document.createElement("p");
    const footer = document.createElement("footer");
    const logoFooter = document.createElement("img");
    const spanFooter = document.createElement("span");
    const { name, image, ...rest } = user;

    // set atributes
    logo.setAttribute("src", "./assets/logo.svg");
    logo.setAttribute("alt", "Rocketseat");
    imageInfoItem.setAttribute("src", "./assets/followers.svg");
    imageInfoItem.setAttribute("alt", "Seguidores");
    logoFooter.setAttribute("src", "./assets/logo.svg");
    logoFooter.setAttribute("alt", "Rocketseat");
    spanFooter.innerText = "ROCKETCARD";
    divImageProfile.setAttribute("class", "imageProfile");
    ulInformationProfile.setAttribute("class", "informationProfile");
    liInfoItem.setAttribute("class", "infoItem");

    h2.textContent = String(name);
    imgProfile.setAttribute("src", String(image));
    imgProfile.setAttribute("alt", String(name));


    const arrayInfoItem = Object.entries(rest);
    const listColection = arrayInfoItem.map(([key, value]) => {
      const li = liInfoItem.cloneNode();
      const image = imageInfoItem.cloneNode();
      const p = pInfoItem.cloneNode();
      image.src = `./assets/${key}.svg`;
      p.textContent = `${value} ${map.get(key)}`;
      li.appendChild(image);
      li.appendChild(p);
      return li;
    });


    // append
    header.appendChild(logo);
    header.appendChild(h2);
    divImageProfile.appendChild(imgProfile);

    ulInformationProfile.append(...listColection);
    main.appendChild(divImageProfile);
    main.appendChild(ulInformationProfile);
    footer.appendChild(logoFooter);
    footer.appendChild(spanFooter);
    card.appendChild(header);
    card.appendChild(main);
    card.appendChild(footer);
  }
}