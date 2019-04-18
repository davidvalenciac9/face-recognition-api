const handleProfileid = (req, res, db) => {
	const { id } = req.params;
	//Selecting everything * from table users where id = id
	db.select('*').from('users').where({
		id: id
	})
		.then(user => {
			//If array length exists response with first object of user array
			if (user.length) {
				res.json(user[0])
			//Else response with 400 status and User Not Found
			} else {
				res.status(400).json('Not Found')
			}
	})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleProfileid: handleProfileid
}