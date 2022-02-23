import { fetchGithub } from "../fetch/index.js";
import { toRespose } from "../fetch/promisse.js";

export class SearchApi {
  async PromisesResolve() {
    const github = new fetchGithub();
    const repos = await github.getRepos(2);
    const reposInfo = repos.map(repo => this.getInformation(repo));
    return reposInfo;
  }

  getInformation(repo) {
    // name, description, stars, forks, tech
    return {
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      tech: repo.language,
      url: repo.html_url
    }
  }
}
