"use strict";

window.onload = function(){
   //window.alert(getLiveValue());

   var gameBoardArray;
   var tempArray;
   var i;
   var j;

   gameBoardArray = create(100,100,getDeadValue());
   tempArray = copy(gameBoardArray);

   createGameBoard("gameBoard",gameBoardArray);
   createFirstGeneration(gameBoardArray);

   for(i=0;i<gameBoardArray.length;i++){
   	for(j=0;j<gameBoardArray[i].length;j++){

   		if(gameBoardArray[i][j] === getLiveValue()){document.getElementById("r"+i+"c"+j).style.backgroundColor = getLiveColor();}
   		else{document.getElementById("r"+i+"c"+j).style.backgroundColor = getDeadColor();}	
   	}

   }//for i

   //countLivingNeighboursOf(gameBoardArray,4,3);
   setInterval(function(){applyRules(gameBoardArray,tempArray)},100) ;   

       //

     
}

function createFirstGeneration(array2d){
	var i;
	var j;
	var k;
	var row;
	var col;

	for(i=0;i<array2d.length;i++){
		for(j=0;j<array2d[i].length;j++){ 
			 //array2d[i][j] = Math.floor(Math.random()*2); 

			 if(i===j || i==j || (i+j)%2 === 0){array2d[i][j] = getLiveValue();}
		}
	}

	
}

function applyRules(array2d,tempArray){

	var i;
	var j;
	//count and store current no. of living neighbours in temparray
	for(i=0;i<array2d.length;i++){
		for(j=0;j<array2d[i].length;j++){tempArray[i][j] = countLivingNeighboursOf(array2d,i,j);}
	}
    //modify the states of cell in gameBoardArray according to the rules
    for(i=0;i<array2d.length;i++){
    	for(j=0;j<array2d[i].length;j++){
    		if(array2d[i][j] == getLiveValue() && tempArray[i][j] <2){array2d[i][j] = getDeadValue();}
    		if(array2d[i][j] == getLiveValue() && tempArray[i][j] >3){array2d[i][j] = getDeadValue();}
    		if(array2d[i][j] == getDeadValue() && tempArray[i][j] == 3){array2d[i][j] = getLiveValue();}
    	}
    }

    //apply modifications to HTML
    for(i=0;i<array2d.length;i++){
   	for(j=0;j<array2d[i].length;j++){

   		if(array2d[i][j] === getLiveValue()){document.getElementById("r"+i+"c"+j).style.backgroundColor = getLiveColor();}
   		else{document.getElementById("r"+i+"c"+j).style.backgroundColor = getDeadColor();}	
   	}

   }//for i


}

function countLivingNeighboursOf(array2d,row,col){

	var i;
	var j;
	var count;

	count = 0;

		
		if(isInArray(array2d,row,col+1) && Number(array2d[row][col+1]) === getLiveValue()){count = count+1;}
		if(isInArray(array2d,row,col-1) && Number(array2d[row][col-1]) === getLiveValue()){count = count+1;}
		if(isInArray(array2d,row+1,col) && Number(array2d[row+1][col]) === getLiveValue()){count = count+1;}
		if(isInArray(array2d,row-1,col) && Number(array2d[row-1][col]) === getLiveValue()){count = count+1;}
		if(isInArray(array2d,row+1,col+1) && Number(array2d[row+1][col+1]) === getLiveValue()){count = count+1;}
		if(isInArray(array2d,row+1,col-1) && Number(array2d[row+1][col-1]) === getLiveValue()){count = count+1;}
		if(isInArray(array2d,row-1,col-1) && Number(array2d[row-1][col-1]) === getLiveValue()){count = count+1;}
		if(isInArray(array2d,row-1,col+1) && Number(array2d[row-1][col+1]) === getLiveValue()){count = count+1;}


	return count;


}

function getDeadValue(){return 0;}
function getLiveValue(){return 1;}

function getDeadColor(){return "black";}
function getLiveColor(){return "red";}

function isAlive(cell){return cell.innerHTML == getLiveValue();}

function isInArray(array2d,row,col){

 return row>=0 && col>=0 && row<array2d.length && col< Number(array2d[row].length);

}

function createHTMLelement(elementType,id,classInfo,content)
{
	if(elementType === null){elementType="";}
	if(id === null)         {id="";}
	if(classInfo === null)  { classInfo= "";}

	elementType = elementType.trim();
	id          = id.trim();
	classInfo   = classInfo.trim();

	if(id.length > 0){id = ' id="'+id+'"';}
	if(classInfo.length > 0){classInfo= ' class="'+classInfo+ '"';}//whitespaces are included in string.

	return '<'+ elementType +
	        id + classInfo +
	        '>' + content +
	        '</' + elementType + '>';
}


function createGameBoard(containerElement,array2d){

	var element;
	var result;
	var i;
	var j;

	element = document.getElementById(containerElement);
	result = "";

	for(i=0;i<array2d.length;i++){

		result = result + "<tr>";

		for(j=0;j<array2d[i].length;j++){result = result + createHTMLelement("td","r"+i+"c"+j,"cell","");}

		result = result + "</tr>";

	}

	element.innerHTML = result;
}

function create (numberOfRows, numberOfColumns, intialValue){

    var i;
    var j;
    var result;
 
    result = new Array ( numberOfRows );

    for ( i=0; i<result.length; i++ ){

       result [i] = new Array ( numberOfColumns );

  		for ( j=0; j<result[i].length; j++ ){result [i][j] = intialValue;} // for ( j=0

	} //for(i=0
 return result;
}

function copy(array2d){

	var i;
	var j;
	var result;

	result = new Array(array2d.length);

	for(i=0;i<array2d.length;i++){

		result[i] = new Array(array2d[i].length);
		for(j=0;j<array2d[i].length;j++){result[i][j] = array2d[i][j];}
	}
  return result;
}





