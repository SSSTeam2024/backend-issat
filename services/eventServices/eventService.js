const EventDao = require('../../dao/event/eventDao');

class EventService {
  async getAllEvents() {
    return await EventDao.findAll();
  }

  async createEvent(event) {
    if (!event.titre) {
      throw new Error('Title is required');
    }
    return await EventDao.create(event);
  }
}

module.exports = new EventService();