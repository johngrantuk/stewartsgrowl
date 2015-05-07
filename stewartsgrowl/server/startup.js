/*if (Meteor.isServer) {

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



}*/
if (Meteor.isServer) {

    Meteor.startup(function () {

        AddBeer("Pentland IPA", "Classic IPA", "3.9");
        AddBeer("Continental Gold", "Golden ale.", "4.8");
        AddBeer("80/", "Scottish Heavy", "4.4");
        AddBeer("Pils", "Czech Lager", "4.7");
        AddBeer("Hollyrood", "Pale Ale", "5");
        AddBeer("Hefe", "Wheat Beer", "5.4");
        AddBeer("First World Problems", "Belgian IPA", "6.2");
        AddBeer("Cascadian East", "APA", "5.4");
        AddBeer("Beach Wear Lager", "Summer Beer", "5.0");
        AddBeer("Peter’s IPA", "New World IPA", "4.7");
        AddBeer("Star of Hope", "Belgian Dubbel", "5.9");
        AddBeer("Perkin Reveler", "Pilgrim Amber Ale", "4.0");
        AddBeer("Arabica Grinding", "Coffee IPA", "5.9");
        AddBeer("Marguerita Red", "US Amber", "4.6");
        AddBeer("Tasty Beer", "Comming soon!", "0");
        AddBeer("Tasty Beer", "Comming soon!", "0");
        AddBeer("Tasty Beer", "Comming soon!", "0");
        AddBeer("Tasty Beer", "Comming soon!", "0");
      });
}


AddBeer = function(Name, Description, Strength){
  console.log("Add beer")
  AllBeers.insert({
    name: Name,
    strength: Strength,
    description: Description
  });
}
