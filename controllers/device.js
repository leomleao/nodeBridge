/**
 * GET /
 * Device page.
 */

exports.index = (req, res) => {
	 res.json({ message: 'hooray! welcome to our api!' }); 
};

exports.getAll = (req, res) => {	
	var msg;
	var client  = req.app.locals.client

	client.subscribe('homebridge/from/response')
	client.publish('homebridge/to/get', '{"name": "*"}')

	client.on('message', function (topic, message) {
	  // message is Buffer
	 	msg = message.toString()
	 	client.end()
	  	res.json({ message: msg }); 
	})

	function response () {

	}


	setTimeout(response, 1000);

};

exports.delete = (req, res) => {	
	var msg;
	var client  = req.app.locals.client
	var id = req.params.deviceId

	client.subscribe('homebridge/from/response')
	client.publish('homebridge/to/remove', JSON.stringify({name: id}))

	client.on('message', function (topic, message) {
	  // message is Buffer
	 	msg = message.toString()
	 	res.json({ message: msg }); 
	})
		
};

exports.add = (req, res) => {	
	var msg;
	var client  = req.app.locals.client

	client.subscribe('homebridge/from/response')
	client.publish('homebridge/to/add', JSON.stringify(
			{
			name: req.body.name,
			service_name: req.body.service_name,
			service: req.body.service
			}
		)
	)

	console.info(req.body)

	client.on('message', function (topic, message) {
	  // message is Buffer
	  msg = message.toString()
	  res.json({ message: msg }); 
	})
		
};





