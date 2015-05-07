Template.whatspouring.helpers({
  beers1: function() {
    return Beers1.find();
  },

  beers2: function() {
    return Beers2.find();
  },

  beers3: function() {
    return Beers3.find();
  },

  allBeers: function() {
    return AllBeers.find();
  }
});
