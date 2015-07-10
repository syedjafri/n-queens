// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count=0;
      var col = this.rows().length;
      for (var i=0; i< col; i++){
        if (this.get(rowIndex)[i]===1){
          count++;
        }
      }
      //on the row rowIndex
        //test if the value is 1 or 0
        //if its 0, do nothing
        //if its 1, count it
        //if the count is greater than 1
          //report conflict
        //otherwise report no conflict

      return (count>1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var col = this.rows().length;
      for (var i = 0; i < col; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var row = this.rows().length;
      var count = 0;
      for (var i = 0; i < row; i++){
        if (this.get(i)[colIndex] === 1){
          count++;
        }
      }
      return (count > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
            //for each column
        //call hasColConflictAt
        //if true, return true
      //otherwise return false
      var col = this.rows().length;
      for (var i=0; i<col; i++){
        if (this.hasColConflictAt(i)){
          return true;
        }
      }


      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //define number of times to run
      var num = this.rows().length - majorDiagonalColumnIndexAtFirstRow;
        //length - position
      var count =0;
      //define counter variable

      for (var i=0; i<num; i++){
        if (this.get(i) === undefined){
          i++;
        }
        else if(this.get(i)[majorDiagonalColumnIndexAtFirstRow]===1){
          count++;
          majorDiagonalColumnIndexAtFirstRow++;
        }
      }
      //for each row, starting at row 0, column majorDiagonalColumnIndexAtFirstRow
        //check if equal to one, increment counter
        //increment majorDiagonalColumnIndexAtFirstRow
      //return true if greater than 1
      return (count>1);

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
    // start from top left
    // on each column, call hasMajorDia Conf to see if there is a conflict
    // if found, return true
    for(var i = 0; i < this.rows().length; i++){
      if (this.hasMajorDiagonalConflictAt(i)){
        return true;
      }
    }

    return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //define number of times to run


     var num = minorDiagonalColumnIndexAtFirstRow;
        //length - position
      var count = 0;
      //define counter variable
      for (var i = 0; i <= num; i++){
        if (this.get(i) === undefined){
          i++;
        }
        else if(this.get(i)[minorDiagonalColumnIndexAtFirstRow]===1){
          count++;   
        }
        minorDiagonalColumnIndexAtFirstRow--;
      }
      console.log(count);
      return (count>1);


      //for each row, starting at   row 0, column minorDiagonalColumnIndexAtFirstRow
        //check if equal to one, increment counter
        //increment minorDiagonalColumnIndexAtFirstRow
      //return true if greater than 1
      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      
    for(var i = this.rows().length-1; i >=0 ; i--){
      if (this.hasMinorDiagonalConflictAt(i)){
        return true;
      }
    }

    return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
