Template.admin.helpers({
  beers: function(){
    return AllBeers.find();
  }
})

Template.admin.events({
  "click #sendBtn": function(event, template){

     var message = CreateMessage();

     Meteor.call('TwilioSendToAll', message, function(error, result) {
       // display the error to the user and abort
       if (error){
         console.log("Error Sending: " + error)
         return;
       }

        sAlert.success('SMS Sent', {position: 'top', timeout: 'none', onRouteClose: false, stack: false});
     });

  }
});

var CreateMessage = function () {
  var message = $('#customMessage').val();

  if($('#beerCheckBox').prop("checked") == true){

    message = message + "\n" + BeerMessage();
  }

  if($('#stopCheckBox').prop("checked") == true){

    message = message + $('#stopMessage').val();
  }

  console.log(message)

  return message;
}

BeerMessage = function () {
  var beerList = "";
  var beers = AllBeers.find();

  beers.forEach(function (beer) {
    beerList = beerList + beer.name + ", " + beer.description + " " + beer.strength + "%\n";
  });

  return beerList;
}
