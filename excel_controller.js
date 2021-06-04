const xlsx = require( "xlsx" );

module.exports = function(fileName) {
  try{
    const excelFile = xlsx.readFile(fileName);
    const sheetName = excelFile.SheetNames[0];
    const firstSheet = excelFile.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : '' } );

    //data filtering
    var filteredData = []
    for(let i =0; i<jsonData.length; i++){
      if(jsonData[i]['실적일'] === ''){
        continue;
      }
      let tmp = {}
      for(let key in jsonData[i]){
        switch(key){
          case '실적일':
            tmp['date'] = jsonData[i][key];
            break;
          case '총 공수':
            tmp['hour'] = parseFloat(jsonData[i][key]);
            break;
          default:
        }
      }
      filteredData.push(tmp);
    }

     //order by
    filteredData.sort((x, y) => {
      return x.date < y.date ? -1 : x.date > y.date ? 1 : 0
    });

    //grouping
    var groupingData = []
    filteredData.reduce(function(res, value) {
      if (!res[value.date]) {
        res[value.date] = { 
          date: value.date,
          hour: 0
        };
        groupingData.push(res[value.date]);
      }
      res[value.date].hour = parseFloat((res[value.date].hour + value.hour).toFixed(1));
      return res;
    }, {});


    console.log(groupingData);
  }
  catch(exception){
    console.log(exception);
  }
}