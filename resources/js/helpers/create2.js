import axios from 'axios'

export class ValidateUrl {

    constructor(url) {
        this.url = url
    }

    async validate() {

        const response = {
            status: 'error',
            message: ''
        }

        if ( ! this.correctService()) {
            response.message = 'The url must start with https://github.com/...'
            return response
        }

        const logged_user = await this.getLoggedUser()
        const supposed_user = await this.checkUser()

        if (logged_user.id != supposed_user.id) {
            response.message = 'You have to register files on your own repository'
            return response
        }

        const is_file_bas = await this.isFileBas()
        if ( ! is_file_bas) {
            response.message = 'Not .bas'
            return response
        }

        response.status = 'success'
        response.message = ''

        return response
    }

    correctService() {
        return this.url.startsWith('https://github.com')
    }

    async getLoggedUser() {
        try {
            const url = '/api/logged-user'
            const response = await axios.get(url)
            const data = await response.data
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    async checkUser() {
        let pathname = this.url
        pathname = new URL(pathname)
        pathname = pathname.pathname
        pathname = pathname.split('/')

        const username = pathname[1]

        try {
            const url = `https://api.github.com/users/${username}`
            const response = await axios.get(url)
            const data = await response.data
            return data

        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    async isFileBas() {
        let file = new URL(this.url)
        file = file.pathname
        file = file.split('/')
        file = file.at(-1)

        return file.endsWith('.bas')
    }
}

export async function loadFileContent(url) {
    let pathname = new URL(url)
    pathname = pathname.pathname
    pathname = pathname.split('/')

    pathname = pathname.filter(word => word != 'blob')
    pathname = pathname.join('/')

    const base_url = 'https://raw.githubusercontent.com'
    const complete_url = base_url + pathname

    try {
        const response = await axios.get(complete_url)
        const data = await response.data
        return data
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}