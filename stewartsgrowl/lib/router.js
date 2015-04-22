Router.route('/', {
  name: 'frontpage',
  waitOn: function() {
    return [Meteor.subscribe('beers1'),
    Meteor.subscribe('beers2'),
    Meteor.subscribe('beers3')];
  }
  });

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

Router.onBeforeAction(requireLogin, {only: 'admin'});
