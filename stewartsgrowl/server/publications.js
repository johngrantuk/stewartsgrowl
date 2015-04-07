Meteor.publish('beers1', function() {
  return Beers1.find();
});

Meteor.publish('beers2', function() {
  return Beers2.find();
});

Meteor.publish('beers3', function() {
  return Beers3.find();
});
