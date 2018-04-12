// Iniitialize Firebase
var config = {
  apiKey: "AIzaSyC-rIYAZDZCWl8i_3ACKBN_IDtheQ_JNJY",
  authDomain: "trainschedule-7e39e.firebaseapp.com",
  databaseURL: "https://trainschedule-7e39e.firebaseio.com",
  projectId: "trainschedule-7e39e",
  storageBucket: "trainschedule-7e39e.appspot.com",
  messagingSenderId: "946599391886"
};
firebase.initializeApp(config);

var database = firebase.database();
// Initial Values
var name = "";
var destination = "";
var time= "";


//   ==========================================

$("#add-train").on("click", function(event) {

	event.preventDefault();

	name = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	time = $("#time-input").val().trim();
	frequency = $("#frequency-input").val().trim();


  
  var firstTimeConverted = moment(firstTime, “HH:mm”).subtract(1, “years”);
  var timeDiff = moment().diff(moment(firstTimeConverted), “minutes”);
  var timeLeft = timeDiff % frequency;
  var minutesAway = frequency - timeLeft;
  var nextTrain = moment().add(minutesAway, “minutes”);
  var nextArrival = moment(nextTrain).format(“HH:mm”);



	database.ref().push({
		trainName: name,
		trainDestination: destination,
		trainTime: nextArrival,
		trainFrequency: frequency,
    timer:minutesAway
	});

});


database.ref().on("child_added", function(snapshot) {

	var sv = snapshot.val();

	$("#train-list").append("<tr><td>" + snapshot.val().trainName +
	      	"</td><td>" + snapshot.val().trainDestination +
	      	"</td><td>" + snapshot.val().trainFrequency +
	      	"</td><td>" + snapshot.val().trainTime+
          "</td><td>" + snapshot.val().timer
		);

    }, function(errorObject) {
    	console.log("Errors handled: " + errorObject.code);


});
