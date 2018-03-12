    var board = new Array();
    var added = new Array();
    var score = 0;
    var top = 240;
    var numToString = {
        "搭讪" : "暧昧",
        "暧昧" : "约会",
        "约会" : "表白",
        "表白" : "恋爱",
        "恋爱" : "牵手" ,
        "牵手" : "拥抱",
        "拥抱" : "接吻",
        "接吻" : "结婚",
        "结婚" : "纪念日",
        "纪念日" : "小恩爱",
        "小恩爱" : "相濡以沫",
        "相濡以沫" : "白头偕老"
    }
    var stringToScore = {
        "搭讪" : 0,
        "暧昧" : 4,
        "约会" : 8,
        "表白" : 16,
        "恋爱" : 32 ,
        "牵手" : 64,
        "拥抱" : 128,
        "接吻" : 256,
        "结婚" : 512,
        "纪念日" : 1024,
        "小恩爱" : 2048,
        "相濡以沫" : 4096
    }

    $(document).ready(function(e){
        newgame();
        $("#newgamebutton").on("click",function(){
            newgame();
        });
        $("#restartbutton").on("click",function(){
            $("#grid-container").css("opacity","1");
            newgame();
        })
    });

    function newgame(){
        //初始化棋盘
        init();
        //在随机两个各自生成的数字
        generateOneNumber();
        generateOneNumber();
    }

    function init(){
        score = 0;
        $("#score").html(score);
        $("#gameover").css("display","none");
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                var gridCell = $("#grid-cell-"+i+"-"+j);
                gridCell.css("top",getPosTop(i,j));
                gridCell.css("left",getPosLeft(i,j));
            }
        }
        //初始化格子数组
        for(var i=0;i<4;i++){
            board[i]=new Array();
            for(var j=0;j<4;j++){
                board[i][j]=0;
            }
        }
        // 初始化判定盒子的数组
        for(var i=0;i<4;i++){
            added[i] = new Array();
            for(var j=0;j<4;j++){
                added[i][j] = 0;
            }
        }

        //通知html对格子数组进行设定
        updateBoardView();
    }
    //更新前端样式
    function updateBoardView(){
        $(".number-cell").remove();
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');

                var theNumberCell = $("#number-cell-"+i+"-"+j);
                if (board[i][j] == 0) {
                    theNumberCell.css('width','0px');
                    theNumberCell.css('height','0px');
                    theNumberCell.css('top',getPosTop(i,j));
                    theNumberCell.css('left',getPosLeft(i,j));
                }else{
                    theNumberCell.css('width','100px');
                    theNumberCell.css('height','100px');
                    theNumberCell.css('top',getPosTop(i,j));
                    theNumberCell.css('left',getPosLeft(i,j));
                    theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                    theNumberCell.css('color',getNumberColor(board[i][j]));
                    theNumberCell.text(board[i][j]);
                }

            }
        }

    }
    //生成随机的格子
    function generateOneNumber(){
        if (nospace(board)) {
            return false;
        }
        // 随机一个位置
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
        while(true){
            if (board[randx][randy] == 0) {
                break;
            }
            randx = parseInt(Math.floor(Math.random()*4));
            randy = parseInt(Math.floor(Math.random()*4));
        }
        // 随机一个数字 
        // var randNumber = Math.random()<0.5?2:4;
        if ($("#checkversion").val() == "option1") {
            randNumber = Math.random()<0.5?2:4;
        }else if($("#checkversion").val() == "option2"){
            randNumber = Math.random()<0.5?"搭讪":"暧昧";
        }
        
        $("#checkversion").on("change",function(){
            newgame();
            if ($("#checkversion").val() == "option1") {
            randNumber = Math.random()<0.5?2:4;
        }else if($("#checkversion").val() == "option2"){
            randNumber = Math.random()<0.5?"搭讪":"暧昧";
        }
        // console.log(randNumber);
        // console.log($("#checkversion").val());
        });
        // 在随机位置显示随机数字
        board[randx][randy] = randNumber;
        // console.log(board[randx][randy]);
        showNumberWithAnimation(randx,randy,randNumber);
        return true;
    }
    // 事件响应循环
    $(document).keydown(function(event){
        switch(event.keyCode){
            // 向左
            case 37:
            if (moveLeft()) {
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                isgameover();
            }
            break;
             // 向上
            case 38:
            if (moveUp()) {
                getScore();
                generateOneNumber();
                isgameover();
            }
            break;
             // 向右
            case 39:
            if (moveRight()) {
                getScore();
                generateOneNumber();
                isgameover();
            }
            break;
             // 向下
            case 40:
            if (moveDown()) {
                getScore();
                generateOneNumber();
                isgameover();
            }
            break;
        }
    });

    function isgameover(){
        if (nospace(board) && nomove(board)) {
            gameover();
        }
    }
    function gameover(){
        $("#grid-container").css("opacity","0.7");
        $("#gameover").css("display","block");
    }

    function isaddedArray(){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                added[i][j] = 0;
            }
        }
    }

    function moveLeft(){
        // 判断格子是否能够向左移动
        if (!canMoveLeft(board)) {
            return false;
        }
        // 初始化合并数组
        isaddedArray();
        for(var i = 0; i < 4; i++){
            // 第一列数字不可能向左移动移动
            for(var j = 1; j < 4; j++){
                // 所有的可以移动的都移
                if (board[i][j] != 0) {
                    for(var k=0;k<j;k++){
                        // 落脚位置是否为空 && 中间没有障碍物
                        if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ) {
                            // 每次循环会+1次调用
                            showMoveAnimation(i,j,i,k);
                            //把前面的值赋值给后面的值,然后把前面的赋值为0
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        //落脚的位置等于前面的值 && 中间没有障碍物
                        else if (board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)) {

                            showMoveAnimation(i,j,i,k);

                            if (added[i][k]!=0) {

                                board[i][k+1] = board[i][j];
                                board[i][j] = 0;
                            }
                            else{
                         if ($("#checkversion").val() == "option1") {
                            board[i][k] += board[i][j]; 
                        }else if($("#checkversion").val() == "option2"){
                            var str = board[i][k]+"|"+board[i][j];
                            var strT = str.split("|");

                            board[i][k] = numToString[strT[0]];
                            // console.log(board[i][k]);
                        } 
                                // board[i][k] += board[i][j];
                                board[i][j] = 0;
                                added[i][k] = 1;
                                // score += board[i][k];
                                if ($("#checkversion").val() == "option1") {
                                score += board[i][k];
                            }
                            else if ($("#checkversion").val() == "option2") {
                                var str = board[i][k];
                                var ScoreNum = parseInt(stringToScore[str]) ;
                                score += ScoreNum;
                            } 
                                // console.log(score);

                            }
                           continue;
                            
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()",200);
        return true;

    }
    function moveRight(){//更多地细节信息  
    //判断格子是否能够向右移动  
    if( !canMoveRight(board))  
        return false;  
      
    isaddedArray();  
    //真正的moveRight函数//标准  
    for(var i = 0;i<4;i++)  
        for(var j = 2;j>=0;j--){//最后一列的数字不可能向右移动  
            if(board[i][j] !=0){  
                //(i,j)右侧的元素  
                for(var k = 3;k>j;k--){  
                    //落脚位置的是否为空 && 中间没有障碍物  
                    if(board[i][k] == 0 && noBlockHorizontal(i , j, k, board)){  
                        //move  
                        showMoveAnimation(i, j,i,k); 
                        // 移动后落脚位置赋值为之前的值 
                        board[i][k] = board[i][j];  
                        board[i][j] = 0;  
                        continue;  
                    }  
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物  
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , j, k, board)){  
                        //move  
                        showMoveAnimation(i, j,i,k);  
                        //add  
                         if(added[i][k]!=0){  
                                board[i][k-1] = board[i][j];  
                                board[i][j] = 0;  
                        }  
                        else{  
                         if ($("#checkversion").val() == "option1") {
                            board[i][k] += board[i][j]; 
                        }else if($("#checkversion").val() == "option2"){
                            // console.log(board[i][k]+board[i][j]);
                            var str = board[i][k]+"|"+board[i][j];
                            var strT = str.split("|");
                            console.log(strT[0]);
                            board[i][k] = numToString[strT[0]];
                            console.log(board[i][k]);
                        }                           
                            // board[i][k] += board[i][j];  
                            board[i][j] = 0;  
                            added[i][k] = 1;  
                            // score += board[i][k]; 
                            if ($("#checkversion").val() == "option1") {
                                score += board[i][k];
                            }
                            else if ($("#checkversion").val() == "option2") {
                                var str = board[i][k];
                                var ScoreNum = parseInt(stringToScore[str]) ;
                                score += ScoreNum;
                            }
                            // console.log(score); 
                        }  
                        continue;  
                    }  
                }  
            }  
        }  
    setTimeout("updateBoardView()",200); 
    return true;  
}
function moveUp(){
    if (!canMoveUp(board)) {
        return false
    }
    isaddedArray();
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if (board[i][j] != 0) {
                for(var k=0;k<i;k++){
                    // 落脚位置的是否为空 && 中间没有障碍物
                    if (board[k][j] == 0 && noBlockVertical(j,k,i,board)) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    // 落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        if (added[k][j] != 0) {
                            board[k+1][j] = board[i][j];
                            board[i][j] = 0;
                        }else{
                          if ($("#checkversion").val() == "option1") {
                            board[k][j] += board[i][j]; 
                        }else if($("#checkversion").val() == "option2"){
                            var str = board[k][j]+"|"+board[i][j];
                            var strT = str.split("|");
                            board[k][j] = numToString[strT[0]];
                        }                            
                            // board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j] = 1;
                            // score += board[k][j]; 
                            if ($("#checkversion").val() == "option1") {
                                score += board[k][j];
                            }
                            else if ($("#checkversion").val() == "option2") {
                                var str = board[k][j]
                                var ScoreNum = parseInt(stringToScore[str]) ;
                                score += ScoreNum;
                            }
                            console.log(score);
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown(){
    if (!canMoveDown(board)) {
        return false
    }
    isaddedArray();
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if (board[i][j] != 0) {
                for(var k=3;k>i;k--){
                    if (board[k][j] == 0 && noBlockVertical(j,i,k,board)) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        if (added[k][j]!=0) {
                            board[k-1][j] = board[i][j];
                            board[i][j] = 0;
                        }else {
                          if ($("#checkversion").val() == "option1") {
                            board[k][j] += board[i][j]; 
                        }else if($("#checkversion").val() == "option2"){
                            var str = board[k][j]+"|"+board[i][j];
                            var strT = str.split("|");
                            board[k][j] = numToString[strT[0]];
                        }                              
                            // board[k][j] += board[i][j];  
                            board[i][j] = 0;  
                            added[k][j] = 1;
                            if ($("#checkversion").val() == "option1") {
                                score += board[k][j];
                            }
                            else if ($("#checkversion").val() == "option2") {
                                var str = board[k][j]+"|"+board[i][j];
                                var strT = str.split("|");
                                board[k][j] = numToString[strT[0]];
                                var ScoreNum = parseInt(stringToScore[board[k][j]]) ;
                                score += ScoreNum;
                            }
                            
                            console.log(score);
                        }
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}