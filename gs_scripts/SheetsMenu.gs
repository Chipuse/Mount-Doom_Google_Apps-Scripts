function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
      .addSubMenu(ui.createMenu('User Sheets')
        .addItem('Show User Sheets', 'showUserSheets')
        .addItem('Hide User Sheets', 'hideUserSheets')
        .addItem('Hide everySheet but user sheets', 'hideEverythingButUserSheets'))
      .addSubMenu(ui.createMenu('Deck Sheets')
        .addItem('Show Deck Sheets', 'showDeckSheets')
        .addItem('Hide Deck Sheets', 'hideDeckSheets'))
      .addSubMenu(ui.createMenu('Texts Sheets')
        .addItem('Show Text Sheets', 'showTextsSheets')
        .addItem('Hide Text Sheets', 'hideTextsSheets'))
      .addSubMenu(ui.createMenu('Version Menu')
        .addItem('Activate DefaultUpdate', 'activateDefaultUpdate')
        .addItem('Deactivate DefaultUpdate', 'deactivateDefaultUpdate')
        .addItem('Increase Version Num', 'increaseVersionNum'))
      .addSubMenu(ui.createMenu('Data Overview Menu')
        .addItem('updateOverviewSheet','updateOverviewSheet'))
      .addToUi();
}

function hideUserSheets(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("User",0)){
      sheets[i].hideSheet();
    }
  }
}
function showUserSheets(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("User",0)){
      sheets[i].showSheet();
    }
  }
}
function hideEverythingButUserSheets(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("User",0)){
      sheets[i].showSheet();
    }
    else{
      sheets[i].hideSheet();
    }
  }
}

function hideDeckSheets(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("deck",0)){
      sheets[i].hideSheet();
    }
  }
}
function showDeckSheets(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("deck",0)){
      sheets[i].showSheet();
    }
  }
}

function hideTextsSheets(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("Texts",0)){
      sheets[i].hideSheet();
    }
  }
}
function showTextsSheets(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("Texts",0)){
      sheets[i].showSheet();
    }
  }
}

function activateDefaultUpdate(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GlobalInfo");
  sheet.getRange(2,1).setValue(1);
}

function deactivateDefaultUpdate(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GlobalInfo");
  sheet.getRange(2,1).setValue(0);
}

function increaseVersionNum(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GlobalInfo");
  sheet.getRange(2,2).setValue(sheet.getRange(2,2).getValue() + 1);
}

function updateOverviewSheet(){
  updateOverview();
  updateRarity();
}
