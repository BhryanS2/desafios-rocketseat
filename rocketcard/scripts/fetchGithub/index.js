const getParams = () => {
  const userName = URLSearchParams.prototype.get(window.location.search, 'userName');
  if (!userName) {
    return 'bhryans2'
  }
  return { userName };
}

export async function getInfos() {
  const { userName } = getParams();
  const url = `https://api.github.com/users/${userName}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}