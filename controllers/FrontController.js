exports.index = async (request, response) => {
    let data = {
        user: request.user
    }

    response.render('index.html', data)
}

exports.search = async (request, response) => {
    let data = {
        isAuth: request.isAuthenticated()
    }

    response.render('search.html', data)
}

exports.login = async (request, response) => {
    let data = {
        isAuth: request.isAuthenticated()
    }

    response.render('login.html', data)
}

exports.logout = async (request, response) => {
    request.logout()
    response.redirect('/')
}