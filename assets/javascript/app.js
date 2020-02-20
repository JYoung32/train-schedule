//firebase key
const firebaseConfig = {
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
const database = firebase.database();

buttonSubmit = (event) => {
    event.preventDefault();

    const name = $("#trainName").val().trim();
    const destination = $("#destination").val().trim();
    const startTime = $("#startTime").val().trim();
    const frequency = $("#frequency").val().trim();

    database.ref().push({
        name : name,
        destination : destination,
        startTime : startTime,
        frequency : frequency
    });

    $("#trainName, #destination, #startTime, #frequency").val("");
    //don't refresh the page
    return false;
};

//firebase watcher and initial loader.
database.ref().on("child_added", (childSnapshot) => {
    //set childSnapshot to variables
    const childName = childSnapshot.val().name;
    const childDestination = childSnapshot.val().destination;
    const childStartTime = childSnapshot.val().startTime;
    const childFrequency = childSnapshot.val().frequency;

    // //create a moment object
    let minAway;
    //change the year so the first train comes before now
    let firstNewTrain = moment(childStartTime, "hh:mm").subtract(1, "years");
    //difference between the current and first train
    let diffTime = moment().diff(moment(firstNewTrain), "minutes");
    let remainder = diffTime % childFrequency;
    //minutes until next train
    minAway = childFrequency - remainder;
    //next train time 
    let nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    const newRow = `<tr>
                    <td>${childName}</td>
                    <td>${childDestination}</td>
                    <td>${childFrequency}</td>
                    <td>${nextTrain}</td>
                    <td>${minAway} mins</td>
    </tr>`;
    //append content to the display table
    $("tbody").append(newRow);
});

//on click function for the submit button
$(".btn-submit").on("click", (event) => { buttonSubmit(event) });