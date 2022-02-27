

const user = {
  getUserUrl() {
    const name = new URLSearchParams(window.location.search).get('userName')
    if (!name) {
      const nameDefault = user.default();
      user.setUserName(nameDefault);
      return nameDefault
    }
    this.setUserName(name)
    return name
  },

  setUserName(userName) {
    const user = {
      userName,
      date: Date.now()
    }
    localStorage.setItem('userName', JSON.stringify(user));
  },

  getUserName() {
    const userName = localStorage.getItem('userName');
    if (!userName) return;
    const { userName: userNameLocal, date } = JSON.parse(userName);
    const now = Date.now();
    const diff = now - date;
    if (diff > (1000 * 60 * 60 * 24)) {
      localStorage.removeItem('userName');
      return;
    }
    return userNameLocal;
  },

  default() {
    return 'bhryanS2';
  }
}

export const userName =
  user.getUserUrl()
  || user.getUserName()
  || user.getUserAvatar()
  || user.default()