import Contract from '../../models/Contract.mjs'
// TODO replace in middleware
const ContractsController = {
    async all(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }

        const contracts = await Contract.findAll({
            where: {
                user_id: request.user.id
            }
        })

        return response.json(contracts)
    },

    async store(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }

        const data = {
            title: request.body.title,
            description: request.body.description,
            version: request.body.version,
            url: request.body.url,
            content: request.body.content,
            user_id: request.user.id,
        }

        console.log(data)

        const contract = await Contract.create(data)

        return await response.json(contract)
    },

    async show(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }


        const id = request.params.id
        const contract = await Contract.findByPk(id)

        return await response.json(contract)
    },

    async update(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }

        const id = request.params.id

        let contract = await Contract.findByPk(id)

        const data = {
            title: request.body.title,
            description: request.body.description,
            version: request.body.version,
            url: request.body.url,
            content: request.body.content,
        }

        contract = await contract.update(data)

        response.json(contract)
    },

    async destroy(request, response) {
        if ( ! request.user) {
            return response.json('you must to be logged')
        }

        const id = request.params.id

        const contract = await Contract.findByPk(id)

        if (contract.user_id != request.user.id) {
            return await response.json(false)
        }

        await Contract.destroy({ where: { id } })

        return await response.json(true)
    }
}

export default ContractsController