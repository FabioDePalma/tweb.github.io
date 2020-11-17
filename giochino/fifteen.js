/**
 * il gioco 15 puzzle consiste in un puzzle disordinato
 * dove l'utente deve cercare di riordinarlo 
 * facendo solo un movimento verso il blocco vuoto.
 */
window.onload = startGame;
/**
 *  tengo traccia del valore del blocco vuoto
 */
var emptyX = 300;
var emptyY = 300;

var divBlock;

function startGame(){
    //start
    divBlock = document.querySelectorAll("#puzzlearea > div");
    var button = document.getElementById("shufflebutton");
    
/**
  applico il backgound ad ogni blocco div

 */
    var i = 0;
    for(var y = 0; y < 400 ; y+=100){
        for(var x = 0; x < 400 && i<15; x+=100){

            divBlock[i].style.left = x + "px"; //sposto sull'asse X
            divBlock[i].style.top = y +"px";
            divBlock[i].style.backgroundPosition = "-" + x + "px " + "-" + y + "px";

            
            i++;
        }
        x = 0;
    }
    
    button.onclick = shuffle;


    for(var j = 0; j < divBlock.length; j++){
        divBlock[j].onclick = function(){
            move(this);
            if(win()){
                setTimeout(function (){alert("YOU WIN!!!")}, 100);
            }
        };
        /**
         * applico il bordo rosso
         */
        divBlock[j].onmouseover = bordo;
        divBlock[j].onmouseout = nobordo;
       
        
    }
    
}

/**
 * verifio se il puzzle è stato completato correttamente
 */
function win(){
    tempx = 0;
    tempy = 0;
    flag = true;
    var i = 0;
    for(var y = 0; y < 400 && flag == true; y+=100){
        for(var x = 0; x < 400 && i<15 && flag == true; x+=100){
            tempx = parseInt(divBlock[i].style.left);
            tempy = parseInt(divBlock[i].style.top);

            if(tempx == x && tempy == y){
                flag = true;
            }else{
                flag = false;
            }
            
            i++;
        }
        x = 0;
    }
    return flag;
}

    /**
    * disordina il puzzle
    */
function shuffle(){
    for(var i = 0; i<250; i++){
        var random = Math.floor((Math.random() * 15));
        move(divBlock[random]);
    }
}

    /**
     * quando clicco sul blocco viene spostato nella casella libera
     * ?viene anche usato in shuffle per disordinare il puzzle
     */

function move(blocco){
    
    var xBlock = parseInt(blocco.style.left);
    var yBlock = parseInt(blocco.style.top);
    switch (canMove(blocco)) {
        case "sx":
        case "dx":
        case "top":
        case "bot":
            var temp1 = xBlock;
            var temp2 = yBlock;
            xBlock = emptyX;
            yBlock = emptyY;
            emptyX = temp1;
            emptyY = temp2;
            blocco.style.left = xBlock + "px";
            blocco.style.top = yBlock + "px";
            
            break;
        case null:
        default://non posso sposare il blocco
            return;
    }
    
}


function nobordo(){
    this.style.borderColor = "black";
}
function bordo(){
    if(canMove(this)){
        this.style.borderColor = "red";
    }
}

/**
 * verifico se il blocco che devo spostare e affianco a una casella libera
 */
function canMove(pos){
    var xB = parseInt(pos.style.left);
    var yB = parseInt(pos.style.top);
    var newXL = parseInt(pos.style.left) - 100;
    var newXR = parseInt(pos.style.left) + 100;
    var newYT = parseInt(pos.style.top) + 100;
    var newYB = parseInt(pos.style.top) - 100;
   
    if(newXL == emptyX && yB == emptyY){ //sposto a sinistra
        return "sx";
    }else if(newXR == emptyX && yB == emptyY){ //sposto a destra
        return "dx";
    }else if(newYT == emptyY && xB == emptyX){//sposto sopra
        return "top";
    }else if(newYB == emptyY && xB == emptyX){//sposto sotto
        return "bot";
    }else{
        return null;
    }
}