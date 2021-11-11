const LoginController = {
    async index(request, response) {
        let data = {
            isAuth: request.isAuthenticated()
        }

        response.render('login.html', data)
    },

    async logout(request, response) {
        request.logout()
        response.redirect('/')
    }
}

export default LoginController