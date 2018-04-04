$(document).ready(() => {
  getData(['Entel', 'Claro', 'WOM', 'Movistar']);

})

firebase.initializeApp({
  apiKey: 'AIzaSyDe27uFwRSZsd1wh3zG0jWa1DEaq8mJ6I4',
  authDomain: 'firestore-1450c.firebaseapp.com',
  /*databaseURL: "https://firestore-1450c.firebaseio.com",*/
  projectId: "firestore-1450c",
  /*storageBucket: "firestore-1450c.appspot.com",*/
 /* messagingSenderId: "454689367463"*/

});

var db = firebase.firestore();

$('#update').click(getCompanies)

function getCompanies() {
    createData($('input:checked').data('company'), $('option:selected').data('plan'))
}

function createData(company, plan) {
    db.collection(company).doc(plan).collection('enjaja').add({
      nombre: $('#plan').val(),
      precio: $('#precio').val(),
      gb: $('#gb').val() + 'gb libres',
      minutos: $('#min').val(),
      redes: $('#redes').val(),

    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

function getData(arr) {
  arr.forEach((company) => {
    let companyF = db.collection(company).doc('fijo').collection('enjaja');
    companyF.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.data());
          let k = doc.data()
        $('#fijo').append(`<td>${k.minutos}</td><td>${k.gb}</td><td>${k.redes}</td><td>${k.precio}</td>`)
      });
    })
    let companyL = db.collection(company).doc('libre').collection('enjaja');
    companyL.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.data());
          let k = doc.data()
        $('#libre').append(`<td>${k.minutos}</td><td>${k.gb}</td><td>${k.redes}</td><td>${k.precio}</td>`)
      });
    })
  })
}


google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
var data = google.visualization.arrayToDataTable([
['Año', 'Planes Libres', 'Planes Controlados'],
['Entel',  29.691,      9.990],
['Movistar',29.990  ,      9.990],
['Claro', 35.991,       9.990],
['Wom',  24.990,      9.990]
]);

var options = {
title: 'Comparación de Planes',


  series: {
    0: { color: '#0072ae' },
    1: { color: '#e7711b' },
    2: { color: '#f1ca3a' },
    3: { color: '#6f9654' },
    4: { color: '#1c91c0' },
    5: { color: '#43459d' },
  }
};

var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
chart.draw(data, options);
/*
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

 function signIn(){
 firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user.displayName);
  $('.navbar, .tercera_seccion, .segunda_seccion, .cuarta_seccion').removeClass('hidden');

  
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
*/

