/*
mongoose.connect('mongodb://localhost:27017/galaxy', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
*/

const SmartContract = require('../models/SmartContract')

exports.getAllSmartsContracts = async (request, response) => {
	if ( ! request.user) {
		return response.json('you must to be logged')
	}

	const smarts_contracts = await SmartContract.find({
		user_id: request.user.id
	})

	return response.json(smarts_contracts)
}

exports.receiveSmartContractURL = async (request, response) => {

	const url = request.body.url


	if ( ! url.length) {
		return response.json({
			error: 'the url can not be blank'
		})
	}

	if ( ! hasSocialMediaInURL() ) {
		return response.json({
			error: "the url don't contains github"
		})
	}
}