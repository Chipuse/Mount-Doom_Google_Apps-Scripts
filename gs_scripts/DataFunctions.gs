function getRarity(_heroId) {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeroLookUp");
  var dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  for(var i = 0; i < dataRange.length; i++){
    if(dataRange[i][0] == _heroId){
      return dataRange[i][4];
    }
  }
}