class RewardTier{
  constructor(_tier, _numRarities){
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RewardTable");
    var _chances = [];
    for(var i = 0; i < _numRarities; i++){
      _chances.push(sheet.getRange(3 + i, _tier).getValue());
    }
    this.chances = _chances;
  }
}

class DungeonDifficulty{
  constructor(_index){
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DungeonDifficulties");
    this.minLvl = sheet.getRange(_index, 1).getValue();
    this.maxLvl = sheet.getRange(_index, 2).getValue();
    this.medianLvl = sheet.getRange(_index, 3).getValue();
  }
}

class GlobalDungeonData{
  constructor(){
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RewardTable");

    var rewardTierData = [];
    var iterator = 2;
    while(sheet.getRange(3, iterator).isBlank() != true){
      var rewardTier = new RewardTier(iterator, 5);
      rewardTierData.push(rewardTier);
      iterator++;
    }
    this.rewardTiers = rewardTierData;

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DungeonDifficulties");
    var _dungeonDifficulties = [];
    iterator = 2;
    while(sheet.getRange(iterator, 1).isBlank() != true){
      var _dungeonDifficulty = new DungeonDifficulty(iterator);
      _dungeonDifficulties.push(_dungeonDifficulty);
      iterator++;
    }
    this.dungeonDifficulties = _dungeonDifficulties;

  }
}

function pullRewardTable() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RewardTable");
  var globalDungeonData = new GlobalDungeonData();
  returnPackage = globalDungeonData;
  requestMarker = requestTypes.pullRewardTable;
}
