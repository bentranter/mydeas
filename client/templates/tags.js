Template.tags.helpers({
  tags: function() {
    return Tags.find({}, {sort: {created: -1}});
  }
});

Template.tags.events({
  "submit .new-tag": function(e) {

    var tag = e.target.text.value;

    Tags.insert({
      tag: tag,
      created: new Date(),
      userId: Meteor.userId(),
      author: Meteor.user().username
    });

    // Clear the form
    e.target.text.value = "";

    // Prevent random default behaviour (usually using the event does this but whatever)
    return false;
  },
  "click .delete": function () {
    if (confirm('Are you sure?')) {
      Tags.remove(this._id);
    }
  }
});