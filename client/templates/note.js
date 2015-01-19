// Body stuff/events
Template.home.helpers({
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
  },
  tags: function() {
    return Tags.find({}, {sort: {created: -1}});
  }
});

Template.home.events({
  "click .unselected, touchstart .unselected": function(e) {

    e.currentTarget.className = 'selected';

    var tags = Session.get('tags');
    if (!tags) {
      tags = [];
    }

    tags.push(this.tag);
    Session.set('tags', tags);
  },
  "click .selected, touchstart .selected": function(e) {

    e.currentTarget.className = 'unselected';

    tags = Session.get('tags');
    var index = tags.indexOf(this.tag);
    tags.splice(index, 1);
    Session.set('tags', tags);
  },
  "submit .new-note": function(e) {

    if (!Session.get('tags')) {
      alert("Need tag");
      return false;
    }

    var note = e.target.text.value;

    if (note) {
      Notes.insert({
        title: note,
        created: new Date(),
        userId: Meteor.userId(),
        author: Meteor.user().username,
        tags: Session.get('tags')
      });
    }

    // Clear the form
    e.target.text.value = "";
    delete Session.keys['tags'];
    selected = $('.selected');

    for(var i = 0; i < selected.length; i++){
      selected[i].className = 'unselected';
    }
    // e.currentTarget.className = 'unselected';

    // Prevent random default behaviour (usually using the event does this but whatever)
    return false;
  },
  "change .hide-completed input": function (e) {
    Session.set("hideCompleted", e.target.checked);
  },
  "change .note": function(e) {
    var note = e.currentTarget.value;

    Notes.update({_id: this._id}, {$set: {title: note}});
  }
});

// Stuff in the note template events
Template.note.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Notes.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    if (confirm('Are you sure?')) {
      Notes.remove(this._id);
    }
  }
});