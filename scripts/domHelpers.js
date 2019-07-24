
const handleFormSubmit = event => {
  event.preventDefault()
  const githubHandle = event.target.username.value;

  githubApi.get(githubHandle).then(repos => {
    updateUserLink(repos[0].owner);
    updateRepoList(repos);
  });
}

const updateRepoList = newRepos => {
  const repoList = document.querySelector('.repo-list');
  repoList.innerHTML = '';
  newRepos.forEach(repo => repoList.appendChild(repoItem(repo)));
}

const updateUserLink = ({ login, html_url }) => {
  const userLink = document.querySelector('header h2 a');
  userLink.innerText = login;
  userLink.href = html_url;
}

const repoItem = ({ full_name, html_url, description, forks_count, watchers_count }) => {
  const item = document.createElement('li');
  item.classList.add('repo-item');
  item.innerHTML = `
<h3 class="repo-title uk-accordion-title">
    <a href="${html_url}">${full_name}</a>
</h3>
<div class="repo-description uk-margin-left uk-accordion-content">
    <small><a href="${html_url}">${full_name}</a></small>
    <p>
      <strong>Description:</strong>
      <span>${description || 'none'}</span>
    </p>
    <p>
      <strong>Owner:</strong>
      <span>code-corgi</span>
    </p>
    <div class="stats-icons">
        <div>
            <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                <path id="star" fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z">
                </path>
            </svg>
            <span>${watchers_count}</span>
        </div>
        <div>
            <svg aria-hidden="true" height="14" version="1.1" viewBox="0 0 10 16" width="14">
                <path id="fork" fill-rule="evenodd"
                    d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z">
                </path>
            </svg>
            <span>${forks_count}</span>
        </div>
    </div>
</div>
`;
  return item;
}