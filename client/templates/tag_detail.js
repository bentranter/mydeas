Template.tagDetail.helpers({
	notes: function () {
    return Notes.find({tags: this.tag});
  }
});