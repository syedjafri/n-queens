
var dataArray = [[0,0,0,0],[0,0,0,0], [0,0,0,0], [0,0,0,0]];  


function hasRowConflict(array){
  var count=0;
  for (var i=0; i<array.length; i++){
    if (array[i]===1){
      count++;
    }
  }
  return (count>1);
}

function hasColConflict(col, array){
  var count=0;
  for (var i=0; i<array.length; i++){
    if(array[i][col]===1){
      count++;
    }
  }
  return (count>1);

}

function hasAnyRowConflict(array){
  for (var i=0; i<array.length; i++){
    if (hasRowConflict(array[i])){
      return true;
    }
  }
  return false;
}

function hasAnyColConflict(array){
  
  for (var i=0; i<array.length; i++){
    if (hasColConflict(i, array)){
      return true;
    }
  }
  return false;

}

function toggle(num){
  return num === 0 ? 1 : 0;
}


function findSolution(array){

  var result = Array.prototype.slice.call(array);
  var max = array.length-1;
  var rooksNeeded = array.length;
  var rooks=0;

  for (var row=0; row<=max; row++){
    for (var col=0; col<=max; col++){
      if (result[row][col]===0){
        if (placeRook(result, row, col)){
          rooks++;
        }
      }  
    }
  }

  return result;
}

function placeRook(array, row, col){
  var temp = array.slice();

  temp[row][col]=toggle(temp[row][col]);

  if (hasAnyRowConflict(temp) || hasAnyColConflict(temp)){
    //toggle back
    temp[row][col]=toggle(temp[row][col]);
    return false;
  }
  else{
    return true;
  }

}

function findNSolution(array){

  var newArray = Array.prototype.slice.call(array);
  var result = [];
  for (var i=0; i<newArray.length; i++){
    newArray[0][i]=1;

    console.log(findSolution(newArray));
    reset(newArray);
  }
  
  return result;
}

function reset(array){
  for (var row=0; row<array.length; row++){
    for(var col=0; col<array.length; col++){
      array[row][col]=0;
    }
  }
}

function recurSol (array, row, col){

  var trimmed = array.slice(); // make copy
  var result = []

  if (row===2){
    return findSolution(array);
  }
  else {
  
      // remove row  
      trimmed.splice(row-1, 1);
      // remove column
      trimmed = trimmed.map(function(val){
        return val.slice(0, -1);
      });
      result = recurSol(trimmed, trimmed.length, trimmed.length);
      return findSolution
    }

}

//console.log(recurSol(dataArray, dataArray.length, dataArray.length));
findNSolution(dataArray);


