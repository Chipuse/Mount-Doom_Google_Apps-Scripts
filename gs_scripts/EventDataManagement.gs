function deckPerfformanceTest(){
  var blub = new Event("deckforest", 1);
}

class DungeonQuest{
  constructor(_deckName, _index){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_deckName);
    var dungeonQuestRange = sheet.getRange(2+_index, 1,1,6).getValues();
    this.eventName = dungeonQuestRange[0][0];
    this.dungeonType = dungeonQuestRange[0][1];
    this.startText = dungeonQuestRange[0][2];
    this.endText = dungeonQuestRange[0][3];
    this.shortEndText = dungeonQuestRange[0][4];
    this.description = dungeonQuestRange[0][5];
  }
}

class Event{
  constructor(_deckName, _index){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_deckName);
    var eventRange = sheet.getRange(2+_index, 1,1,4).getValues();

    this.eventName = eventRange[0][0];
    this.statType = eventRange[0][1];
    this.startText = eventRange[0][2];
    this.endText = eventRange[0][3];
  }
}

class EventDeck{
  constructor(_deckName){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_deckName);
    var _eventDeck = [];
    var iterator = 0;
    while(sheet.getRange(2+iterator,1).isBlank() != true){
      _eventDeck.push(new Event(_deckName,iterator));
      iterator ++;
    }
    this.deckName = _deckName;
    this.deck = _eventDeck;
  }
}

function testSteps(){
  var blub = new EventSteps();
}

class EventSteps{
  constructor(){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var globalInfoSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GlobalInfo");
    var information = globalInfoSheet.getRange(6,2,8).getValues();
    this.questStart = information[0][0];
    this.questEnd = information[1][0];
    this.pathHandling = information[2][0];
    this.pathChoosing = information[3][0];
    this.eventTurn = information[4][0];
    this.eventStart = information[5][0];
    this.eventEnd = information[6][0];

    this.fallBack = information[7][0];

  }
}

class EventData{
  constructor(){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var labelSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("eventLabels");
    //NodeTypes
    var _nodeTypes = [];
    var iterator = 0;
    while(labelSheet.getRange(2+iterator,2).isBlank() != true){
      _nodeTypes.push(labelSheet.getRange(2+iterator,2).getValue());
      iterator ++;
    }
    var _eventDecks = [];
    for(var i = 0; i < _nodeTypes.length; i++){
      var deckSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("deck" +_nodeTypes[i]);
      if (deckSheet == null){
        deckSheet = ss.insertSheet("deck" +_nodeTypes[i]);
      }
      _eventDecks.push(new EventDeck("deck"+_nodeTypes[i]));
    }
    this.nodeTypes = _nodeTypes;
    this.eventDecks = _eventDecks;

    var _basicQuestDeck = [];
    var _doomQuestDeck = [];
    var dungeonSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("deck" + "dungeon");
    iterator = 0;

    var dungeonRange = dungeonSheet.getRange(2,1,dungeonSheet.getLastRow() - 1,1).getValues();
    for(var i = 0; i < dungeonRange.length; i++){
      if(dungeonRange[i][0] != ""){
        var quest = new DungeonQuest("deckdungeon", i);
        if(quest.dungeonType == "basic"){
          _basicQuestDeck.push(quest);
        }
        else{
          _doomQuestDeck.push(quest);
        }
      }
    }
    this.basicQuestDeck = _basicQuestDeck;
    this.doomQuestDeck = _doomQuestDeck;
    //PathTypes
    var _pathTypes = [];
    iterator = 0;
    while(labelSheet.getRange(2+iterator,3).isBlank() != true){
      _pathTypes.push(labelSheet.getRange(2+iterator,3).getValue());
      iterator ++;
    }
    this.pathTypes = _pathTypes;

    this.textFlavours = new TextFlavours();

    this.eventSteps = new EventSteps();
  }
}

function downloadEventData(){
  var eventData = new EventData;
  Logger.log(JSON.stringify(eventData));
  returnPackage = eventData;
  requestMarker = requestTypes.downloadEventData;
  Logger.log(JSON.stringify(returnPackage));
  Logger.log(JSON.stringify(requestMarker));
}

function dungeonDataTest(){
  var eventData = new EventData();
  Logger.log(eventData);
}