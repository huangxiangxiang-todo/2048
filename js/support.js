function getPosTop(i,j){
    return 20 + i * 120;
}
function getPosLeft(i,j){
    return 20 + j * 120;
}
function getScore(){

    $("#score").html(score);
    
}
function getNumberBackgroundColor(number){

    if ((typeof number) == "number") {
        switch(number){
    case 2:
        return "#eee4da";
        break;
    case 4:
        return "#eee4da";
        break;
    case 8:
        return "#f26179";
        break;
    case 16:
        return "#f59563";
        break;
    case 32:
        return "#f67c5f";
        break;
    case 64:
        return "#f65e36";
        break;
    case 128:
        return "#edcf72";
        break;
    case 256:
        return "#edcc61";
        break;
    case 512:
        return "#9c0";
        break;
    case 1024:
        return "#3365a5";
        break;
    case 2048:
        return "#09c";
        break;
    case 4096:
        return "#a6bc";
        break;
    case 8192:
        return "#93c";
        break;
    }
    }else if ((typeof number) == "string") {}{
        switch(number){
    case "搭讪":
        return "#eee4da";
        break;
    case "暧昧":
        return "#eee4da";
        break;
    case "约会":
        return "#f26179";
        break;
    case "表白":
        return "#f59563";
        break;
    case "恋爱":
        return "#f67c5f";
        break;
    case "牵手":
        return "#f65e36";
        break;
    case "拥抱":
        return "#edcf72";
        break;
    case "接吻":
        return "#edcc61";
        break;
    case "结婚":
        return "#9c0";
        break;
    case "纪念日":
        return "#3365a5";
        break;
    case "小恩爱":
        return "#09c";
        break;
    case "相濡以沫":
        return "#a6bc";
        break;
    case "白头偕老":
        return "#93c";
        break;
    }
    }
    
    return "#000";
}
function getNumberColor(number){
    if ((typeof number) == "number") {
        if (number<=4) {
        return "#776e65";
    }
    }else if ((typeof number) == "string") {
        if (number<="暧昧") {
        return "#776e65";
        }
    }
    
    return "white";
}

function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
// 实现功能判断
function canMoveLeft(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (board[i][j] != 0　&& j != 0) {
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (board[i][j] != 0 && j!=3) {
                if (board[i][j+1] ==0 || board[i][j+1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (board[i][j] != 0 && i!=0) {
                if (board[i-1][j] ==0 || board[i-1][j] == board[i][j]) {
                    return true;
                }
        }
    }
    }
    return false;
}
function canMoveDown(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (board[i][j] != 0 && i!=3) {
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
// 判断水平方向是否有障碍物
function noBlockHorizontal(row,col1,col2,board){
    for(var i = col1 + 1; i<col2 ; i++){
        if (board[row][i]!=0) {
            return false;
        }
    }
    return true;
}
function noBlockVertical(col,row1,row2,board){
    for(var i = row1 + 1;i<row2 ;i++){
        if (board[i][col]!=0) {
            return false;
        }
    }
    return true;
}
function nomove(board){
    if(canMoveLeft(board)|| canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
        return false;
    return true;
}