// The express server is brought in and create the application
let express = require('express');
let app = express();
let marketItems = require('./repos/marketItems');

//Call in the Express Router object
let router = express.Router();
//let items = marketItems.get();

//Create a GET REST method to return data
	// this function has a request object, response object, and a next object
router.get('/', function (req, res, next) {
	marketItems.get(function (data) {
		res.status(200).json({
			// status, statusText, and message properties were added
			// the data produce property as well
			"status": 200,
			"statusText": "OK",
			"message": "Farmer's market items are successfully collected",
			"data": data
		});
	}, function(err) {
		next(err);
	});
});

//New route
// Create GET/id to return a single market item
	router.get('/:id', function (req, res, next) {
		marketItems.getById(req.params.id, function (data) {
			if (data) {
				res.status(200).json({ // a success message with status 200
					"status": 200, 
					"statusText": "OK",
					"message": "Single market item retrieved.",
					"data": data
				});
			} else {
				res.status(404).json({ // an error message with status 404
					"status": 404,
					"statusText": "Not Found",
					"message": "The market item '" + req.params.id + "' could not be found.",
					"error": {
						"code": "NOT_FOUND",
						"message": "The market item '" + req.params.id + "' could not be found."
					}
				});
			}
		}, function(err) {
			next(err);
	});
});


// Start up the router so all routers are fixed with /api/v1
app.use('/api/', router);

// Create a server that listens on port 5000
var server  = app.listen(5000, function () {
	console.log('This node server is running on localhost:5000');
});

