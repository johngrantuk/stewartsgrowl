MobileNos = new Mongo.Collection('mobileNos');

mobileNosSchema = new SimpleSchema({
  mobileNo: {
    type: String,
    label: "Mobile No.",
  },
  submitted: {
    type: Date,
    label: "Submitted"
  }
})

MobileNos.attachSchema(mobileNosSchema);



securityRules = {
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId;
  },
  remove: function(userId, doc) {
    //only allow deleting if you are owner
    return !! userId;
  }
}

MobileNos.allow(securityRules);
