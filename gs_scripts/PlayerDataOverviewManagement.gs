function updateOverview() {  
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var overviewSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PlayerDataOverview");
  if(overviewSheet.getLastColumn() >= 1 && overviewSheet.getLastRow() >= 1){
    overviewSheet.getRange(1,1,overviewSheet.getLastRow(), overviewSheet.getLastColumn()).clear();  
  }
  var sheets = ss.getSheets();

  var dataCategories = getDataCategories();
  
  overviewSheet.getRange(1,1,1,dataCategories[0].length).setValues(dataCategories);

  var iterator = 1;
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("User",0)){
      if(iterator == 1){
        
        iterator++;
      }
      var dataRange = sheets[i].getRange(2,1,1,dataCategories[0].length).getValues();
      overviewSheet.getRange(iterator,1,1,dataCategories[0].length).setValues(dataRange);
      iterator++;
    }
  }
}

function getDataCategories(){
  var result = [];
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var i = 0; i < sheets.length; i++){
    if(sheets[i].getSheetName().startsWith("UserMaphi",0)){
      var username = sheets[i].getSheetName();
      var dataRange = sheets[i].getRange(1,1,2,sheets[i].getLastColumn()).getValues();
      var categories = [];
      for(var j = 0; j < dataRange[0].length; j++){
        if(dataRange[0][j] != "" || dataRange[1][j] != ""){
          categories.push(dataRange[0][j]);
        }
        else{
          break;
        }
      }
      result.push(categories);
      break;
    }
  }
  return result;
}

function updateRarity(){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CompletedTradeOffers");
  var data = sheet.getRange(2,1,sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  for(var i = 0; i < data.length; i++){
    if(data[i][3] == 'r'){
      data[i][3] = getRarity(data[i][2]);
    }
    if(data[i][6] == 'r'){
      data[i][6] = getRarity(data[i][5]);
    }
  }
  sheet.getRange(2,1,sheet.getLastRow() - 1, sheet.getLastColumn()).setValues(data);
}

class PlotData{
  constructor(){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PlayerDataOverview");

    var _entries = [];
    var data = sheet.getRange(2,20,sheet.getLastRow() - 1, 8).getValues(); 
    for(var i = 0; i < data.length; i++){
      var ok = true;
      for(var j = 0; j < data[i].length; j++){
        if(data[i][j] == ""){
          ok = false;
        }
      }
      if(ok == true){
        _entries.push(new ValuePair("data"+i.toString(),data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7]))
      }
    }
    this.entries = _entries;
  }
}

class ValuePair{
  constructor(_name,_neu,_ext,_ope,_agr,_con,_soc,_ach,_att){
    ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PlayerDataOverview");
    this.name = _name;
    this.neuroticism = ((_neu / 10) - 1) / 4;
    this.extraversion = ((_ext / 10) - 1) / 4;
    this.openness = ((_ope / 10) - 1) / 4;
    this.agreeableness = ((_agr / 10) - 1) / 4;
    this.conscientiousness = ((_con / 10) - 1) / 4;
    this.social = ((_soc / 10) - 1) / 4;
    this.achievement = ((_ach / 9) - 1) / 4;
    this.attachment = ((_att / 7) - 1) / 4;
  }
}

function getPlotData(){
  var plpotData = new PlotData();
  returnPackage = plpotData;
  requestMarker = requestTypes.getPlotData;
  Logger.log(JSON.stringify(returnPackage));
  Logger.log(JSON.stringify(requestMarker));
}
