//create starttime and needtime array
StartTimeValue = new Array();
NeedTimeValue = new Array();
OldStartTimeValue = new Array();
OldNeedTimeValue = new Array();
StartNameArray = new Array();
NeedNameArray = new Array();


 

//returns a collection of all elements in the document with the specified tag name, as a NodeList object.
//The NodeList object represents a collection of nodes. The nodes can be accessed by index numbers. The index starts at 0.
var labels = document.getElementsByTagName("label");
var inputs = document.getElementsByTagName("input");
var divs = document.getElementsByTagName('div');

//creates an Element Node with the specified name for 'run' button
var input3 = document.createElement("input");

//boolean return false
flag = 0;

left = 14;

//set boolean return value
first = 1;
second = 2;

//create temp array
Temp = new Array();

//boolean return false
StaticTemp = 0;

up = 415;

//simulation default speed
QuantumTime=10;

//RR default quantum
var RRCounter = 2;

//boolean return true
SJFflag = 1;

div3left = 14;
div2width = 0;

q = 0;

//boolean return true
Time = 1;
//boolean return false - set runFlag for algorithm false
runFlag = 0;
//Round robin boolean return false
RRf = 0;

//erase gantt chart
function deletePreNemudar()
{
	
	//boolean return true
	SJFflag = 1;
	RRflag = 1;
	SRTNflag = 1;
	sumNTV = 0;
	flag = 0;
	left = 14;
	first = 1;
	second = 2;
	Temp.length = 0;
	StaticTemp = 0;
	div2width = 0;
	div3left = 14;
	q = 0;
	Time = 1;

	//set array length to zero
	StartTimeValue.length = 0;
	NeedTimeValue.length = 0;
	StartNameArray.length = 0;
	NeedNameArray.length = 0;
	RQIdx = 0;

//erase gantt chart div
	if(divs.length != 0)
	{
		for(t=divs.length-1;t != -1;t--)
			document.body.removeChild(divs[t]);
	}
}

//received quantum value 
function sendRRCounter(RRC){
	RRCounter = Number(RRC);
	//set round robin flag = 1 (default = 0)
	RRf = 1;
	//invoke sendTypeOfAlgorithm function send RR
	sendTypeOfAlgorithm("RR");	
	//document.getElementById("demo").removeChild(label4);
	//document.getElementById("demo").removeChild(input4);	
	//remove quantum textbox
	document.body.removeChild(label4);
	document.body.removeChild(input4);
}

//invoke by algorithm selection, create RR quantum button , invoke algoruthm function
function sendTypeOfAlgorithm(t)
{
	type = t;
	
	//if runFlag = 1 (default = 0)
	if(runFlag)
	{
		deletePreNemudar();
		
		for(i in OldStartTimeValue)
		{
			StartTimeValue[i] = OldStartTimeValue[i];
			NeedTimeValue[i] = OldNeedTimeValue[i];
			StartNameArray[2*i] = OldStartTimeValue[i];
			StartNameArray[2*i+1] = "s"+i;
			NeedNameArray[2*i] = OldNeedTimeValue[i];
			NeedNameArray[2*i+1] = "n"+i;
		}
	
		//if round robin algorithm selected
		if(t == "RR")
		{
				 //create quantum textbox for RR
				label4 = document.createElement('label');
				label4.setAttribute("name","RRC");
				label4.innerHTML = "<br> Quantum:";
				document.body.appendChild(label4);
				//document.getElementById("demo").appendChild(label4);
				input4 = document.createElement('input');
				input4.setAttribute("type","number");
				input4.setAttribute("size","3");
				input4.setAttribute("min","1");
				input4.setAttribute("max","10");
				input4.setAttribute("name","RRC");
				//set quantum default value
				input4.setAttribute("value",RRCounter);
				//document.getElementById("demo").appendChild(input4);
				document.body.appendChild(input4);
				//invoke sendRRCounter function send quantum value,event occurs when an object loses focus.
				input4.addEventListener("blur",function(){sendRRCounter(this.value);},false);
				//RR flan set to true = 1 (default = 0)
				RRf = 1;
		} else {
				
				RRCInput = document.getElementsByName("RRC");
				//if Round robin flag = 1 , true (default = 0)
				if(RRf)
				{
					//Remove round robin quantum textbox 2nd  child node (index 1)
					document.body.removeChild(RRCInput[1]);
					//Remove round robin quantum textbox first child node (index 0)
					document.body.removeChild(RRCInput[0]);
					// RR flan set to false = 0 (default = 0)
					RRf = 0;
				}
		}
		
		switch(type){
			case "FCFS":
				func = FCFS;
				runFlag = 1;
				break;		
			case "SJF":
				func = SJF;
				runFlag = 1;
				break;
			case "LCFS":
				func = LCFS;
				runFlag = 1;
				break;
			case "RR":
				func = RR;
				runFlag = 1;
				break;
			case "SRTN":
				func = SRTN;
				runFlag = 1;
				break;
		}
			//add run button lister when click, invoke func type algorithm
			input3.addEventListener("click",func,false);
	}
}

//create textbook for starttime, needtime quantum and activate runFlag for type of algorithm choosen
//when ok button clicked, received parameter number of process, type of algorithm, and simulation speed
function createTextboxes(NOP,TypeOfAlgorithm,QT)
{
	
	deletePreNemudar();
	//remove label tag and input tag by its index number (run button)
	if(labels[3] && inputs[3])
	{
		for(t=labels.length-1;t != 2;t--)
			document.body.removeChild(labels[t]);
		for(t=inputs.length-1;t != 2;t--)
			document.body.removeChild(inputs[t]);
	}
	
	//assign simulation speed to QuantumTime (default = 10)
	QuantumTime = QT;
	//create html element label
	label1 = document.createElement("label");
	//document.getElementById("demo").appendChild(label1);
	label1.innerHTML = "Enter process value for: ";
	document.body.appendChild(label1);
	label2 = document.createElement("label");
	//document.getElementById("demo").appendChild(label2);
	label2.innerHTML = "<br>Start Time: "; 
	document.body.appendChild(label2);

	//create textbook for starttime by number of process
	for(var i=0;i<NOP;i++)
	{
		var input1 = document.createElement("input");
		
		// adds the specified attribute to an element, and gives it the specified value.
		input1.setAttribute("type","text");
		//if OldStartTimeValue old value exist, set same value for starttime textbox
		if(OldStartTimeValue[i])
			input1.setAttribute("value",OldStartTimeValue[i])
		else
			input1.setAttribute("value",0);
		
		input1.setAttribute("size","2");
		input1.setAttribute("placeholder","p"+i);
		input1.setAttribute("name",i);
		input1.setAttribute("id","s"+i);
		//document.getElementById("demo").appendChild(input1);
		document.body.appendChild(input1);
		//event occurs when the value of an element has been changed invoke sendStartTime function send
		//input1 value, id , name
		input1.addEventListener("change",function(){sendStartTime(this.value,this.id,this.name);},false);
		
		//change the id, name, value of an HTML attribute
		id = document.getElementById("s"+i).id;
		name = document.getElementById("s"+i).name;
		value = document.getElementById("s"+i).value;
		name=Number(name);
		//assign value to StartTimeValue array
		StartTimeValue[name] = Number(value);
		//add new value follow by id ("s" + i) at the end of StartNameArray array 
		StartNameArray.push(value);
		StartNameArray.push(id);
		
	}


	label3 = document.createElement("label");
	//document.getElementById("demo").appendChild(label3);
	label3.innerHTML = "<br>Need time:  ";
	document.body.appendChild(label3);

	//create textbook for needtime
	for(var i=0;i<NOP;i++)
	{
		//set random value for needtime textbox 
		var randomValue = Math.round(Math.random()*9)+1;
		var input2 = document.createElement("input");
		// adds the specified attribute to an element, and gives it the specified value.
		input2.setAttribute("type","text");
		// adds the specified attribute to an element, and gives it the specified value.
		if(OldNeedTimeValue[i])
			input2.setAttribute("value",OldNeedTimeValue[i])
		else
			input2.setAttribute("value",randomValue);
			
		input2.setAttribute("size","2");
		input2.setAttribute("placeholder","p"+i);
		//name = i, id = ni 
		input2.setAttribute("name",i);
		input2.setAttribute("id","n"+i);
		//document.getElementById("demo").appendChild(input2);
		document.body.appendChild(input2);
		//if needtime textbox change value, reset the value
		input2.addEventListener("change",function(){sendNeedTime(this.value,this.id,this.name);},false);
			
		//change the value of an HTML attribute id ("n" + i)
		id = document.getElementById("n"+i).id;
		name = document.getElementById("n"+i).name;
		value = document.getElementById("n"+i).value;
		name=Number(name);
		//assign value to NeedTimeValue array
		NeedTimeValue[name] = Number(value);
		//add new value follow by id ("n" + i) at the end of NeedNameArray array 
		NeedNameArray.push(value);
		NeedNameArray.push(id);
		
		
	}
	 
	//create quantum textbox for RR 
	if(TypeOfAlgorithm == "RR")
	{
		label4 = document.createElement('label');
		label4.setAttribute("name","RRC");
		//document.getElementById("demo").appendChild(label4);
		label4.innerHTML = "<br>Quantum:";
		document.body.appendChild(label4);
		input4 = document.createElement('input');
		input4.setAttribute("type","number");
		input4.setAttribute("size","3");
		input4.setAttribute("min","1");
		input4.setAttribute("max","10");
		input4.setAttribute("name","RRC");
		//set quantum default value
		input4.setAttribute("value",RRCounter);
		//document.getElementById("demo").appendChild(input4);
		document.body.appendChild(input4);
		//invoke sendRRCounter function send quantum value,event occurs when an object loses focus.
		input4.addEventListener("blur",function(){sendRRCounter(this.value);},false);
		//set boolean return true
		RRf = 1;
	}
	
	// adds the specified attribute to an element, and gives it the specified value - Run button
	input3.setAttribute("type","button");
	input3.setAttribute("value","Run");
	//document.getElementById("demo").appendChild(input3);
	document.body.appendChild(input3);

	//set type of algorithm choosen to function name as 'func'
	switch(TypeOfAlgorithm){
		case "FCFS":
			func = FCFS;
			runFlag = 1;
			break;		
		case "SJF":
			func = SJF;
			runFlag = 1;
			break;
		case "LCFS":
			func = LCFS;
			runFlag = 1;
			break;
		case "RR":
			func = RR;
			runFlag = 1;
			break;
		case "SRTN":
			func = SRTN;
			runFlag = 1;
			break;
	}
		//add eventlisterner to run button
		input3.addEventListener("click",func,false);
		OldStartTimeValue.length = 0;
		for(i in StartTimeValue)
			OldStartTimeValue[i] = StartTimeValue[i];
		OldNeedTimeValue.length = 0;
		for(i in NeedTimeValue)
			OldNeedTimeValue[i] = NeedTimeValue[i];
}


function sendStartTime(value,id,name){
	StartTimeValue[name] = Number(value);
	OldStartTimeValue[name] = StartTimeValue[name];
	StartNameArray[2*name] = Number(value);
	//id is "s" + i
	StartNameArray[2*name+1] = id;
	sendTypeOfAlgorithm(type);

	//remove quantum textbox
	if(type == "RR")
	{
		//document.getElementById("demo").removeChild(label4);
		//document.getElementById("demo").removeChild(input4);
		document.body.removeChild(label4);
		document.body.removeChild(input4);
	}
}


function sendNeedTime(value,id,name)
{
	NeedTimeValue[name] = Number(value);
	OldNeedTimeValue[name] = NeedTimeValue[name];
	NeedNameArray[2*name] = Number(value);
	NeedNameArray[2*name+1] = id;
	sendTypeOfAlgorithm(type);
	
	//remove Quantum textbox
	if(type == "RR")
	{
		//document.getElementById("demo").removeChild(label4);
		//document.getElementById("demo").removeChild(input4);
		document.body.removeChild(label4);
		document.body.removeChild(input4);
	}
}

//build gantt chart
function nemudar(){
	
	//default q=0
	if(q==0){
		
		//create html element div
		number = document.createElement("div");
		//set div name 
		number.setAttribute("name","div2");
		number.style.position = "absolute";
		number.style.top = "512px";
		number.style.left = div3left-1.2+"px";
		number.style.fontSize = "13px";
		number.innerHTML = q;
		document.body.appendChild(number);
		div3 = document.createElement('div');
		div3.setAttribute("name","div2");
		div3.style.width = "1px";
		div3.style.height = "6px";
		div3.style.backgroundColor = "black"
		div3.style.position = "absolute";
		div3.style.top = "505px";
		div3.style.left = div3left+"px";
		document.body.appendChild(div3);
		div3left += 20;
		q++;
	}
	
	//div2width default = 0
	div2width += 20;
	div2 = document.createElement("div");
	div2.setAttribute("name","div2");
	div2.style.width += div2width+"px";
	div2.style.height = "2px";
	div2.style.backgroundColor = "black";
	div2.style.position = "absolute";
	div2.style.top = "505px";
	div2.style.left = "14px";
	document.body.appendChild(div2);

	div3 = document.createElement('div');
	div3.setAttribute("name","div2");
	div3.style.width = "1px";
	div3.style.height = "6px";
	div3.style.backgroundColor = "black"
	div3.style.position = "absolute";
	div3.style.top = "505px";
	div3.style.left = div3left+"px";
	document.body.appendChild(div3);
	number = document.createElement("div");
	number.setAttribute("name","div2");
	number.style.position = "absolute";
	number.style.top = "512px";
	
	if(q>9)
	number.style.left = div3left-3.2+"px";
	else
	number.style.left = div3left-1.2+"px";
	
	number.style.fontSize = "13px";
	number.innerHTML = q;
	document.body.appendChild(number);
	div3left += 20;
	q++;
	//if IdleFlag =1 , true
	if(IdleFlag)
	{
		IdleFlag = 0;
		SelectAlgorithm();
	}
}


function show(a,NTV,Name,t)
{
	 
	
	//assign algorithm type
	type = t;
	//Return a random number between 0 (inclusive) and 1 (exclusive) 
	//and round nearest integer
	red = Math.round(Math.random()*255);
	green = Math.round(Math.random()*255);
	blue = Math.round(Math.random()*255);
	// set rgb color
	color = 'rgb('+red+','+green+','+blue+')';
	
	//default second = 2, true, make a new Temp array
	if(second == 2)
	{
		//assign Name to Temp[0] new array , StaticTemp default = 0
		Temp[StaticTemp] = Name;
		//assign color to Temp[1];
		Temp[StaticTemp+1] = color;
		//default value for StaticTemp = 0 , add 2 
		StaticTemp += 2;
		//add second +1 , default = 2
		second++;
	}
	else		
	
		for(i in Temp)
		{
			if(Temp[Number(i)] == Name)
				color = Temp[Temp.indexOf(Name)+1];
			else if(Number(i) < StaticTemp-1)
				continue;
			else
			{
				//assign Temp[2] = Name
				Temp[StaticTemp] = Name;
				//assign Temp[3] = color
				Temp[StaticTemp+1] = color;
				//add StaticTemp 2 , previous value was 2 now -> 4
				StaticTemp += 2;
			}
	
		}
	
	//if needtimevalue = 1
	if(NTV == 1)
		fSize = 20;
	else
		fSize = 40;
	
	if(Name > 9 && NTV == 1)
		fSize = 12;
	else if(Name > 9 && NTV == 2)
		fSize = 25;
	
	//if first = 1, true. default is 1
	if(first == 1)
	{
		//set left margin for gantt chart 1st Div box
		left += a*20;
		//first add 1, now first->2
		first++;
		flag += (a+NTV)*20;
	}else{
		
		if(flag <= a*20)
		{
			left = a * 20+14;
			flag =(a+NTV)*20
		}else{
			left = flag+14;
			flag += NTV*20;
		}
	}
	
	if(NTV == 1)
		r = setTimeout("end()",QuantumTime);
	else
		end();
	
	
}

 
function end(){
	nemudar();
	div = document.createElement("div");
	div.setAttribute('name','div');
	div.style.backgroundColor = color;
	div.style.position = "absolute";
	div.style.left = left+"px";
	div.style.top = up+"px";
	div.style.width = Time*20+"px";
	div.style.height = "90px";
	div.style.fontSize = fSize+"px";
	div.style.color = "white";
	div.innerHTML = '<center>P'+Name+'</center>';
	document.body.appendChild(div);
	 
	//output average turnaround time
		
		
	 
	//Time default = 1
	if(Time < NTV || Time == 1 && NTV != 1)
	{
		Time++;
		//end function invoke after quantumTime
		r = setTimeout("end()",QuantumTime);
		
		 
	}else{
		
		Time=1;
		//clears a timer set with the setTimeout() method.
		clearTimeout(r);
		
		SelectAlgorithm();
		
	}
	
	
	
}

//algotithm script file will invoke this function
function Idle()
{
	//nemudar() function invoke after quantumTime
	setTimeout("nemudar()",QuantumTime);
}

//invoke selected algorithm type again
function SelectAlgorithm()
{
	switch(type){
		case "FCFS":
			FCFS();
			break;
		case "LCFS":
			LCFS();
			break;
		case "SJF":
			SJF();
			break
		case "RR":
			RR();
			break;
		case "SRTN":
			SRTN();
			break;
	}
}