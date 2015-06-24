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

    //post._id = Posts.insert(post);
    console.log("Saving: " + newEntry.mobileNo);
    Meteor.call('mobileNoInsert', newEntry, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      if (result.mobileNoExists){
        sAlert.success('You are added and will receive a message with exciting Stewarts Brewing news!', {position: 'top', timeout: 'none', onRouteClose: false, stack: false});
        console.log("Mobile addded.");
      }

      if (result.mobileNoAdded){
        sAlert.success('You are added and will receive a message with exciting Stewarts Brewing news!', {position: 'top', timeout: 'none', onRouteClose: false, stack: false});
        console.log("Mobile added.");
      }

    });

  }
});
