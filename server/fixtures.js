if (Notes.find().count() === 0) {

  var now = new Date().getTime();

  // Create dummy user but not yet cause I didn't add accounts
  var benId = Meteor.users.insert({
  	profile: { name: 'Ben Tranter'}
  });

  // Retrieve user so you can use them as fixture data for note authors
  var ben = Meteor.users.findOne(benId);

  // Make a test note. Use time created and maybe add time updated??
  var noteOne = Notes.insert({
  	title: 'My great idea',
  	userId: ben._id,
  	author: ben.profile.name,
  	created: new Date(now - 7*3600*1000)
  });
}