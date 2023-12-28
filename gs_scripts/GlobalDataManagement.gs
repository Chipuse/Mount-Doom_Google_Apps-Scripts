class GlobalData{
  constructor(){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GlobalInfo");
    this.defaultUpdate = sheet.getRange(2,1).getValue();
    this.versionNum = sheet.getRange(2,2).getValue();
    this.formData = createFormData();
    this.fameData = createFameData();
  }
}

class FormEntry{
  constructor(_count, _title, _message, _link, _condition, _conVal){
    this.count = _count;
    this.title = _title;
    this.message = _message;
    this.link = _link;
    this.condition = _condition;
    this.conVal = _conVal;
  }
}

class FameEntry{
  constructor(_name, _date){
    this.name = _name;
    this.date = _date;
  }
}

function createFormData(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GlobalInfo");
  var formData = [];
  var last = sheet.getLastRow();
  var sheetData = sheet.getRange(2, 4, sheet.getLastRow() - 1, 6).getValues();
  for(var i = 0; i < sheetData.length; i++){
    if(sheetData[i][1] != ''){
      formData.push(new FormEntry(sheetData[i][0],sheetData[i][1],sheetData[i][2],sheetData[i][3],sheetData[i][4], sheetData[i][5], sheetData[i][6]));
    }
  }
  return formData;
}

function createFameData(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GlobalInfo");
  var fameData = [];
  var last = sheet.getLastRow();
  var sheetData = sheet.getRange(1, 14, sheet.getLastRow(), 2).getValues();
  for(var i = 0; i < sheetData.length; i++){
    if(sheetData[i][1] != ''){
      fameData.push(new FameEntry(sheetData[i][0],sheetData[i][1]));
    }
  }
  return fameData;
}

function pullGlobalData() {
  var globalData = new GlobalData();
  returnPackage = globalData;
  requestMarker = requestTypes.pullGlobalData;
  Logger.log(JSON.stringify(returnPackage));
  Logger.log(JSON.stringify(requestMarker));
}
