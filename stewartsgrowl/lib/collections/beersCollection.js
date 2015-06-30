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

AllBeers.allow(securityRules);
