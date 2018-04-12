// Iniitialize Firebase
var config = {
  apiKey: "AIzaSyC-rIYAZDZCWl8i_3ACKBN_IDtheQ_JNJY",
  authDomain: "trainschedule-7e39e.firebaseapp.com",
  databaseURL: "https://trainschedule-7e39e.firebaseio.com",
  projectId: "trainschedule-7e39e",
  storageBucket: "trainschedule-7e39e.appspot.com",
  messagingSenderId: "946599391886"
}
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values

var name = "";
var destination = "";
var time= "";
var frequency = "";

// Capture Button Click
$("#add-train").on("click", function(event) {
	event.preventDefault();

// Logic for storing and retrieving the most recent user.
	name = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	time = $("#time-input").val().trim();
	frequency = $("#frequency-input").val().trim();

// Converting time
  var firstTimeConverted = moment(time, 'HH:mm').subtract(1, 'years');
  var timeDiff = moment().diff(moment(firstTimeConverted), 'minutes');
  var timeLeft = timeDiff % frequency;
  var minutesAway = frequency - timeLeft;
  var nextTrain = moment().add(minutesAway, 'minutes');
  var nextArrival = moment(nextTrain).format('HH:mm');

// Code for the push
	database.ref().push({
		trainName: name,
		trainDestination: destination,
		trainTime: nextArrival,
		trainFrequency: frequency,
    timer: minutesAway
	});
});

// Firebase watcher + initial loader
database.ref().on("child_added", function(snapshot) {

	var sv = snapshot.val();

	$("#train-list").append("<tr><td>" + snapshot.val().trainName +
	      	"</td><td>" + snapshot.val().trainDestination +
	      	"</td><td>" + snapshot.val().trainFrequency +
	      	"</td><td>" + snapshot.val().trainTime +
          "</td><td>" + snapshot.val().timer 
		);
  
    // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
