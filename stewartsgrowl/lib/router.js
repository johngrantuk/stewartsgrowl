Router.route('/', {
  name: 'frontpage',
  waitOn: function() {
    setBackGround("Glass.jpg");
    return [Meteor.subscribe('allBeers')];
  }
});

Router.route('/2', {
  name: 'frontpage2',
  template: 'frontpage',
  waitOn: function(){
    setBackGround("Growler.jpg");
    return Meteor.subscribe('allBeers');
  }
})

Router.route('/admin', {
  name: 'admin',
  waitOn: function() {
    setBackGround();
    return [Meteor.subscribe('allBeers')];
  }
});

Router.route('/mobileNoAdmin', {
  name: 'mobileNoAdmin',
  waitOn: function() {
    setBackGround();
    return [Meteor.subscribe('mobileNos')];
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.redirect('/');
    }
  } else {
    this.next();
  }
}

redirectOnLogin = function() {
  if (Meteor.userId()){
    this.redirect('/admin');
    setBackGround();
  }else{
    this.next();
  }
}

setBackGround = function(ImageFile) {

  console.log("Settting.")

  if(ImageFile){
  $('body').css('background','linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(' + ImageFile + ') no-repeat center center fixed');
  $('body').css('-webkit-background-size', 'cover');
  $('body').css('-moz-background-size', 'cover');
  $('body').css('-o-background-size', 'cover');
  $('body').css('background-size', 'cover');
  $('body').css('-ms-filter', '\"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + ImageFile + '\', sizingMethod=\'scale\')";');
  $('body').css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'.' + ImageFile + '\', sizingMethod=\'scale\');');
  }
  else{
    console.log("No background.");
    //$('body').removeClass();
    $('body').css('background','');
  }
}

Router.onBeforeAction(redirectOnLogin, {only: 'frontpage'});
Router.onBeforeAction(requireLogin, {only: ['admin', 'mobileNoAdmin']});
