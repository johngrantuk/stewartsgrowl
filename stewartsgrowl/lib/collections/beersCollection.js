Beers1 = new Mongo.Collection('beers1');
Beers2 = new Mongo.Collection('beers2');
Beers3 = new Mongo.Collection('beers3');
AllBeers = new Mongo.Collection('allBeers');

beerSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
  },
  strength: {
    type: String,
    label: "Strength"
  },
  description: {
    type: String,
    label: "Description",
    max: 200
  }
})

Beers1.attachSchema(beerSchema);
Beers2.attachSchema(beerSchema);
Beers3.attachSchema(beerSchema);
AllBeers.attachSchema(beerSchema);

securityRules = {
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId;
  },
  remove: function(userID, doc) {
    //only allow deleting if you are owner
    return !! userId;
  }
}
Beers1.allow(securityRules);
Beers2.allow(securityRules);
Beers3.allow(securityRules);
AllBeers.allow(securityRules);
