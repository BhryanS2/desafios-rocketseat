import { colors } from "../constants.js";

export const style = () => {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 348px;
    }

    .profile-container .image-container {
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

    .profile-container h1 {
      font-family: "Merriweather Sans", sans-serif;
      font-weight: bold;
      font-size: 23px;
      line-height: 29px;

      color: ${colors.textColor};
    }

    .profile-container h2 {
      font-family: "Merriweather Sans", sans-serif;
      font-weight: 300;
      font-size: 13px;
      line-height: 16px;
      color: ${colors.textColor};
    }
  `;
}
