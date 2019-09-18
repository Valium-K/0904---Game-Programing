var my_job = "학생";
			var moneyy = 0;
			
			switch(my_job) {
				case "사장": money = 100000; break;
				case "아르바이트생": money = 100000; break;
				case "학생": money = 100000; break;
				default: money = 10000; break;
			}
			
			document.writeln("");
			document.writeln("나의 현재 금액: " + money);