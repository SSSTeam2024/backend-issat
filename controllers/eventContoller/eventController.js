const eventService = require('../../services/eventServices/eventService');

exports.getAllEvents = async (req, res) => {

  try {
     console.log(process.env.SECRET_KEY)
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { titre, description, adresse,link, date, rating, views, image } = req.body;
    
    let event = await eventService.createEvent({ titre, description, adresse,link, date, rating, views, image });
    res.json(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
