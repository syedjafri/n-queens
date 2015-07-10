/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n, truth) {
  return "Blocked out for testing speed!!";
  var solutionCount = 0; 
  // Make nxn array. n is given
  var board = new Board({'n': n});

  //stores all solutions, initial value is all possible first row solutions
  var storage = findSol(board, 0);

  //finds all possible next row solutions, overwrites storage with results
  function findSol (array, row){
    //var newBoard = new Board(storage[x]);
    var temp = [];
    for (var i=0; i<n; i++){
      array.togglePiece(row,i);
      if (!array.hasAnyRooksConflicts()){
        temp.push(JSON.parse(JSON.stringify(array.rows())));
      }
      array.togglePiece(row,i);
    }
    return temp;
  }

  //goes through each row, runs findSol on the next row for each solution in storage
  for (var num = 1; num < n; num++){
    var temp = [];
    for (var j = 0; j < storage.length; j++){
      var newBoard = new Board(storage[j]);
      temp = temp.concat(findSol(newBoard, num));
      delete newBoard;
    }
    storage = temp;
  }

  if (truth === true){
    return storage.length;
  }
  solutionCount = storage.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  var retVal = new Board(storage[0]);
  return retVal.rows();





      //retVal.rows() = storage[0];
      //console.log(retVal.rows());
      //retVal.attributes['n'] = n;
      

        //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      // return solution.rows();

      //start with every placement in first row
        //store each of these
      //for each stored first row placement
        //store all second row placements
      //...continue  until n
        //the number of storage elements we create at iteration n will be the solution
      //[1, 0, 0] [0, 1, 0] [0, 0, 1]
      //[0, 0, 0] [0, 0, 0] [0, 0, 0]
      //[0, 0, 0] [0, 0, 0] [0, 0, 0]

      //[1, 0, 0] [1, 0, 0] [0, 1, 0] [0, 1, 0] [0, 0, 1] [0, 0, 1]
      //[0, 1, 0] [0, 0, 1] [1, 0, 0] [0, 0, 1] [1, 0, 0] [0, 1, 0]
      //[0, 0, 0] [0, 0, 0] [0, 0, 0] [0, 0, 0] [0, 0, 0] [0, 0, 0]

      //[1, 0, 0] [1, 0, 0] [0, 1, 0] [0, 1, 0] [0, 0, 1] [0, 0, 1]
      //[0, 1, 0] [0, 0, 1] [1, 0, 0] [0, 0, 1] [1, 0, 0] [0, 1, 0]
      //[0, 0, 1] [0, 1, 0] [0, 1, 0] [1, 0, 0] [0, 1, 0] [1, 0, 0]
      
      // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
      // return solutionCount;

      // var solution = new Board({'n': n});
      // // make an nxn array. 
      // // for row=column (i.e. diagonal position), call toggle
      // // return array.

      // for (var i = 0; i < n; i++){
      //   solution.togglePiece(i, i);
      // }

      // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      // return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  return "Blocked out for testing speed!!";
  return findNRooksSolution(n, true);
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, truth, solutionArray, row){
  if (n === 0 || n === 1){
    return 1;
  }

  var board = new Board({'n': n});

  if (solutionArray === undefined){
    solutionArray = [];
    row = 1;
    for (var i = 0; i < board.rows().length; i++){
      board.togglePiece(0, i);
      solutionArray.push(JSON.parse(JSON.stringify(board.rows())));
      board.togglePiece(0, i);
    }
  }

  var tempSolutionArray = [];
  
  for (var i = 0; i < solutionArray.length; i++){
    var tempBoard = new Board(solutionArray[i]);
    for (var j = 0; j < board.rows().length; j++){
      tempBoard.togglePiece(row, j);
      if (!tempBoard.hasAnyQueensConflicts()){
        tempSolutionArray.push(JSON.parse(JSON.stringify(tempBoard.rows())));
      }
    }
  }
  solutionArray = tempSolutionArray;

  if (row === n){
    if (truth === true){
      return solutionArray.length;
    }
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionArray[0]));
    return solutionArray[0];
  } 
  else {
    row++;
    return findNQueensSolution(n, null, solutionArray, row);
  }

};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findNQueensSolution(n, true); //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;

};
