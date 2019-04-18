const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'bb1845518d444b399521a303fa42d98e'
});

const handleApiCall = (req, res) => {
  app.models.predict(
  Clarifai.FACE_DETECT_MODEL,
  req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to connect to API'))
}


const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=' , id)
	//Increment is Knex function, receive a column and how much to add
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0])
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
  handleApiCall: handleApiCall
}