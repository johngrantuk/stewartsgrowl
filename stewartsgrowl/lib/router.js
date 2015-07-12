Router.route('/', {
  name: 'frontpage',
  waitOn: function() {
    setBackGround("Glass.jpg");
    return [Meteor.subscribe('allBeers')];
  }
});

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

Router.route('/twilio', {                        // Twilio SMS Request (GET) URL is pointed to: http://johns-twilio.meteor.com/Twilio/
  where: 'server',
  name: 'twilio',
  action: function() {
    console.log("\nTEST");
    console.log(this.request.body);
    console.log('\n');
    this.response.writeHead(200, {'Content-Type': 'text/html'});
    //this.response.write('<?xml version="1.0" encoding="UTF-8" ?><Response><Message>Hello World!</Message>');
    this.response.end();
    Meteor.call('TwilioReceive', this.request.body);
  }
});

var requireLogin = function() {               // Called for Beer and MobileNo admin pages. Makes sure a user is logged in to access.
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.redirect('/');                     // If not logged in or trying to log in then send back to frontpage.
    }
  } else {
    this.next();                              // User is logged in so continue.
  }
}

redirectOnLogin = function() {                // Redirects logged in user to admin page.
  if (Meteor.userId()){
    this.redirect('/admin');
    setBackGround();
  }else{
    this.next();
  }
}

setBackGround = function(ImageFile) {         // Sets background of page.

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
    $('body').css('background','');
  }
}

Router.onBeforeAction(redirectOnLogin, {only: 'frontpage'});
Router.onBeforeAction(requireLogin, {only: ['admin', 'mobileNoAdmin']});
