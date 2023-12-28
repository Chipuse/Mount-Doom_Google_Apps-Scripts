class TextFlavours{
  constructor(){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TradeOffers");
    this.textsEnemyNames = getTextsEnemyNames();
    this.textsPathChoosing = getTextsPathChoosing();
    this.textsPathHandling = getTextsPathHandling();
    this.textsEnemyTurn = getTextsEnemyTurn();
    this.textsHeroTurn = getTextsHeroTurn();
  }
}

class TextEnemyName{
  constructor(_enemyName, _optionalNodeType){
      this.name = _enemyName;
      this.optionalNodeType = _optionalNodeType;
  }
}
function getTextsEnemyNames(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TextsEnemyTable");
  var result = [];
  var entries = sheet.getRange(2,1,sheet.getLastRow()-1, 2).getValues();
  for(var i = 0; i < entries.length; i++){
    result.push(new TextEnemyName(entries[i][0], entries[i][1]));
  }
  return result;
}

class TextPathChoosing{
  constructor(_text, _optionalPathType){
      this.text = _text;
      this.optionalPathType = _optionalPathType;
  }
}
function getTextsPathChoosing(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TextsPathChoosingFlavour");
  var result = [];
  var entries = sheet.getRange(2,1,sheet.getLastRow()-1, 2).getValues();
  for(var i = 0; i < entries.length; i++){
    result.push(new TextPathChoosing(entries[i][0], entries[i][1]));
  }
  return result;
}

class TextPathHandling{
  constructor(_text, _optionalPathType){
      this.text = _text;
      this.optionalPathType = _optionalPathType;
  }
}
function getTextsPathHandling(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TextsPathHandlingFlavour");
  var result = [];
  var entries = sheet.getRange(2,1,sheet.getLastRow()-1, 2).getValues();
  for(var i = 0; i < entries.length; i++){
    result.push(new TextPathHandling(entries[i][0], entries[i][1]));
  }
  return result;
}

class TextEnemyTurn{
  constructor(_text, _optionalEventType, _optionalNodeType){
      this.text = _text;
      this.optionalNodeType = _optionalNodeType;
      this.optionalEventType = _optionalEventType;
  }
}
function getTextsEnemyTurn(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TextsEnemyTurnFlavour");
  var result = [];
  var entries = sheet.getRange(2,1,sheet.getLastRow()-1, 3).getValues();
  for(var i = 0; i < entries.length; i++){
    result.push(new TextEnemyTurn(entries[i][0], entries[i][1], entries[i][2]));
  }
  return result;
}

class TextHeroTurn{
  constructor(_text, _optionalEventType, _optionalNodeType){
      this.text = _text;
      this.optionalNodeType = _optionalNodeType;
      this.optionalEventType = _optionalEventType;
  }
}
function getTextsHeroTurn(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TextsEventHeroTurn");
  var result = [];
  var entries = sheet.getRange(2,1,sheet.getLastRow()-1, 3).getValues();
  for(var i = 0; i < entries.length; i++){
    if(entries[i][0] != ""){      
      result.push(new TextEnemyTurn(entries[i][0], entries[i][1], entries[i][2]));
    }
  }
  return result;
}