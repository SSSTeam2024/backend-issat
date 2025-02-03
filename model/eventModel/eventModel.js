class Event {
    constructor(titre, description, adresse,link, date, rating, views, image) {
      this.titre = titre;
      this.description = description;
      this.adresse = adresse;
      this.date = date;
      this.link = link;
      this.rating = rating;
      this.views = views;
      this.image = image;
    }
  }
  
  module.exports = Event;