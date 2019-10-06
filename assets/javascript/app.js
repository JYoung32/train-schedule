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
    var momentStart = moment(childStartTime, "HH:mm");
    var nextArrival = momentStart.add(childFrequency, "minutes").format("LT");
    var momentDiff = moment(momentStart).diff(moment(), "minutes");
    var minutesRemain = momentDiff % childFrequency;


    var newRow = `<tr>
                    <td>${childName}</td>
                    <td>${childDestination}</td>
                    <td>${childFrequency}</td>
                    <td>${nextArrival}</td>
                    <td>${minutesRemain} mins</td>
    </tr>`
    //append content to the display table
    $("tbody").append(newRow);
})