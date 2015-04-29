if (Meteor.isServer) {

  if (Meteor.isServer) {
  Meteor.startup(function () {

    if (Meteor.users.find().count() === 0)
      Accounts.createUser({username: "admin", email: "sb@admin.com", password: "st3wart@dm1n!"});

  });
}

}
