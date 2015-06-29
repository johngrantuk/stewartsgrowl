Template.frontpage.helpers({
  allBeers: function() {
    return AllBeers.find();
  }
});

Template.frontpage.events({
  'submit form': function(e) {
    e.preventDefault();

    var newEntry = {
      mobileNo: $(e.target).find('[name=mobileNo]').val(),
    };

    Meteor.call('mobileNoInsert', newEntry, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      if (result.mobileNoExists){
        sAlert.success('You are added and will receive a message with Stewart Brewing Beer Alerts!', {position: 'top', timeout: 'none', onRouteClose: false, stack: false});
        console.log("Mobile addded.");
      }

      if (result.mobileNoAdded){
        Meteor.call('TwilioSend', newEntry.mobileNo, "Hi, thanks for signing up to the Stewart Brewing Beer Alert. Just text STOP any time to leave.");
        sAlert.success('You are added and will receive a message with Stewart Brewing Beer Alerts!', {position: 'top', timeout: 'none', onRouteClose: false, stack: false});
        console.log("Mobile added.");
      }
    });
  }
});
