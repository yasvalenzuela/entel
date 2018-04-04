$(document).ready(() => {
  getData(['Entel', 'Claro', 'WOM', 'Movistar']);
  google.charts.load('current', {packages:['corechart']});
      google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var oldData = google.visualization.arrayToDataTable([
        ['Name', 'Popularity'],
        ['Entel', 9990],
        ['Movistar', 9990],
        ['Claro', 9990],
        ['Wom', 9990]
      ]);

      var newData = google.visualization.arrayToDataTable([
        ['Name', 'Popularity'],
        ['Entel', 0],
        ['Movistar', 600],
        ['Claro', 700],
        ['Wom', 1500]
      ]);

      var options = {

     series: {
       0: { color: '#e2431e' },
       1: { color: '#e7711b' },
       2: { color: '#f1ca3a' },
       3: { color: '#6f9654' },
       4: { color: '#1c91c0' },

     }
   };

      var colChartDiff = new google.visualization.ColumnChart(document.getElementById('colchart_diff'));
      var barChartDiff = new google.visualization.BarChart(document.getElementById('barchart_diff'));

      var options = { legend: { position: 'top' } };

      var diffData = colChartDiff.computeDiff(oldData, newData);
      colChartDiff.draw(diffData, options);
      barChartDiff.draw(diffData, options);
    }
})

firebase.initializeApp({
  apiKey: 'AIzaSyDe27uFwRSZsd1wh3zG0jWa1DEaq8mJ6I4',
  authDomain: 'firestore-1450c.firebaseapp.com',
  projectId: 'firestore-1450c'
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
