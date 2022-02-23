import { fetchGithub } from "../fetch/index.js";

const icons = {
  location: '<i class="fa-solid fa-location-dot"></i>',
  company: '<i class="fa-solid fa-suitcase"></i>',
  github: '<i class="fa-brands fa-github"></i>',
  blog: '<i class="fa-solid fa-globe"></i>',
  email: '<i class="fa-solid fa-envelope"></i>',
  twitter_username: '<i class="fa-brands fa-twitter"></i>',
  linkedin: '<i class="fa-brands fa-linkedin"></i>'
}

class Information {
  constructor() {
    const github = new fetchGithub();
    this.Container = document.querySelector('.information');
    github.get()
      .then(user => {

        this.InformationData = [];
        const userArray = Array.from(Object.entries(user));
        userArray.forEach(([name, value]) => {
          if (name === 'company' || name === 'location' || name === 'email' || name === 'blog' || name === 'twitter_username' || name === 'linkedin_username') {
            if (!value) return;
            this.InformationData.push({
              name: value,
              icon: icons[name]
            });
          }
        });
        const section = this.createHTML(user.html_url);
        this.Container.appendChild(section);
      })
  }

  createHTML(html_url) {
    const section = document.createElement('section');
    section.classList.add('information');
    this.InformationData.forEach((item) => {
      const link = document.createElement('a');
      link.href = html_url;
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

new Information();