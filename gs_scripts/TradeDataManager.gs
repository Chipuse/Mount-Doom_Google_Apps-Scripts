function numbersOnly(value) {
        if (typeof (value) === 'number') {
            return value;
        }
    }

class TradeOffer{
  constructor(_row){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
    var sheetInterests = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOfferInterests");
    if(_row == undefined){
      return;
    }
    var offerRange = sheet.getRange(_row, 1, 1, 10).getValues();
    this.available = offerRange[0][0];//sheet.getRange(_row, 1).getValue();
    this.offerId = offerRange[0][1];//sheet.getRange(_row, 2).getValue();
    this.date = offerRange[0][2];//sheet.getRange(_row, 3).getValue();
    this.playerId = offerRange[0][3];//sheet.getRange(_row, 4).getValue();
    this.heroId = offerRange[0][4];//sheet.getRange(_row, 5).getValue();
    this.uniqueId = offerRange[0][5];//sheet.getRange(_row, 6).getValue();
    this.lastOwner = offerRange[0][6];//sheet.getRange(_row, 7).getValue();
    this.origOwner = offerRange[0][7];//sheet.getRange(_row, 8).getValue();
    this.traded = offerRange[0][8];//sheet.getRange(_row, 9).getValue();
    this.runs = offerRange[0][9];//sheet.getRange(_row, 10).getValue();
    var _interestedOffers = sheetInterests.getRange(this.offerId, 1, 1, sheetInterests.getMaxColumns()).getValues();

    this.interestedOffers = _interestedOffers[0].filter(numbersOnly);
  }

  stillAvailable(){
    if(this.available == undefined || this.available == ""){
      return true;
    }
    else{
      return false;
    }
  }
}

function applyTradeOffer(_row, _tradeOffer){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
  var sheetInterests = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOfferInterests");
  sheet.getRange(_row, 1, 1, sheet.getMaxColumns()).clear();
  var fruits = [ 
    [_tradeOffer.available, 
    _tradeOffer.offerId, 
    _tradeOffer.date,
    _tradeOffer.playerId,
    _tradeOffer.heroId,
    _tradeOffer.uniqueId,
    _tradeOffer.lastOwner,
    _tradeOffer.origOwner,
    _tradeOffer.traded,
    _tradeOffer.runs] ];
  sheet.getRange(_row, 1, 1, 10).setValues(fruits);
  for(var i = 0; i < _tradeOffer.interestedOffers.length; i++){
      sheetInterests.getRange(_tradeOffer.offerId, _tradeOffer.interestedOffers[i]).setValue(_tradeOffer.interestedOffers[i]);
  }
}

//Interests:
//    a b c d e f ...
//    ---> Coloumns are the interests made by id
// 1|   2                     <-(this would mean offerId 2 is interested in offerId 1)
// 2| 1
// 3|       4 5               <-(this would mean offerId 4 and 5 are interested in offerId 1)
//..v
// Rows are the interests the ids get
//
// by this we can delete an entire coloumn to clear all interests of an offerId when we want to delete the offer
//


function removeAllInterestedTrade(_interestId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetInterests = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOfferInterests");
  if(sheetInterests.getLastRow() > 0){
    sheetInterests.getRange(1, _interestId, sheetInterests.getLastRow(),1).clear();
  }
}

function removeAllInterestsFromTrade(_tradeId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetInterests = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOfferInterests");
  if(sheetInterests.getLastColumn() > 0){
    sheetInterests.getRange(_tradeId, 1, 1,sheetInterests.getLastColumn()).clear();
  }
}

function removeInterestedTrade(_offerId, _interestedId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetInterests = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOfferInterests");
  sheetInterests.getRange(_offerId, _interestId, 1,1).clear();
}

function checkForMatch(_tradeOffer){
  //when a trade gets uploaded or updated it should check for a match
  if(_tradeOffer.stillAvailable() == false){
    return;
  }
  for(var i = 0; i < _tradeOffer.interestedOffers.length; i++){
    var _row = getRowByOfferId(_tradeOffer.interestedOffers[i]);
    if(_row != 0){
      var _offerToCheck = new TradeOffer(_row);
      for(var j = 0; j < _offerToCheck.interestedOffers.length; j++){
        if(_tradeOffer.stillAvailable() && _offerToCheck.interestedOffers[j] == _tradeOffer.offerId && _offerToCheck.stillAvailable() ){
          //We got a match!!!
          //Update boths available slot with each others offerId

          //And then they swap the character data -> this way each is responsible for the deletion of the data themselves
          var keep = _tradeOffer.heroId;
          _tradeOffer.heroId = _offerToCheck.heroId;
          _offerToCheck.heroId = keep;

          //keep = _tradeOffer.uniqueId; //unique Id stays of the old hero so the correct one gets removed from the inventory
          //_tradeOffer.uniqueId = _offerToCheck.uniqueId;
          //_offerToCheck.uniqueId = keep;

          keep = _tradeOffer.playerId;
          _tradeOffer.lastOwner = _offerToCheck.playerId;
          _offerToCheck.lastOwner = keep;

          keep = _tradeOffer.origOwner;
          _tradeOffer.origOwner = _offerToCheck.origOwner;
          _offerToCheck.origOwner = keep;

          keep = _tradeOffer.traded;
          _tradeOffer.traded = _offerToCheck.traded;
          _offerToCheck.traded = keep;

          keep = _tradeOffer.runs;
          _tradeOffer.runs = _offerToCheck.runs;
          _offerToCheck.runs = keep;

          _tradeOffer.available = _offerToCheck.playerId;
          _offerToCheck.available = _tradeOffer.playerId;

          //reapply them
          applyTradeOffer(getRowByOfferId(_tradeOffer.offerId), _tradeOffer);
          applyTradeOffer(getRowByOfferId(_offerToCheck.offerId), _offerToCheck);
          shelveClosedTrade(_tradeOffer, _offerToCheck);
        }
      }
    }
  }
}

function shelveClosedTrade(_offerOne, _offerTwo){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CompletedTradeOffers");
  //Date
  //HeroIds
  //Rarity
  //PlayerIds
  var fruits =
    [new Date, 
    _offerOne.playerId,
    _offerOne.heroId, 
    'r',
    _offerTwo.playerId,
    _offerTwo.heroId, 
    'r',];
  sheet.appendRow(fruits);
}

//ToDo: probably can simplify since offerId is parallel to row
function getRowByOfferId(_offerId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");  
  var result = 0;
  var _coloumRange = sheet.getRange(1, 2, sheet.getMaxRows()).getValues();
  for (var i = 0; i < _coloumRange.length; i++){
    if(_coloumRange[i][0] == _offerId){
      return i + 1;
    }
  }
  return 0; //basically an error
}

function getOfferIdByPlayerIdAndUniqueId(_playerId, _uniqueId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
  var offerRange = sheet.getRange(2,1,sheet.getLastRow()-1,6).getValues();
  for(var i = 0; i < offerRange.length; i++) {
    if(!offerRange[i][1] == ""){
      if(offerRange[i][3] == _playerId && offerRange[i][5] == _uniqueId){
        return offerRange[i][1];
      }
    }
  }
  return -1; //Basically an error or not found
}

function deleteOffers(){
  if(incomingObj == undefined){
    incomingObj = "";
  }
  var deleteData = incomingObj.offersToDelete;
  for(var i = 0; i < deleteData.length; i++){
    deleteOffer(deleteData[i].offerId);
  }
  requestMarker = requestTypes.deleteOffers;
  returnPackage = new TextMessage("Deleted Data Successfully");
}

//Maybe rather use playerId + uniqueId as input
function deleteOffer(_offerId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
  var _row = getRowByOfferId(_offerId);
  if(_row > 0){
    sheet.getRange(_row, 1, 1, sheet.getMaxColumns()).clear();
  }
  removeAllInterestedTrade(_offerId);
}

function testFuncLol(){

  var etstetvar = getOfferIdByPlayerIdAndUniqueId("bryan", 3);
  var offer = new TradeOffer(getRowByOfferId(8));
  //checkForMatch(offer);
  Logger.log("time");
  deleteOffer(3);
  Logger.log("time");
}

function uploadOffer(){
  if(incomingObj == undefined){
    incomingObj = {playerInfo:{playerId:"Mark",password:"pw"},heroes:[{heroId:"Axel",status:0,uniqueId:2563,pVal:500,pPot:500,mVal:365,mPot:500,sVal:385,sPot:500,lastOwner:"Mark",origOwner:"Mark",invIndex:9,traded:0,runs:32},{heroId:"Axel",status:0,uniqueId:9690,pVal:500,pPot:500,mVal:428,mPot:500,sVal:410,sPot:500,lastOwner:"Mark",origOwner:"Mark",invIndex:15,traded:0,runs:35}],date:"2021-12-01 10:31:29Z"};
  }
  var playerId = "Error";
  var uploadedData = ""
  if(incomingObj != undefined){
    playerId = incomingObj.playerInfo.playerId;
    
  }
  var uploadedHeroData = incomingObj.heroes;
  var date = incomingObj.playerInfo.date;
  for(var i = 0; i < uploadedHeroData.length; i++){
    createOfferFromPlayerHeroData(playerId, uploadedHeroData[i], date);
  }

  //updateTradeStartDate in player sheet
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +playerId);
  sheet.getRange(2,12).setValue(date);
  for(var i = 0; i < uploadedHeroData.length; i++){
    var heroRow = getRowOfHero(playerId, uploadedHeroData[i].uniqueId);
    if(heroRow != undefined)
        sheet.getRange(heroRow, 3, 1, 1).setValue(1);
  }
  requestMarker = requestTypes.uploadOffer;
  returnPackage = new TextMessage("Pushed DataSuccessfully");
}

function createOfferFromPlayerHeroData(_playerId, _playerHero, _date){
//ToDo
  var theThingy; // needs to be structured like an TradeOffer
  theThingy = new TradeOffer();
  theThingy.available = "";
  theThingy.date = _date;
  theThingy.heroId = _playerHero.heroId
  theThingy.interestedOffers = [];
  theThingy.lastOwner = _playerHero.lastOwner;
  theThingy.offerId = getFreeOfferId();
  theThingy.origOwner = _playerHero.origOwner;
  theThingy.playerId = _playerId;
  theThingy.runs = _playerHero.runs;
  theThingy.traded = _playerHero.traded;
  theThingy.uniqueId = _playerHero.uniqueId;

  //Delete all concerning interests for tradeId
  removeAllInterestedTrade(theThingy.offerId);
  removeAllInterestsFromTrade(theThingy.offerId);

  applyTradeOffer(theThingy.offerId + 1, theThingy);
}

function getFreeOfferId(){
  var iterator = 1;
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
  var retry = true;
  while(retry){
    var result = sheet.getRange(2, 2, sheet.getLastRow()).getValues();
    var allIds = [].concat.apply([], result).filter(numbersOnly);
    var valueFree = false;
    while(!valueFree){
      valueFree = true;
      for(var i = 0; i < allIds.length; i++){
        if(iterator == allIds[i]){
          iterator++;
          valueFree = false;
          break;
        }
      }
    }
    //try to use up the space
    if(sheet.getRange(iterator+1,2, 1,1).isBlank()){
      sheet.getRange(iterator+1,2, 1,1).setValue(iterator);
      SpreadsheetApp.flush();
      retry = false;
    }
  }  
  return iterator;
}

function getFreeRow(){
  var iterator = 1;
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
  var result = sheet.getRange(2, 2, sheet.getLastRow()).getValues();
  var allIds = [].concat.apply([], result);
  for(var i = 1; i <= allIds.length; i++){
    if (typeof (allIds[i - 1]) != 'number') {
      return i + 1;
    }
  }
  return allIds.length + 2;
}

function updateOffer(){
  //find out offer ids by unique hero ids and player ids and then searching through offers lol
  if(incomingObj == undefined){
    incomingObj = {offerIdMode: true,playerInfo:{playerId:"Mark",password:"pw", date:"2021-12-13 09:13:24Z"},interestingId:8,uniqueIds:[7,9,6]};
  }
  var playerId = "Error";
  if(incomingObj != undefined){
    playerId = incomingObj.playerInfo.playerId;
    date = incomingObj.playerInfo.date;
  }
  var updateData = incomingObj.uniqueIds;
  var idToUpdate = incomingObj.interestingId;
  if(incomingObj.offerIdMode == true){
    for (var i = 0; i < updateData.length; i++){
      addInterest(idToUpdate, updateData[i]); //workaround for testing
    }
  }
  else{
    for (var i = 0; i < updateData.length; i++){
      addInterest(idToUpdate, getOfferIdByPlayerIdAndUniqueId(playerId, updateData[i]));
    }
  }
  checkForMatch(new TradeOffer(getRowByOfferId(idToUpdate)));

  //updateTradeStartDate in player sheet
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User" +playerId);
  sheet.getRange(2,12).setValue(date);

  requestMarker = requestTypes.updateOffer;
  returnPackage = new TextMessage("Pushed DataSuccessfully");
}

function addInterest(_offerId, _interestedId){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetInterests = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOfferInterests");
  sheetInterests.getRange(_offerId, _interestedId).setValue(_interestedId);
}

function clearOldTrades(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
  var tempTradeList = [];
  var result = sheet.getRange(2, 2, sheet.getLastRow()).getValues();
  var allIds = [].concat.apply([], result).filter(numbersOnly);
  for(var i = 0; i < allIds.length; i++) {
    tempTradeList.push(new TradeOffer(getRowByOfferId(allIds[i])));    
  }
  var weekTimeMillis = 1000 * 60 * 60 * 24 * 7;

  for(var i = 0; i < tempTradeList.length; i++) {
    var oldDate = new Date(tempTradeList[i].date);
    var currentDate = new Date();
    if(currentDate.getTime() - weekTimeMillis >= oldDate.getTime() && tempTradeList[i].available == ""){
      Logger.log("Delete offer");
      var playerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User"+tempTradeList[i].playerId);
      //get
      var inventory = createInventory(tempTradeList[i].playerId);
      for(var j = 0; j < inventory.length; j++){
        if(inventory[j].uniqueId == tempTradeList[i].uniqueId){
          playerSheet.getRange( 11 + j, 3, 1, 1).setValue(0);
          //delete offer
          deleteOffer(tempTradeList[i].offerId);
          break;
        }
      }
      tempTradeList[i].uniqueId
    }
    else{
      Logger.log("Keep offer");
      Logger.log(tempTradeList[i].playerId);
    }
  }
}

function pullTradeOffers(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
  var tempTradeList = [];
  var result = sheet.getRange(2, 2, sheet.getLastRow()).getValues();
  var allIds = [].concat.apply([], result).filter(numbersOnly);
  for(var i = 0; i < allIds.length; i++) {
    tempTradeList.push(new TradeOffer(getRowByOfferId(allIds[i])));    
  }
  Logger.log(sheet.getLastRow());
  
  var tradeOffers = { tradeOffers:tempTradeList};
  returnPackage = tradeOffers;
  requestMarker = requestTypes.pullTradeOffers;
  Logger.log(JSON.stringify(returnPackage));
  Logger.log(JSON.stringify(requestMarker));
}