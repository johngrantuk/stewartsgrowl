if (Meteor.isServer) {

  if (Meteor.isServer) {
  Meteor.startup(function () {
    Accounts.createUser({username: "admin", email: "sb@admin.com", password: "st3wart@dm1n!"});
  });
}

}
