function addRow() {
  var table= document.querySelector("table");
  var newRow=  table.insertRow(table.rows.length-1);

  for(var i=0;i< table.rows[0].cells.length;i++){
    var newCell= newRow.insertCell(i);
    newCell.setAttribute("contenteditable","true");
  }
}