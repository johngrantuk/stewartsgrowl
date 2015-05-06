if (Meteor.isServer) {

    Meteor.startup(function () {

      console.log("Starting");

      if (Meteor.users.find().count() === 0)
        Accounts.createUser({username: "admin", email: "sb@admin.com", password: "st3wart@dm1n!"});

      if(AllBeers.find().count() === 0){
        for(i = 0;i < 18;i++){
          console.log("Inserting");
          AllBeers.insert({
            name: Random.id(6),
            description: Random.id(6),
            strength: Random.id(1)
          });
        }
      }
      console.log("Finishing");
    });



}
