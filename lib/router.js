Router.route('/', {
  name: 'index'
});

Router.route('/home', {
  name: 'home'
});

Router.route('/tags', {
  name: 'tags'
});

Router.route('/tags/:_id', {
  name: 'tagDetail',
  data: function() { return Tags.findOne(this.params._id); }
});

Router.route('/login', {
  name: 'login'
});