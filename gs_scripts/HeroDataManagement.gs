class Hero {
  constructor(heroid, description, race, job, rarity, texture, pdef, pmin, pdefpot, pmaxpot, mdef,mmin,mdefpot,mmaxpot, sdef, smin,sdefpot,smaxpot, nodebuff, nodedebuff, pathaff) {
    this.heroId = heroid;
    
    this.description = description;
    this.race = race;
    this.job = job;
    this.rarity = rarity;
    this.texture = texture;

    this.pDef = pdef;
    this.pMin = pmin;
    this.pDefPot = pdefpot;
    this.pMaxPot = pmaxpot;

    this.mDef = mdef;
    this.mMin = mmin;
    this.mDefPot = mdefpot;
    this.mMaxPot = mmaxpot;

    this.sDef = sdef;
    this.sMin = smin;
    this.sDefPot = sdefpot;
    this.sMaxPot = smaxpot;

    this.nodeBuff = nodebuff;
    this.nodeDebuff = nodedebuff;
    this.pathAff = pathaff;
  }
}

function downLoadHeroList() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeroLookUp");
  var heroList = [];
  var iterator = 2;
  var v = sheet.getRange(2,1, sheet.getLastRow() - 1, 21).getValues();
  for(var i = 0; i < v.length; i++){
    var testHero = new Hero(v[i][0],v[i][1],v[i][2],v[i][3],v[i][4],v[i][5],v[i][6],v[i][7],v[i][8],v[i][9],v[i][10],v[i][11],v[i][12],v[i][13],v[i][14],v[i][15],v[i][16],v[i][17],v[i][18],v[i][19],v[i][20]);
    heroList.push(testHero);
  }
  var defaultHeroList = { defaultHeroList:heroList};
  Logger.log(JSON.stringify(defaultHeroList));
  returnPackage = defaultHeroList;
  requestMarker = requestTypes.downloadHeroList;
  Logger.log(JSON.stringify(returnPackage));
  Logger.log(JSON.stringify(requestMarker));
}

