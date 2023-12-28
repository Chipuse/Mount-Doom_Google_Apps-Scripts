const requestTypes = {
  error: 0,
  signUp : 1,
  signIn : 2,
  getPlayerData : 3,
  downloadHeroList : 4,
  downloadEventData : 5,
  pushPlayerData : 6,
  pushDungeonData : 7,
  downloadDungeonData : 8,
  pushInventory : 9,
  pushBlacklist : 10,
  pullRewardTable : 11,
  uploadOffer : 12,
  updateOffer : 13,
  pullTradeOffers : 14,
  deleteOffers : 15,
  pullGlobalData : 16,
  pushDexEntries : 17,
  getPlotData : 18
};
var incomingObj;
var returnPackage;
var requestMarker = 0;

var testjsonData = "{\"request\":\"4\",\"jsonData\":\"{\"playerId\":\"\",\"password\":\"\"}\"}";

function doGet(e)
{  
  setup();
  var result;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TestBlatt");
  var jsonData;


  var start = new Date();
  var end;
  var diff;
  sheet.getRange(10, 1).setValue(start);
  sheet.getRange(10, 2).setValue("Started command");
  sheet.getRange(11, 1, 1, 2).clear();
  if(e == undefined){
    jsonData = JSON.parse(JSON.stringify(testjsonData));
  }
  else{
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TestBlatt");
  
    sheet.getRange(1, 2).setValue("doGet was triggered" + JSON.stringify(e)); 
    sheet.getRange(1, 1).setValue(JSON.stringify(e));
    sheet.getRange(2, 1).setValue(e.parameter.data);
    var jsonDataAsText = e.parameter.data;
    sheet.getRange(3, 1).setValue(jsonDataAsText);
    jsonData = JSON.parse(jsonDataAsText);

  }
  sheet.getRange(4, 1).setValue(JSON.stringify(jsonData));
  sheet.getRange(5, 1).setValue(jsonData.jsonData);
  if(jsonData.jsonData == ""){

  }
  else{
    var textytext = jsonData.jsonData;
    incomingObj = JSON.parse(jsonData.jsonData);
    sheet.getRange(6, 1).setValue(JSON.stringify(incomingObj));
  }
  

  switch(jsonData.request){
    case requestTypes.signUp :
      sheet.getRange(2, 2).setValue("SignUp " + incomingObj.playerId.toString()+ " request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      signUp();
      break;
    case requestTypes.signIn :
      sheet.getRange(2, 2).setValue("SignIn " + incomingObj.playerId.toString()+ " request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      signIn();
      break;
    case requestTypes.getPlayerData :
      break;
    case requestTypes.downloadHeroList :
      sheet.getRange(2, 2).setValue("DownloadHero List request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      downLoadHeroList();
      break;
    case requestTypes.downloadEventData :
      sheet.getRange(2, 2).setValue("DownloadEventData request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      downloadEventData();
      break;
    case requestTypes.pushPlayerData :
      sheet.getRange(2, 2).setValue("PushPlayerData request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      pushPlayerData();
      break;
    case requestTypes.pushDungeonData :
      sheet.getRange(2, 2).setValue("PushDungeonData request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      pushDungeonData();
      break;
    case requestTypes.downloadDungeonData :
      sheet.getRange(2, 2).setValue("DownloadDungeonData request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      downloadDungeonData();
      break;
    case requestTypes.pushInventory :
      sheet.getRange(2, 2).setValue("PushInventory request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      pushInventory();
      break;
    case requestTypes.pushBlacklist :
      sheet.getRange(2, 2).setValue("Push Blacklist request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      //ToDO
      pushBlacklist();
      break;
    case requestTypes.pullRewardTable :
      sheet.getRange(2, 2).setValue("Pull RewardTable request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      pullRewardTable();
      break;
    case requestTypes.uploadOffer :
      sheet.getRange(2, 2).setValue("Upload Offer request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      //ToDO
      uploadOffer();
      break;
    case requestTypes.updateOffer :
      sheet.getRange(2, 2).setValue("Update Offer request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      //ToDO
      updateOffer();
      break;
    case requestTypes.pullTradeOffers :
      sheet.getRange(2, 2).setValue("Pull Trade Offers request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      //ToDO
      pullTradeOffers();
      break;
    case requestTypes.deleteOffers :
      sheet.getRange(2, 2).setValue("Delete Offers request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      //ToDO
      deleteOffers();
      break;
    case requestTypes.pullGlobalData :
      sheet.getRange(2, 2).setValue("Global Data Pull request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      //ToDO
      pullGlobalData();
      break;
    case requestTypes.pushDexEntries :
      sheet.getRange(2, 2).setValue("Push Dex Entries request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      pushDexEntries();
      break;
    case requestTypes.getPlotData :
      sheet.getRange(2, 2).setValue("getPlotData request");
      sheet.getRange(3, 2).setValue(jsonData.request);
      getPlotData();
      break;
    default:
      sheet.getRange(2, 2).setValue("no requestType identified");
      sheet.getRange(3, 2).setValue(jsonData.request);
      var values = [];
      for( var i = 1; i < 8; i++ )
      {
        values.push( sheet.getRange(1+i, 1).getValue() );
      }
      var result = {result:values};
      returnPackage = {result:values};
      var JsonValue = JSON.stringify(result);
      break;
  }
  
  var JsonValue = JSON.stringify(returnPackage);
  sheet.getRange(4, 2).setValue(requestMarker.toString());
  ss = SpreadsheetApp.getActiveSpreadsheet();
  if(JsonValue.length >= 50000){
    sheet.getRange(5, 2).setValue("return package to long to print to sheets");
  }
  else{
    sheet.getRange(5, 2).setValue(JsonValue);
  }
  end = new Date();
  sheet.getRange(11, 1).setValue(end);
  sheet.getRange(11, 2).setValue("Ended command");
  return ContentService.createTextOutput(requestMarker.toString() + JsonValue.toString()).setMimeType(ContentService.MimeType.JSON);

}

function doPost(e) {
  setup();
  Logger.log("I was called")
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 2).setValue("doPost was triggered and the link did not change hooray");
  if(typeof e !== 'undefined')
 
  sheet.getRange(1, 1).setValue(JSON.stringify(e));
  sheet.getRange(2, 1).setValue(JSON.stringify(e.parameter));
  sheet.getRange(3, 1).setValue(JSON.stringify(e.parameter.data));
  var jsonDataAsText = e.parameter.data;
  var jsonData = JSON.parse(jsonDataAsText);
  sheet.getRange(4, 1).setValue(JSON.stringify(jsonData));
  
  return ContentService.createTextOutput(JSON.stringify(e))
}

var ss;
function setup(){
  //fetch sheet, other function might do it their own way again
  ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1BR1vyocrodd8MByhAyuq_KJE9cgOBBlsq-2Th54hOX8/edit#gid=41000049');
  SpreadsheetApp.setActiveSpreadsheet(ss);
}