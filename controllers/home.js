/**
 * GET /
 * Home page.
 */




exports.index = (req, res) => {
	var client  = req.app.locals.client
	var msg;

	client.on('connect', function () {
	  client.subscribe('homebridge/from/response')
	  client.publish('homebridge/to/add', '{"name": "lights", "service_name": "lights", "service": "Lightbulb"}')
	})

	client.on('message', function (topic, message) {
	  // message is Buffer
	  msg = message.toString()
	  client.end()
	})

  res.render('home', {
    title: 'Home',
    msg: msg
  });
};





