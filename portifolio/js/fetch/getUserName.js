

const user = {
  getUserUrl() {
    const name = new URLSearchParams(window.location.search).get('userName')
    this.setUserName(name)
    return name
  },

  setUserName(userName) {
    localStorage.setItem('userName', userName);
  },

  getUserName() {
    return localStorage.getItem('userName');
  },

  default() {
    return 'diego3g';
  }
}

export const userName =
  user.getUserUrl()
  || user.getUserName()
  || user.getUserAvatar()
  || user.default()