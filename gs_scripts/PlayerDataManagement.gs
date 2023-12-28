function testPefromance(){
  var player = pushInventory();
}

class Player{
  constructor(_playerId){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
    var playerVals = sheet.getRange(2,1,1,15).getValues();

    this.playerId = playerVals[0][0];
    this.password = playerVals[0][1];
    this.joinDate = playerVals[0][2];
    this.lastUpdate = playerVals[0][3];
    this.profileDescription = playerVals[0][4];
    this.mtdCounter = playerVals[0][5];
    this.tradeCounter = playerVals[0][6];
    this.lastDungeonDate = playerVals[0][7];
    this.currentDungeon = playerVals[0][8];
    this.rewardTierBuff = playerVals[0][9];
    this.shards = playerVals[0][10];
    this.tradeStartDate = playerVals[0][11];
    this.appOpen = playerVals[0][12];
    this.tradeStarted = playerVals[0][13];
    this.dungeonCleared = playerVals[0][14];

    this.blacklist = createBlacklist(_playerId);
    this.inventory = createInventory(_playerId);

    this.answeredForms = getAnsweredForms(_playerId);

    this.dex = getPlayerDex(_playerId);
  }
}

function getAnsweredForms(_playerId){
  if(_playerId == undefined){
    _playerId = 'Mark';
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
  var answeredForms = [];
  var sheetData = sheet.getRange(4, 26, sheet.getLastRow() - 3, 1).getValues();
  for(var i = 0; i < sheetData.length; i++){
    if(sheetData[i][0] != ''){
      answeredForms.push(sheetData[i][0]);
    }
  }
  return answeredForms;
}

function testCall() {
  var testPlayer = new Player("Sarah");
  Logger.log(testPlayer);
  applyPlayerData(testPlayer);
}

function applyPlayerData(_player){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_player.playerId);
  /*
  sheet.getRange(2,1).setValue(_player.playerId);
  sheet.getRange(2,2).setValue(_player.password);
  sheet.getRange(2,3).setValue(_player.joinDate);
  sheet.getRange(2,4).setValue(new Date());
  sheet.getRange(2,5).setValue(_player.profileDescription);
  sheet.getRange(2,6).setValue(_player.mtdCounter);
  sheet.getRange(2,7).setValue(_player.tradeCounter);
  sheet.getRange(2,8).setValue(_player.lastDungeonDate);
  sheet.getRange(2,9).setValue(_player.currentDungeonRun);
  sheet.getRange(2,10).setValue(_player.rewardTierBuff);
  sheet.getRange(2,11).setValue(_player.shards);
  sheet.getRange(2,12).setValue(_player.tradeStartDate);
  */
  var fruits = [ 
    [_player.playerId.replace(/ /g, "_"), 
    _player.password, 
    _player.joinDate,
    new Date(),
    _player.profileDescription,
    _player.mtdCounter,
    _player.tradeCounter,
    _player.lastDungeonDate,
    _player.currentDungeonRun,
    _player.rewardTierBuff,
    _player.shards,
    _player.tradeStartDate,
    _player.appOpen,
    _player.tradeStarted,
    _player.dungeonCleared] ];
  sheet.getRange(2, 1, 1, 15).setValues(fruits);

  //depricated
  //applyInventory(_player);
  //depricated
  //applyBlacklist(_player);
}

function createInventory(_playerId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
  var inventory = [];

  var iterator = 0;
  while(sheet.getRange(iterator + 11, 2).isBlank() != true){
    var playerHero = new PlayerHero(_playerId, iterator);
    inventory.push(playerHero);
    iterator++;
  }
  return inventory;
}

//depricated
function applyInventory(_player){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_player.playerId);
  sheet.getRange(11,2,50,13).clearContent();
  for(var i = 0; i < _player.inventory.length; i++){
    applyPlayerHero(i, _player.inventory[i], sheet)
  }
}

function applyPlayerHero(_invNum, _temp, sheet){
  var fruits = [ 
    [_temp.uniqueId, 
    _temp.heroId, 
    _temp.status,
    _temp.pVal,
    _temp.pPot,
    _temp.mVal,
    _temp.mPot,
    _temp.sVal,
    _temp.sPot,
    _temp.lastOwner,
    _temp.origOwner,
    _temp.invIndex,
    _temp.traded,
    _temp.runs] ];
  sheet.getRange(11 + _invNum, 1, 1, 14).setValues(fruits);
}

class PlayerHero{
   constructor(_playerId, _invNum){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
    var playerHerovals = sheet.getRange(11 + _invNum, 1, 1, 14).getValues();

    this.uniqueId = playerHerovals[0][0];
    this.heroId = playerHerovals[0][1];
    this.status = playerHerovals[0][2];
    
    this.pVal = playerHerovals[0][3];
    this.pPot = playerHerovals[0][4];
    this.mVal = playerHerovals[0][5];
    this.mPot = playerHerovals[0][6];
    this.sVal = playerHerovals[0][7];
    this.sPot = playerHerovals[0][8];

    this.lastOwner = playerHerovals[0][9];
    this.origOwner = playerHerovals[0][10];
    this.invIndex = playerHerovals[0][11];
    this.traded = playerHerovals[0][12];
    this.runs = playerHerovals[0][13];
   }
}

//deprictaed
function applyBlacklist(_player){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_player.playerId);
  sheet.getRange(11,16,50,2).clearContent();
  for(var i = 0; i < _player.blacklist.length; i++){
    applyBlacklistEntry(i, _player.blacklist[i], sheet)
  }
}
//depricated
function applyBlacklistEntry(_entryNum, _temp, sheet){
  sheet.getRange(11 + _entryNum, 16).setValue(_temp.playerId);
  sheet.getRange(11 + _entryNum, 17).setValue(_temp.heroId);
}


function createBlacklist(_playerId) {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +_playerId);
  var blacklist = [];
  var iterator = 11;
  var blacklistVals = sheet.getRange(11, 16, sheet.getLastRow() - 10, 2).getValues();
  for(var i = 0; i < blacklistVals.length; i++){
    if(blacklistVals[i][0] != ""){
      var blackListEntry = new BlacklistEntry(blacklistVals[i][0],blacklistVals[i][1]);
      blacklist.push(blackListEntry);
    }
    iterator++;
  }
}
class BlacklistEntry{
  constructor(playerId, heroId){
    this.playerId = playerId;
    this.heroId = heroId;
  }
}

//use playername and password to check if account already exists. If not create new one and sign in. If it does return error
function signUp(e){
  var userName = 'testUser';
  var password = 'testPassword';
  //incomingObj = JSON.parse("{\"playerId\":\"Sarah\",\"password\":\"Password\"}");
  if(incomingObj != undefined){
    userName = incomingObj.playerId;
    password = incomingObj.password;
  }
  
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +userName.replace(/ /g, "_"));
  
  if (sheet == null) {
    sheet = ss.insertSheet("User" +userName.replace(/ /g, "_"));
    sheet.hideSheet();
    //fill out playerSheet
    ss.setActiveSheet(sheet);
    sheet.getRange(1, 1).setValue('UserName');
    sheet.getRange(1, 2).setValue('Password');
    sheet.getRange(1, 3).setValue('Date of Join');
    sheet.getRange(1, 4).setValue('Last Update');
    sheet.getRange(1, 5).setValue('Profile Description');
    sheet.getRange(1, 6).setValue('Mount Doom Counter');
    sheet.getRange(1, 7).setValue('Trade Counter');
    sheet.getRange(1, 8).setValue('Last Dungeon Run');
    sheet.getRange(1, 9).setValue('Current Dungeon Run');
    sheet.getRange(1, 10).setValue('Initial Reward Tier Buff');
    sheet.getRange(1, 11).setValue('Shards');
    sheet.getRange(1, 12).setValue('TradeRoutineStart');
    sheet.getRange(1, 13).setValue('App open Count');
    sheet.getRange(1, 14).setValue('Trade Started Count');
    sheet.getRange(1, 15).setValue('Dungeons Cleared Count');
    
    sheet.getRange(1, 16).setValue('Gender');
    sheet.getRange(1, 17).setValue('Age');
    sheet.getRange(1, 18).setValue('Device');
    sheet.getRange(1, 19).setValue('Experience');

    sheet.getRange(1, 20).setValue('Neuroticism');
    sheet.getRange(1, 21).setValue('Extraversion');
    sheet.getRange(1, 22).setValue('Openness');
    sheet.getRange(1, 23).setValue('Agreeableness');
    sheet.getRange(1, 24).setValue('Conscientiousness');

    //set values
    sheet.getRange(2, 1).setValue(userName.replace(/ /g, "_"));
    sheet.getRange(2, 2).setValue(password);
    sheet.getRange(2, 3).setValue(new Date());
    sheet.getRange(2, 4).setValue(new Date());
    sheet.getRange(2, 5).setValue('none');
    sheet.getRange(2, 6).setValue(0);
    sheet.getRange(2, 7).setValue(0);
    sheet.getRange(2, 8).setValue(new Date());
    sheet.getRange(2, 9).setValue('idling in hub');
    sheet.getRange(2, 10).setValue(1);
    sheet.getRange(2, 11).setValue(0);
    //Inventory
    sheet.getRange(10, 1).setValue('UniqueID:');
    sheet.getRange(10, 2).setValue('Hero ID');
    sheet.getRange(10, 3).setValue('Status');
    sheet.getRange(10, 4).setValue('Val 1');
    sheet.getRange(10, 5).setValue('Pot 1');
    sheet.getRange(10, 6).setValue('Val 2');
    sheet.getRange(10, 7).setValue('Pot 2');
    sheet.getRange(10, 8).setValue('Val 3');
    sheet.getRange(10, 9).setValue('Pot 3');

    sheet.getRange(10, 10).setValue('lastOwner');
    sheet.getRange(10, 11).setValue('origOwner');
    sheet.getRange(10, 12).setValue('invIndex');
    sheet.getRange(10, 13).setValue('traded');
    sheet.getRange(10, 14).setValue('runs');

    //sheet.setColumnWidths(4,6,35);
    
    //Blacklist
    sheet.getRange(10, 15).setValue('Blacklist:');
    sheet.getRange(10, 16).setValue('Player ID');
    sheet.getRange(10, 17).setValue('Hero ID');
    for(var i = 1; i <= 24; i++){
      //sheet.getRange(10 + i, 1).setValue(i);
      sheet.getRange(10 + i, 15).setValue(i);
    }
    // from 10, 2 on we have the x amount of character places

    //do signIn
    var playerData = new Player(userName);
    returnPackage = playerData;
    requestMarker = requestTypes.signUp;
    Logger.log(JSON.stringify(returnPackage));
  }
  else{
    ss.setActiveSheet(sheet);
    //return username already taken
    returnPackage = new TextMessage("SignUp failed - username already taken");
    requestMarker = requestTypes.error;
    Logger.log(JSON.stringify(returnPackage));
  }
}

//use playername and password to check if account already exists and pw matches. If it does sign in. Else return error
function signIn(e){
  var userName = 'testUser';
  var password = 'testPassword';
  //incomingObj = JSON.parse("{\"playerId\":\"Sarah\",\"password\":\"Password\"}");
  if(incomingObj != undefined){
    userName = incomingObj.playerId;
    password = incomingObj.password;
  }
  
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +userName);
  
  if (sheet == null) {
    //return error
    returnPackage = new TextMessage( "SignIn failed - no user found");
    requestMarker = requestTypes.error;
  }
  else{
    ss.setActiveSheet(sheet);
    //return username already taken
    var playerData = new Player(userName);
    if(playerData.password == password){
      returnPackage = playerData;
      requestMarker = requestTypes.signIn;
      Logger.log(JSON.stringify(returnPackage));
    }
    else{
      returnPackage = new TextMessage("SignIn failed - password incorrect");
      requestMarker = requestTypes.error;
    }
  }
}

function pushPlayerData(){
  if(incomingObj != undefined){
    userName = incomingObj.playerId;
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +userName);
  
  if (sheet == null) {
    //return error
    returnPackage = new TextMessage("SignIn failed - no user found");
    requestMarker = requestTypes.error;
  }
  else{
    applyPlayerData(incomingObj);
    returnPackage = new TextMessage("Pushed DataSuccessfully");
    requestMarker = requestTypes.pushPlayerData;
  }
}

function pushInventory(){
  if(incomingObj != undefined){
    userName = incomingObj.loginInfo.playerId;
  }
  else{
    userName = "Mark";
    var tempInv = createInventory(userName);
    incomingObj = {loginInfo: {playerId: "Mark" }, inventorySegment: []};
    for(var i = 0; i < tempInv.length; i++){
      var newEntry = {
        uniqueId: tempInv[i].uniqueId,
        heroId: tempInv[i].heroId,
        status: tempInv[i].status,
        pVal: tempInv[i].pVal,
        pPot: tempInv[i].pPot,
        mVal: tempInv[i].mVal,
        mPot: tempInv[i].mPot,
        sVal: tempInv[i].sVal,
        sPot: tempInv[i].sPot,
        lastOwner: tempInv[i].lastOwner,
        origOwner: tempInv[i].origOwner,
        invIndex: tempInv[i].invIndex,
        traded: tempInv[i].traded,
        runs: tempInv[i].runs
        };
      var newSegment = {index : i, entry : newEntry};
      incomingObj.inventorySegment.push(newSegment);
    }
  }
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +userName);
  if (sheet == null) {
    //return error
    returnPackage = new TextMessage("SignIn failed - no user found");
    requestMarker = requestTypes.error;
  }
  else{
    //check if first entry has index 0 -> if yes then clear current inventory data
    if(incomingObj.inventorySegment.length > 0){
      if(incomingObj.inventorySegment[0].index == 0){
        //clear inventory space
        sheet.getRange(11,2,50,13).clearContent();
      }
      for ( var i = 0; i < incomingObj.inventorySegment.length; i++){
        applyPlayerHero(incomingObj.inventorySegment[i].index, incomingObj.inventorySegment[i].entry, sheet)
      }
    }
    returnPackage = new TextMessage("Pushed Inventory Segment Successfully");
    requestMarker = requestTypes.pushInventory;
  }
}

function getRowOfHero(_userName, _uniqueId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" + _userName);
  if(sheet != null){
    var uniqueIds = sheet.getRange(11, 1, sheet.getLastRow() - 10, 1).getValues();
    for(var i = 0; i < uniqueIds.length; i++){
      if(uniqueIds[i][0] == _uniqueId){
        return i + 11;
      }
    }
  }
}

function testGetRow(){
  getRowOfHero("Mark", 12);
}

function pushBlacklist(){
  
}

//get player data by username. If username does not exist return error
function getPlayerData(e){

}