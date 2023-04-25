function createTrigger(){
  deleteTrigger()
  ScriptApp.newTrigger("onEditBy").forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet()).onEdit().create();
  SpreadsheetApp.getActiveSpreadsheet().toast("Trigger Set","Notification",3);
}

function deleteTrigger(){
  ScriptApp.getScriptTriggers().forEach(function(trigger){
    ScriptApp.deleteTrigger(trigger);
    SpreadsheetApp.getActiveSpreadsheet().toast("Trigger Deleted","Notification",2);
    });
}

var ss = SpreadsheetApp.getActive()
var itemRecieved = ss.getSheetByName('Item Receiving Sheet')
var itemIssue = ss.getSheetByName('Item Issuing Sheet')


var inoventrySheetId = "1IOpnc_E6qA7_9NgDUbgvplmEMra_HHYgFuGgPr4kfAg"
var inventoryManagement = SpreadsheetApp.openById(inoventrySheetId)
var rawMaterialSheet = inventoryManagement.getSheetByName('Raw Material Received Master')
var rawIssueSheet = inventoryManagement.getSheetByName("Raw Material Issue Master")

function onEditBy(e){
var range = e.range;
var sheet = range.getSheet();
var row = range.getRow();
var col = range.getColumn();
var value = range.getValue();
if (sheet.getName() == "Item Receiving Sheet" && col == 13 && value == "Approved" ){

var catNo = itemRecieved.getRange(row,2,1,1).getValue()
var range = rawMaterialSheet.getRange(rawMaterialSheet.getLastRow()+1,2,1,1)
range.setValue(catNo);

var itemData = itemRecieved.getRange(row,6,1,7).getValues()
var rData = []
rData.push(itemData[0][0],itemData[0][1],itemData[0][2],itemData[0][5],itemData[0][6])
Logger.log(rData)
var range2 = rawMaterialSheet.getRange(rawMaterialSheet.getLastRow(),6,1,5)
Logger.log(rData)
range2.setValues([rData])
sheet.deleteRow(row);
}
else 
if(sheet.getName() == "Item Issuing Sheet" && col == 13 && value == "Approved"){
var catNo2 = itemIssue.getRange(row,2,1,1).getValue()
var range3 = rawIssueSheet.getRange(rawIssueSheet.getLastRow()+1,2,1,1)
range3.setValue(catNo2);

var itemData2 = itemIssue.getRange(row,6,1,5).getValues()
var rData2 = []
rData2.push( itemData2[0][0],itemData2[0][1],itemData2[0][2],itemData2[0][4])
var range4 = rawIssueSheet.getRange(rawIssueSheet.getLastRow(),6,1,4)
range4.setValues([rData2])
sheet.deleteRow(row);
}
}






