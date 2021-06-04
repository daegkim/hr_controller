//1. 해당 파일의 경로를 입력
const readline = require('readline');
const excel = require('./excel_controller');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
  excel(line);
  rl.close();
}).on('close', function() {
});
