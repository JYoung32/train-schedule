//firebase key
var firebaseConfig = {
    apiKey: "AIzaSyCD7GgljYGjeAvQ-Ml4buwRLmKofvHZZ00",
    authDomain: "homework-trainschedule-fd876.firebaseapp.com",
    databaseURL: "https://homework-trainschedule-fd876.firebaseio.com",
    projectId: "homework-trainschedule-fd876",
    storageBucket: "",
    messagingSenderId: "18268162344",
    appId: "1:18268162344:web:f9af0205286c0891e7681d",
    measurementId: "G-NG7YG41XH0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//create a variable to reference the database
var database = firebase.database();


//on click function for the submit button
$(".btn-submit").on("click", function(event){
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var startTime = $("#startTime").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        name : name,
        destination : destination,
        startTime : startTime,
        frequency : frequency
    })
    //don't refresh the page
    return false;
});

//firebase watcher and initial loader.
database.ref().on("child_added", function(childSnapshot){
    //set childSnapshot to variables
    var childName = childSnapshot.val().name;
    var childDestination = childSnapshot.val().destination;
    var childStartTime = childSnapshot.val().startTime;
    var childFrequency = childSnapshot.val().frequency;

    console.log(childStartTime);

    // //create a moment object
    var minAway;
    //change the year so the first train comes before now
    var firstNewTrain = moment(childStartTime, "hh:mm").subtract(1, "years");
    //difference between the current and first train
    var diffTime = moment().diff(moment(firstNewTrain), "minutes");
    var remainder = diffTime % childFrequency;
    //minutes until next train
    minAway = childFrequency - remainder;
    //next train time 
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    var newRow = `<tr>
                    <td>${childName}</td>
                    <td>${childDestination}</td>
                    <td>${childFrequency}</td>
                    <td>${nextTrain}</td>
                    <td>${minAway} mins</td>
    </tr>`
    //append content to the display table
    $("tbody").append(newRow);
})