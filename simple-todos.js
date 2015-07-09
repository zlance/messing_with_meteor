// simple-todos.js
Tasks = new Mongo.Collection("tasks");

//Tasks.insert({ text: "Testing JS", createdAt: new Date() });

if (Meteor.isClient) {
  Meteor.subscribe("tasks");
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
    	console.log(Tasks.find().fetch());
    	return Tasks.find().fetch();
    }
  });
  // Inside the if (Meteor.isClient) block, right after Template.body.helpers:
  Template.body.events({
  "submit .new-task": function (event) {
    // This function is called when the new task form is submitted

    var text = event.target.text.value;

    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
  });
}

if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    console.log(Tasks.find());
  });	

}