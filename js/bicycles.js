window.onload = initialize;

function initialize() {
    initializeFirebase();

    captureSubmitEventWhenAddingABicycle();

    downloadBicycles();
}

function captureSubmitEventWhenAddingABicycle(){
    document.getElementById("form-bicycle").addEventListener("submit", addBicycle);
}

function addBicycle(event){
    event.preventDefault();

    var formBicycle = event.target;

    var refBicycles = firebase.database().ref("BicycleStore/bicycles");

    refBicycles.push({
        color: formBicycle.color.value,
        model: formBicycle.model.value,
        stock: formBicycle.stock.value
    });

    formBicycle.reset();
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
            '<td>' +
                '<i class="fas fa-trash-alt delete" data-bicycle="' + key +  '"></i>' +
                '<i class="fas fa-edit edit" data-bicycle="' + key +  '"></i>' +
            '</td>' +
            '</tr>';
    }

    var myTBody = document.getElementById("my-tbody");
    myTBody.innerHTML = rows;

    var deleteButtons = document.getElementsByClassName("delete");
    for(var i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", deleteBicycle);
    }
}

function deleteBicycle(event){
    var buttonClicked = event.target;

    var keyBicycleToDelete = buttonClicked.getAttribute("data-bicycle");
    var refBicycleToDelete = firebase.database().ref("BicycleStore/bicycles/" + keyBicycleToDelete);
    refBicycleToDelete.remove();
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