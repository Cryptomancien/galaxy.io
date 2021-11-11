export default function (request, response) {
    if (request.isAuthenticated()) {
        return next()
    }
    response.redirect('/')
}

/*
module.exports = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next()
    }
    response.redirect('/')
}
 */