const board = [[null,0,0,1],[0,null,null,null],[0,null,null,null],[1,null,null,null]];

print(board);

var print = function(board) {
  // each row
  for(let i=0;i<board.length;i++){
    let row_string = "|";

    for(let k=0;k<board[i].length;k++) { // each column
      if(board[i][k] == 0){
        row_string+="O";
      }
      if(board[i][k] == 1){
        row_string+="X";
      }
      if(board[i][k] == null){
        row_string += " ";
        row_string += "|";
      }
    }//row

    console.log(row_string);
  }
  return total_string;
}