window.onload = initialize;

function initialize() {
    initializeFirebase();

    downloadBicycles();
}

function downloadBicycles() {
    var bicycles = firebase.database().ref("BicycleStore/bicycles");

    bicycles.on("value", showBicycles);
}

function showBicycles(snap) {
    var data = snap.val();

    var rows = "";
    for (var key in data) {
        rows += '<tr>' +
            '<td>' + data[key].color + '</td>' +
            '<td>' + data[key].model + '</td>' +
            '<td>' + data[key].stock + '</td>' +
            '</tr>';
    }

    var myTBody = document.getElementById("my-tbody");
    myTBody.innerHTML = rows;
}

function initializeFirebase() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDhV9DasKq66b9AcVPknl4UGdNLil8mSJU",
        authDomain: "tcrurav.firebaseapp.com",
        databaseURL: "https://tcrurav.firebaseio.com",
        projectId: "tcrurav",
        storageBucket: "tcrurav.appspot.com",
        messagingSenderId: "378131985655",
        appId: "1:378131985655:web:c4e5cb55c143bc835e0ff2",
        measurementId: "G-GV51RSZRN3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}