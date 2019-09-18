document.writeln();

var dan = prompt("원하는 단 입력");

while(dan  <= 0 || dan >= 10) {
	alert("1 단에서 9단 사이로 입력");
	dan = prompt("원하는 단 입력");
}

document.writeln(dan + "단" + "<br/>");

for(var j = 1; j < 10; j++) {
	document.writeln(dan + " * " + j + " = " + (dan * j));
	document.writeln("<br/>");
}

document.writeln("<br/>")