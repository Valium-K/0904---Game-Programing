var arrayInt  = new Array();

arrayInt.push(10);
arrayInt.push(522);
arrayInt.push(103);
arrayInt.push(12);

for(var i = 0; i < arrayInt.length; i++) document.writeln(i + "번 인덱스의 원소 값: " + arrayInt[i] + "<br/>");

document.writeln("<br/> arryaInt 배열의 원소 수: " + arrayInt.length);