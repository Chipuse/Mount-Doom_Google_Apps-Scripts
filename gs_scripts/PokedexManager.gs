function setUpDex(_playerId) {
  if(_playerId == undefined){
    _playerId = "Mark";
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var userSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
  var heroSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeroLookUp");
  var heroNames = heroSheet.getRange(1,1, heroSheet.getLastRow(), 1).getValues();
  if(userSheet != null){
    userSheet.getRange(3,24,heroNames.length, 1).setValues(heroNames);
    for(var i = 0; i < heroNames.length; i++){
      heroNames[i][0] = 0;
    }
    userSheet.getRange(3,25,heroNames.length, 1).setValues(heroNames);    
  }
}

function moveDex(){
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("User",0)){
      var userSheet = sheets[i];
      var sheetName = userSheet.getSheetName();
      var playerDex = userSheet.getRange(1,24, 2, 2).clear();
    }
  }
}

function getPlayerDex(_playerId){
  if(_playerId == undefined){
    _playerId = "Robyn";
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var userSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
  if(userSheet.getRange(7,25,1,1).isBlank()){
    setUpDex(_playerId);
  }
  var heroSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeroLookUp");
  var playerDex = userSheet.getRange(4,25, heroSheet.getLastRow()-1, 1).getValues();
  var flattenedDex = [];
  for(var i=0; i < playerDex.length;i++){
    flattenedDex.push(playerDex[i][0]);
  }
  return flattenedDex;
}

function pushDexEntries(){
  if(incomingObj == undefined){
    incomingObj = {playerInfo:{playerId:"Mark",password:"pw", date:"2021-12-13 09:13:24Z"},dexIndex:0,newVal:1};
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var userSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +incomingObj.playerInfo.playerId);
  userSheet.getRange(4 + incomingObj.dexIndex, 25,1).setValue(incomingObj.newVal);
  requestMarker = requestTypes.pushDexEntries;
  returnPackage = new TextMessage("Pushed DexEntry Successfully");
}