const githubAdapter = () => {
  const url_for = user =>
    `https://api.github.com/users/${user || 'code-corgi'}/repos`

  return {
    get: user => fetch(url_for(user))
      .then(res => res.json())
  }
}