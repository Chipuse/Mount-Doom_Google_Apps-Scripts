class DungeonData{
  constructor(_playerId){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" + _playerId);
    var _dailyDungeons = [];
    var iterator = 0;
    while(sheet.getRange((iterator * 6) + 10, 20).isBlank() != true){
      var dailyDungeon = new DailyDungeon(_playerId, (iterator * 6) + 10, 20);
      dailyDungeon.difficultyIndex = iterator;
      if(iterator <= 2){
        dailyDungeon.type = 0;
      }
      else{
        dailyDungeon.type = 1;
      }
      _dailyDungeons.push(dailyDungeon);
      iterator++;
    }
    this.dailyDungeons = _dailyDungeons;
    this.currentRun = new DungeonRun(_playerId);
  }
}

class DailyDungeon{
  constructor(_playerId, _startingCellY, _startingCellX){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
    this.layoutId = sheet.getRange(_startingCellY, _startingCellX).getValue();
    this.date =sheet.getRange(_startingCellY + 1, _startingCellX).getValue();
    this.dailySeed =sheet.getRange(_startingCellY + 2, _startingCellX).getValue();
    this. questName =sheet.getRange(_startingCellY + 3, _startingCellX).getValue();
    this.type = sheet.getRange(_startingCellY + 4, _startingCellX).getValue();
    this.difficultyIndex = sheet.getRange(_startingCellY + 5, _startingCellX).getValue();
  }
}

class RandomNum{
  constructor(_playerId, _index){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
    this.step = sheet.getRange(22 + _index, 21).getValue();
    this.num = sheet.getRange(22 + _index, 22).getValue();
  }
}

class DungeonRun{
  constructor(_playerId){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
    //other vars
    this.valid =sheet.getRange(10, 22).getValue();
    this.date =sheet.getRange(11, 22).getValue();
    this.dungeonSeed =sheet.getRange(12, 22).getValue();
    this.dungeon = new DailyDungeon(_playerId, 13, 22);
    this.initialRewardTier =sheet.getRange(19, 22).getValue();
    this.maxSteps =sheet.getRange(20, 22).getValue();

    //randomNums of run
    var _randomNums = [];
    var iterator = 0;
    while(sheet.getRange(iterator + 21, 21).isBlank() != true){
      var randomNum = new RandomNum(_playerId, iterator);
      _randomNums.push(randomNum);
      iterator++;
    }
    this.randomNums = _randomNums;

    //creating party from inventory
    var _party = [];
    iterator = 0;
    while(sheet.getRange(iterator + 11, 2).isBlank() != true){
      if(sheet.getRange(iterator + 11, 3).getValue() == 2){
        var playerHero = new PlayerHero(_playerId, iterator);
        _party.push(playerHero);
      }
      iterator++;
    }
    this.party = _party;
  }
}

function pushDungeonData(){
  var playerId = "Error";
  if(incomingObj != undefined){
    playerId = incomingObj.playerInfo.playerId;
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +playerId);

  var dungeonData = incomingObj.dungeonData;
  if (sheet == null) {
    //return error
    returnPackage = new TextMessage("Push failed - no user found");
    requestMarker = requestTypes.error;
  }
  else{
    applyDungeonData(playerId, dungeonData);
    requestMarker = requestTypes.pushPlayerData;
    returnPackage = new TextMessage("Pushed DataSuccessfully");
  }
}

function applyDungeonData(_playerId, _dungeonData){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
  //sheet.getRange(2,1).setValue(_player.playerId);
  //clear sheet from previous dungeon data
  sheet.getRange(10,20,50,1).clearContent();
  sheet.getRange(10,22,10,1).clearContent();
  sheet.getRange(22,21,50,2).clearContent();
  sheet.getRange(8,20).setValue("Hallo");

  //dailyDungeonData
  for( var i = 0; i < _dungeonData.dailyDungeons.length; i++){
    sheet.getRange((i * 6) + 10, 20).setValue(_dungeonData.dailyDungeons[i].layoutId);
    sheet.getRange((i * 6) + 11, 20).setValue(_dungeonData.dailyDungeons[i].date);
    sheet.getRange((i * 6) + 12, 20).setValue(_dungeonData.dailyDungeons[i].dailySeed);
    sheet.getRange((i * 6) + 13, 20).setValue(_dungeonData.dailyDungeons[i].questName);
    sheet.getRange((i * 6) + 14, 20).setValue(_dungeonData.dailyDungeons[i].type);
    sheet.getRange((i * 6) + 15, 20).setValue(_dungeonData.dailyDungeons[i].difficultyIndex);
  }
  //dungeonRun data
  sheet.getRange(10, 22).setValue(_dungeonData.currentRun.valid);
  sheet.getRange(11, 22).setValue(_dungeonData.currentRun.date);
  sheet.getRange(12, 22).setValue(_dungeonData.currentRun.dungeonSeed);

  sheet.getRange(13, 22).setValue(_dungeonData.currentRun.dungeon.layoutId);
  sheet.getRange(14, 22).setValue(_dungeonData.currentRun.dungeon.date);
  sheet.getRange(15, 22).setValue(_dungeonData.currentRun.dungeon.dailySeed);
  sheet.getRange(16, 22).setValue(_dungeonData.currentRun.dungeon.questName);
  sheet.getRange(17, 22).setValue(_dungeonData.currentRun.dungeon.type);
  sheet.getRange(18, 22).setValue(_dungeonData.currentRun.dungeon.difficultyIndex);

  sheet.getRange(19, 22).setValue(_dungeonData.currentRun.initialRewardTier);
  sheet.getRange(20, 22).setValue(_dungeonData.currentRun.maxSteps);

  for( var i = 0; i < _dungeonData.currentRun.randomNums.length; i++){
    sheet.getRange(22 + i, 21).setValue(_dungeonData.currentRun.randomNums[i].step);
    sheet.getRange(22 + i, 22).setValue(_dungeonData.currentRun.randomNums[i].num);
  }
}

function downloadDungeonData(){
  var playerId = "Mark";
  if(incomingObj != undefined){
    playerId = incomingObj.playerId;
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +playerId);
  if (sheet == null) {
    //return error
    returnPackage = new TextMessage("Download of Dungeon Data failed - no user found");
    requestMarker = requestTypes.error;
  }
  else{
    var dungeonData = new DungeonData(playerId);
    Logger.log(JSON.stringify(dungeonData));
    returnPackage = dungeonData;
    requestMarker = requestTypes.downloadDungeonData;
    Logger.log(JSON.stringify(returnPackage));
    Logger.log(JSON.stringify(requestMarker));
  }
  
}

function testDungeonData(){
  downloadDungeonData();
  pushDungeonData(returnPackage);
}