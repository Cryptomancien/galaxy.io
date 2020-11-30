export function validateUrlConfig(url, username) {
    let error = ''


    if ( ! url) {
        error = 'the repo must be valid. Example: https://github.com/<account>/<repository>'
    }

    if ( ! url.startsWith('https://github.com/')) {
        error = 'the repo must be valid. Example: https://github.com/<account>/<repository>'
    }

    if ( ! url.includes(username)) {
        error = 'you are the owner of the repository, all right ?'
    }

    return error
}

export function loadConfig(username, repository) {
    let url = `https://raw.githubusercontent.com/${username}/${repository}/main/sc.toml`


}