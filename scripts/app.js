const githubApi = githubAdapter();

document.addEventListener("DOMContentLoaded", function () {
    const githubUserForm = document.querySelector('form');

    githubApi.get('code-corgi').then(repos => {
        updateUserLink(repos[0].owner);
        updateRepoList(repos);
    })

    githubUserForm.addEventListener('submit', handleFormSubmit);
});
