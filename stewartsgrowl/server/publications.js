Meteor.publish('allBeers', function(){
  return AllBeers.find();
})
