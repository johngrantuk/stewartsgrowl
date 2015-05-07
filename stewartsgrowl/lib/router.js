Router.route('/', {
  name: 'frontpage',
  waitOn: function() {
    return [Meteor.subscribe('beers1'),
    Meteor.subscribe('beers2'),
    Meteor.subscribe('beers3'),
    Meteor.subscribe('allBeers')];
  }
});

Router.route('/2', {
  name: 'frontpage2',
  waitOn: function(){
    $('body').css('background','url(Growler.jpg) no-repeat center center fixed');
    $('body').css('-webkit-background-size', 'cover');
    $('body').css('-moz-background-size', 'cover');
    $('body').css('-o-background-size', 'cover');
    $('body').css('background-size', 'cover');
    $('body').css('-ms-filter', '\"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'Growler.jpg\', sizingMethod=\'scale\')";');
    $('body').css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'.Growler.jpg\', sizingMethod=\'scale\');');
    return Meteor.subscribe('allBeers');
  }
})

Router.route('/admin', {
  name: 'admin',
  waitOn: function() {
    return [Meteor.subscribe('beers1'),
    Meteor.subscribe('beers2'),
    Meteor.subscribe('beers3')];
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

redirectOnLogin = function() {
  if (Meteor.userId()){
    this.render('admin');
    //$('body').css({});
    $('body').css('background','url(Glass2.jpg) no-repeat center center fixed');
  }else{
    this.next();
    $('body').css('background','linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(Glass.jpg) no-repeat center center fixed');
    $('body').css('-webkit-background-size', 'cover');
    $('body').css('-moz-background-size', 'cover');
    $('body').css('-o-background-size', 'cover');
    $('body').css('background-size', 'cover');
    $('body').css('-ms-filter', '\"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'Glass.jpg\', sizingMethod=\'scale\')";');
    $('body').css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'.Glass.jpg\', sizingMethod=\'scale\');');
  }
}


Router.onBeforeAction(redirectOnLogin, {only: 'frontpage'});
Router.onBeforeAction(requireLogin, {only: 'admin'});
