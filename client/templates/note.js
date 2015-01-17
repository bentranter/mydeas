// Body stuff/events
Template.body.helpers({
  notes: function () {
    if (Session.get("hideCompleted")) {
      // If hide completed is checked, filter tasks
      return Notes.find({checked: {$ne: true}}, {sort: {created: -1}});
    } else {
      // Otherwise, return all of the tasks
      return Notes.find({}, {sort: {created: -1}});
    }
  },
  hideCompleted: function () {
    return Session.get("hideCompleted");
  },
  incompleteCount: function () {
    return Notes.find({checked: {$ne: true}}).count();
  }
});

Template.body.events({
  "submit .new-note": function(e) {

    var note = e.target.text.value;

    Notes.insert({
      title: note,
      created: new Date(),
      userId: Meteor.userId(),
      author: Meteor.user().username
    });

    // Clear the form
    e.target.text.value = "";

    // Prevent random default behaviour (usually using the event does this but whatever)
    return false;
  },
  "change .hide-completed input": function (e) {
    Session.set("hideCompleted", e.target.checked);
  }
});

// Stuff in the note template events
Template.note.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Notes.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    Notes.remove(this._id);
  }
});