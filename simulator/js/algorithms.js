//create new array 
StartTimeValue = new Array();
NeedTimeValue = new Array();

//total turnaround time
sumA = 0;
//total waiting time 
sumW = 0;
count = 0;
 
 

//returns a collection of all elements in the document with the specified tag name, as a NodeList object.
//The NodeList object represents a collection of nodes. The nodes can be accessed by index numbers. The index starts at 0.
var labels = document.getElementsByTagName("label");
var inputs = document.getElementsByTagName("input");
var divs = document.getElementsByName('div');
 
//set flag to false
flag = 0;
left = 14;
first = 1;
second = 2;
up = 415;

//set quantum default value 
var RRCounter = 2;
//declare variable for number of process
var nop;
sumNTV = 0;
type = "";

//set SJF, SRTN flag to true
SJFflag = 1;
SRTNflag = 1;

//set idle flag to false
IdleFlag = 0;
//set round robin algorithm flag default = 1
RRflag = 1;
RQIdx = 0;

//FCFS algorithm
function FCFS()
{
	
	//sumNTV default = 0
	if(MinOfArray(StartTimeValue) > sumNTV)
	{
		type = "FCFS";
		sumNTV++;
		//set idleflag to true
		IdleFlag = 1;
		//invoke nemudar function build gantt chart
		Idle();
	}
	else
	{
		// it sends the values to the compare function, 
		//and sorts the values. Sort numbers in an array in ascending order
		StartTimeValue.sort(numberOrderS);
		
		if(StartTimeValue.length != 0)
		{
			 
			//Remove the first elemet (smallest value) of StartTimeValue array after accending sort
			//store the remove item in a
			a = Number(StartTimeValue.shift());
			//invoke searchID function to get array index number eg 0, 1.. matches to a value from StartNameArray and store in Name
			Name = searchID(a,StartNameArray);
			//assign index number to NeedTimeValue array to find its burst time matches with index number for a and store in NTV
			NTV = Number(NeedTimeValue[Name]);
			sumNTV += NTV;
			//calculate total turnaround time
			sumA = sumA + (sumNTV-a);
			show(a,NTV,Name,"FCFS");
			//calculate total waiting time
			sumW = sumW + ((sumNTV-NTV)-a);
			count++;
			 			 
		}
		
	}
	
	 
	if(count==input.value) {
		alert("Average Waiting Time: " + (sumW/input.value).toFixed(2)
		     + "\nAverage Turnaround Time: " + (sumA/input.value).toFixed(2));
		count = 0;
		sumA = 0;
		sumW = 0;
	}
	//Remove a "click" event for  run button that
	//has been attached with the addEventListener() method (FCFS):
	input3.removeEventListener("click",FCFS,false);
	
	
		  
}

//LAST COME FIRST SERVE ALGORITHM
function LCFS()
{
	//MaxOfArray function invoke pass StartTimeValue array and 
	//return largest value element in the array
	if(MaxOfArray(StartTimeValue) > sumNTV)
	{
		type = "LCFS";
		sumNTV++;
		//set idleflag to true
		IdleFlag = 1;
		//invoke idle function , idle function invoke nemudar function to build gantt chart
		Idle();
	} else {
		
		// it sends the values to the compare function, 
		//and sorts the values. Sort numbers in an array in descending order
		StartTimeValue.sort(numberOrderN);
		//Return the length of an array and compare array length is not zero element
		if(StartTimeValue.length != 0)
		{
			////Remove the first elemet (largest value) of an array and 
			//store the remove item in a
			a = Number(StartTimeValue.shift());
			//assign largest index number of StartNameArray array and store in NTV
			Name = searchID(a,StartNameArray);
			NTV = Number(NeedTimeValue[Name]);
			sumNTV += NTV;
			//calculate total turnaround time
			sumA = sumA + (sumNTV-a);
			//calculate total waiting time
			sumW = sumW + ((sumNTV-NTV)-a);
			show(a,NTV,Name,"LCFS");
			count++;
			
			 
		}
	}

	//Remove a "click" event for  run button that
	//has been attached with the addEventListener() method (LCFS):
	input3.removeEventListener("click",LCFS,false);
	if(count==input.value) {
		alert("Average Waiting Time: " + (sumW/input.value).toFixed(2)
		     + "\nAverage Turnaround Time: " + (sumA/input.value).toFixed(2));
		count = 0;
		sumA = 0;
		sumW = 0;
	}
}

//shortest-job first algorithm
function SJF()
{
	//SJF flag is true = 1
	if(SJFflag)
	{
		ReadyQ = new Array();
		//store StartTimeValue array length in STVLng
		STVLng = StartTimeValue.length;
		minStartArray = 0;
	}
	
	if(STVLng !=0)
	{
		SJFflag = 0;
			
		for(i in NeedTimeValue)
			// returns the position of the first occurrence of a specified value in a string. 
			//position start count from 0. This method returns -1 if the value to search for never occurs.
			if(StartTimeValue[i] <= minStartArray && ReadyQ.indexOf("i"+i) == -1)
			{
				//Add a new item at the end of an array ReadyQ
				ReadyQ.push(NeedTimeValue[i]);
				ReadyQ.push("i"+i);
			}
			
			if(ReadyQ.length == 0)
			{
				minStartArray++;
				//set IdleFlag to true
				IdleFlag = 1;
				//invoke idle function , idle function invoke nemudar function to build gantt chart
				Idle();
			}else{
				//store the smalles element ReadyQ array in NTV
				NTV = MinOfArray(ReadyQ);
				IDName = ReadyQ[ReadyQ.indexOf(NTV)+1];
				//adds/removes items to/from an array, and returns the removed item(s).
				//array.splice(index,howmany,item1,.....,itemX) - index position, howmany item remove (2)
				ReadyQ.splice(ReadyQ.indexOf(NTV),2);
				//replace i with "" 
				Name = Number(IDName.replace("i",""));
				a = StartTimeValue[Name];
				show(a,NTV,Name,"SJF");
				minStartArray += NTV;
				//calculate total turnaround time
				sumA = sumA + (minStartArray-a);
				//calculate total waiting time
				sumW = sumW + ((minStartArray-NTV)-a);
				STVLng--;
				//delete array element
				delete(StartTimeValue[Name]);
				delete(NeedTimeValue[Name]);
				count++;
			}
	}
	
	if(count==input.value) {
		alert("Average Waiting Time: " + (sumW/input.value).toFixed(2)
		     + "\nAverage Turnaround Time: " + (sumA/input.value).toFixed(2));
		count = 0;
		sumA = 0;
		sumW=0;
	}
	//Remove a "click" event for  run button that
	//has been attached with the addEventListener() method (LCFS):
	input3.removeEventListener("click",SJF,false);
}


//round robin algorithm
function RR()
{
	//if RRflag = 1 , true
	if(RRflag)
	{
		ReadyQ = new Array();
		minStartArray = 0;
		sumNTV = 0;
		//store StartTimeValue array length in STVLng
		STVLng = StartTimeValue.length;
	}
	
	//set RR flag = 0 , false
	RRflag = 0;
	
	if(STVLng != 0)
	{
		minSTV = findMin(StartTimeValue,STVLng);
		
		if(minSTV > sumNTV && ReadyQ.length == 0)
		{
			type = "RR";
			sumNTV++;
			//set idleflag to true
			IdleFlag = 1;
			//invoke idle function , idle function invoke nemudar function to build gantt chart
			Idle();
		}else{
			
			for(i in NeedTimeValue)
				if(ReadyQ.indexOf("i"+i) == -1 && StartTimeValue[i] <= sumNTV)
				{
					//adds new items to the beginning of an array eg i1
					ReadyQ.unshift("i"+i);
					ReadyQ.unshift(NeedTimeValue[i]);
				}
			//removes the first item of an array, and returns that remove item store in NTV
			NTV = Number(ReadyQ.shift());
			IDName = ReadyQ.shift();
			//replace i with empty string
			Name = Number(IDName.replace("i",""));
			a = Number(StartTimeValue[Name]);
			
			if(NTV > RRCounter)
			{
				NTV -= RRCounter;
				//adds new items to the end of an array,
				ReadyQ.push(NTV);
				ReadyQ.push(IDName);
				NeedTimeValue[Name] = NTV;
				NTV = RRCounter;
			}
			else{
				
				STVLng--;
				delete(StartTimeValue[Name]);
				delete(NeedTimeValue[Name]);
			}
			
			show(a,NTV,Name,"RR");
			
			sumNTV += NTV;
			//calculate total turnaround time
			sumA = sumA + (sumNTV-a);
			count++;
		}
	}
	
	if(count==input.value) {
		alert("Average Turnaround Time: " + sumA/input.value);
		count = 0;
		sumA = 0;
	}
	//Remove a "click" event for  run button that
	//has been attached with the addEventListener() method (RR):
	input3.removeEventListener("click",RR,false);
}

//Shortest-Remaining-Time-First  algorithm
function SRTN()
{
	//if SRTN flag = 1, true
	if(SRTNflag)
	{
		ReadyQ = new Array();
		SRTQ = new Array();
		STVLng = StartTimeValue.length;
		minStartArray = 0;
	}
		
	if(STVLng !=0)
	{
		SRTNflag = 0;
		for(i in NeedTimeValue)
			//returns -1 if the value to search for never occurs. in a readyQ il
			if(StartTimeValue[i] <= minStartArray && ReadyQ.indexOf("i"+i) == -1)
			{
				//store StartTimeValue array which value = 0/start time =0 into ReadyQ array
				//eg needtime , i0, s0
				ReadyQ.push(NeedTimeValue[i]);
				ReadyQ.push("i"+i);
				ReadyQ.push("s"+StartTimeValue[i]);
				delete(StartTimeValue[i]);
				delete(NeedTimeValue[i]);
			}
			
			if(ReadyQ.length == 0)
			{
				minStartArray++;
				//set idleflag = 1 , true
				IdleFlag = 1;
				//invoke idle function , idle function invoke nemudar function to build gantt chart
				Idle();
			}else{
				
				//return the smallest element from StartTimeValue in the readyQ array and store it in SRNT
				SRNT = MinOfArray(ReadyQ);
				NTV = SRNT;
				//returns the position of the first occurrence of a specified value in a string.
				SRNTIdx = ReadyQ.indexOf(SRNT);
				//store next index position's value of smallest value to SRId
				SRId = ReadyQ[ReadyQ.indexOf(SRNT)+1];
				//extract its NeedTimeValue index number store in RQIdx
				RQIdx = Number(SRId.replace("i",""));
				Name = RQIdx;
				////store next next index position's value of smallest value to SRST
				SRST = ReadyQ[ReadyQ.indexOf(SRNT)+2];
				//extract its Starttimevalue element value store in SRSTValue
				SRSTValue = Number(SRST.replace("s",""));
				a = SRSTValue;
//				lastMemberRQ = ReadyQ.pop();
//				lastIdxRQ = ReadyQ.lastIndexOf(lastMemberRQ);
//				ReadyQ.push(lastMemberRQ);
				for(i in StartTimeValue)
				{
					//compare ready Q StartTimeValue with orignal StartTimeValue array 
					//with smalles value and return the number with the lowest value
					if(Math.min(minStartArray + SRNT , StartTimeValue[i]) == StartTimeValue[i])
						if(minStartArray + SRNT - StartTimeValue[i] > NeedTimeValue[i])
						{
							if(NTV + minStartArray > StartTimeValue[i])
							{
								ReadyQ[SRNTIdx] = SRNT - (StartTimeValue[i] - minStartArray);
								NTV = StartTimeValue[i] - minStartArray;
								Name = RQIdx;
								a = SRSTValue;
							} else if(NTV + minStartArray == StartTimeValue[i])
								if(NeedTimeValue[StartTimeValue.indexOf(NTV)] > NeedTimeValue[i])
								{
									ReadyQ[SRNTIdx] = SRNT - (StartTimeValue[i] - minStartArray);
									NTV = StartTimeValue[i]- minStartArray;
									Name = RQIdx;
									a = SRSTValue;
								}
						}
				}
				
				minStartArray += NTV;
				
				if(NTV == SRNT)
				{
					STVLng--;
					//adds/removes items to/from an array from index position and number of removed item(s).
					ReadyQ.splice(SRNTIdx,3);
				}
				
				show(a,NTV,Name,"SRTN");
				
				//calculate total turnaround time
				sumA = sumA + (minStartArray-a);
				count++;
/*			NTV = MinOfArray(ReadyQ);
			IDName = ReadyQ[ReadyQ.indexOf(NTV)+1];
			Name = Number(IDName.replace("i",""));
			a = StartTimeValue[Name];
			ReadyQ.splice(ReadyQ.indexOf(SRNT),3);
			StartTimeValue[Name]++;
			NTV = 1;
			minRQ = MinOfArray(ReadyQ);
			while(NTV != minRQ)
			{
			for(i in StartTimeValue)
			{
				if(Math.min(minStartArray,StartTimeValue[i]) == minStartArray)
				{
					SRTQ.push(NeedTimeValue[i])
					SRTQ.push('i'+i);
				}
			}
			if(SRTQ.length != 0)
				minSRTQ = MinOfArray(SRTQ);
			if(++NTV < minSRTQ)
				continue;
			else
				break;
			}
			show(a,NTV,Name,"SRTN");
			if(NTV == minRQ)
			{
				STVLng--;
				delete(StartTimeValue[Name]);
				delete(NeedTimeValue[Name]);
			}
			else
			{
				ReadyQ.push(NTV);
				ReadyQ.push("i"+Name);
			}
*/			}
	}
	
	if(count==input.value) {
		alert("Average Turnaround Time: " + sumA/input.value);
		count = 0;
		sumA = 0;
	}
	//Remove a "click" event for  run button that
	//has been attached with the addEventListener() method (RR):
	input3.removeEventListener("click",SRTN,false);
}


//Sort the numbers in the array in ascending order
function numberOrderS(a, b) { return a - b; }


// Sort the numbers in the array in descending order
function numberOrderN(a, b) { return b - a; }

//receive remove item , array that has been item remove and algorithm type find the index number in the NameArray for a
function searchID(a,NameArray,t)
{
	//loop +=2 because StartNameArray add new (value) follow by id ("s" + i) at the end of StartNameArray array 
	for(h = 0; h < NameArray.length; h += 2)
	{
		NameArray[h] = Number(NameArray[h]);
		//check array element that matches the remove element value
		if(NameArray[h] == a)
		{
			//eg s1, s2 for string "s12" , s =index 0, 1 index 1, 2 index 2 then NeedID[1]+NeedID[2] = 12
			NeedID = NameArray[h+1];
			//StartNameArray with value s10 above
			if(Number(NeedID[1]+NeedID[2]) > 9)
				NeedName = Number(NeedID[1]+NeedID[2]);
			else
				NeedName = Number(NeedID[1]);
			
			if(!t)
			{
				StartNameArray[h] = -1;
				StartNameArray[h+1] = "#";
				NeedNameArray[h] = -1;
				NeedNameArray[h+1] = "#";
			}
			
			return NeedName;
		}
		//skip current loop
		else continue;
	}
}

//receive array as parameter return the smallest element in the array
function MinOfArray(ArrayOfNeed)
{
	//initialised 1st index of array as snallest value and store the value in minOfArray
	minOfArray = Number(ArrayOfNeed[0]);
	
	for(i in ArrayOfNeed)
	{
		//0-1 or s-1  , 10 or s0, 20 or s0, 31 or s1, 41 or s1
		if(ArrayOfNeed[i] == "i"+(Math.round(i/2)-1) || ArrayOfNeed[i] == "s"+(Math.round(i/2)-1))
			continue;
		if(Number(ArrayOfNeed[i]) < minOfArray)
			minOfArray = Number(ArrayOfNeed[i]);
	}
	
	return minOfArray;
}

//receive array as parameter return the largest element in the array
function MaxOfArray(ArrayOfNeed)
{
	//initialised 1st index of array as largest value and store the value in maxOfArray
	maxOfArray = Number(ArrayOfNeed[0]);
	for(i in ArrayOfNeed)
		if(Number(ArrayOfNeed[i]) > maxOfArray)
			maxOfArray = Number(ArrayOfNeed[i]);
	
	return maxOfArray;
}

//receive StartTimeValue array and length
function findMin(ArraySend,lng)
{
	for(i in ArraySend)
	{
		if(ArraySend[i] != -1)
			break;
		// returns the position of the first occurrence of a specified value in a string. 
		//position start count from 0. This method returns -1 if the value to search for never occurs.
		else if(i >= ArraySend.lastIndexOf(-1) && i >= lng-1)
			return -1;
	}
	
	minOfArray = 0;
	
	while(ArraySend.indexOf(minOfArray) == -1)
	{
		minOfArray++;
	}
	
	return minOfArray;
}