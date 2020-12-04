import axios from 'axios';
import toml from "toml";
import swal from "sweetalert";

export async function getRepositoriesByUser(user) {
    const url = `https://api.github.com/users/${user}/repos`
    const response = await axios.get(url)
    const data = await response.data
    return data
}

export async function getConfig(username, repository) {
    const url = `https://raw.githubusercontent.com/${username}/${repository}/main/sc.toml`
    console.log(url)
    try {
        const response = await axios.get(url)
        let data = await response.data
        //data = toml.parse(data)
        return data
    } catch (error) {
        swal('Error', 'sc.toml is missing in this repository', 'error')
        console.log(error)
        return
    }
}

export async function saveRepository(reposotory) {

    const url = '/api/repositories'
    const data_post = {
        public_id: reposotory.public_id,
        url: reposotory.url,
        name: reposotory.name,
        content: reposotory.public_id,
    }

    try {
        const response = await axios.post(url, data_post)
        const data = await response.data
        console.log(data)
        return data
    } catch (error) {
        swal('Error', 'The repository can not be saved, try later', 'error')
        console.log(error)
        return
    }
}

export async function saveContracts(contracts, repository_id) {

    async function getContent(username, repository, file) {
        try {
            const url = `https://raw.githubusercontent.com/${username}/${repository}/main/${file}`
            const response = await axios.get(url)
            const data = await response.data
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    const url = '/api/contracts'

    for await (let contract of contracts) {

        let data_post = {
            title: contract.title,
            description: contract.description,
            file: contract.file,
            version: contract.version,
            content: '',
            repository_id
        }

        try {
            const response = await axios.post(url, data_post)
            const data = await response.data
        } catch (error) {
            console.log(error)
            swal('Error', 'Can not save contract, try later', 'error')
            return
        }
    }
}