import { RenderCard } from "./scripts/render/index.js";
import { getInfos } from "./scripts/fetchGithub/index.js";
import { rgbFn } from "./scripts/background/index.js";
rgbFn.init();

new RenderCard({
  name: "Birobirobiro",
  followers: 716,
  following: 193,
  repository: 38,
  company: "@Rocketseat",
  location: "Bebedouro",
  image: "https://github.com/birobirobiro.png",
});

async function init() {
  const promise = await getInfos();
  // Promise.all([promise]).then(([user]) => {
  //   new RenderCard({
  //     name: user.name,
  //     followers: user.followers,
  //     following: user.following,
  //     repository: user.public_repos,
  //     company: user.company,
  //     location: user.location,
  //     image: user.avatar_url,
  //   });
  // });
}

// init().then(() => {
//   console.log("done");
// });