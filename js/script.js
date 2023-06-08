//initializing firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmt8TvOWe_WzvfY01eTrYxWMGELxPXfsM",
  authDomain: "my-timesheet-84bb8.firebaseapp.com",
  databaseURL: "https://my-timesheet-84bb8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-timesheet-84bb8",
  storageBucket: "my-timesheet-84bb8.appspot.com",
  messagingSenderId: "238830562766",
  appId: "1:238830562766:web:4df9f1bdaf843975a48f9f",
  measurementId: "G-GVW4CPNCXY"
};

firebase.initializeApp(firebaseConfig);

function addRow() {
  var table= document.querySelector("table");
  var newRow=  table.insertRow(table.rows.length-1);

  for(var i=0;i< table.rows[0].cells.length;i++){
    var newCell= newRow.insertCell(i);
    newCell.setAttribute("contenteditable","true");
  }
  
  // // Get the values from the new row
  // var rowData = {
  //   projectCode: newRow.cells[0].innerText,
  //   taskName: newRow.cells[1].innerText,
  //   day1: newRow.cells[2].innerText,
  //   day2: newRow.cells[3].innerText,
  //   day3: newRow.cells[4].innerText,
  //   day4: newRow.cells[5].innerText,
  //   day5: newRow.cells[6].innerText,
  //   day6: newRow.cells[7].innerText,
  //   day7: newRow.cells[8].innerText,

  // };

  // // Save the data to Firebase Realtime Database
  // firebase.database().ref("tableData").push(rowData);
};

function saveData() {
  // Get a reference to the Firebase Realtime Database
  const database = firebase.database();

  // Get the table element
  const table = document.querySelector('.table');

  // Get all the rows in the table except the header row
  const rows = Array.from(table.querySelectorAll('tr:not(:first-child)'));

  // Create an object to store the data from the table
  const data = [];

  // Iterate over each row and extract the data
  rows.forEach((row) => {
    const rowData = {};
    const cells = row.querySelectorAll('td');
    rowData.projectCode = cells[0].textContent.trim();
    rowData.taskName = cells[1].textContent.trim();
    rowData.day1 = cells[2].textContent.trim();
    rowData.day2 = cells[3].textContent.trim();
    rowData.day3 = cells[4].textContent.trim();
    rowData.day4 = cells[5].textContent.trim();
    rowData.day5 = cells[6].textContent.trim();
    rowData.day6 = cells[7].textContent.trim();
    rowData.day7 = cells[8].textContent.trim();
    rowData.dates = Array.from(cells)
      .slice(2, -1)
      .map((cell) => cell.textContent.trim() || null);
    data.push(rowData);
  });

  // Save the data to the Firebase Realtime Database
  database.ref('tableData').set(data)
    .then(() => {
      console.log('Data saved successfully');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
}