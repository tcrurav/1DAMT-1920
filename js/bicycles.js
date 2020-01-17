window.onload = initialize;

const ADD = "add";
const UPDATE = "update";
var operation = ADD;
var keyBicycleToEdit;

function initialize() {
    initializeFirebase();

    document.getElementById("cancel-button").addEventListener("click", resetForm);

    captureSubmitEventWhenAddingABicycle();

    downloadBicycles();
}

function resetForm() {
    document.getElementById("update-button").style.display = "none";
    document.getElementById("cancel-button").style.display = "none";
    document.getElementById("add-button").style.display = "block";
    operation = ADD;
}

function captureSubmitEventWhenAddingABicycle() {
    document.getElementById("form-bicycle").addEventListener("submit", addOrUpdateBicycle);
}

function addOrUpdateBicycle(event) {
    event.preventDefault();

    var formBicycle = event.target;

    if (operation == ADD) {
        var refBicycles = firebase.database().ref("BicycleStore/bicycles");

        refBicycles.push({
            color: formBicycle.color.value,
            model: formBicycle.model.value,
            stock: formBicycle.stock.value
        });
    } else {
        var refBicycles = firebase.database().ref("BicycleStore/bicycles/" + keyBicycleToEdit);

        refBicycles.update({
            color: formBicycle.color.value,
            model: formBicycle.model.value,
            stock: formBicycle.stock.value
        });

        document.getElementById("update-button").style.display = "none";
        document.getElementById("cancel-button").style.display = "none";
        document.getElementById("add-button").style.display = "block";
        operation = ADD;
    }

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
            '<i class="fas fa-trash-alt delete" data-bicycle="' + key + '"></i>' +
            '<i class="fas fa-edit edit" data-bicycle="' + key + '"></i>' +
            '</td>' +
            '</tr>';
    }

    var myTBody = document.getElementById("my-tbody");
    myTBody.innerHTML = rows;

    var editButtons = document.getElementsByClassName("edit");
    var deleteButtons = document.getElementsByClassName("delete");
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteBicycle);
        editButtons[i].addEventListener("click", editBicycle);
    }
}

function editBicycle(event) {
    document.getElementById("update-button").style.display = "block";
    document.getElementById("cancel-button").style.display = "block";
    document.getElementById("add-button").style.display = "none";
    operation = UPDATE;

    var buttonClicked = event.target;

    var formBicycle = document.getElementById("form-bicycle");

    keyBicycleToEdit = buttonClicked.getAttribute("data-bicycle");
    var refBicycleToEdit = firebase.database().ref("/BicycleStore/bicycles/" + keyBicycleToEdit);

    refBicycleToEdit.once("value", function (snap) {
        var data = snap.val();

        formBicycle.color.value = data.color;
        formBicycle.model.value = data.model;
        formBicycle.stock.value = data.stock;
    });


}

function deleteBicycle(event) {
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