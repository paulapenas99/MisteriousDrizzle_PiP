var player; // player tendrá un datatype de clase Human
var apretatA=false, apretatD=false, esq=false, dret=false;
movers = [];
let x;
let gameState=0;
let lives;
let death;
var ndeath=0;
let score=0;
var restart;
var timeDelay;
let path;
// cuánto tiempo pasa antes de hacer el siguiente círculo
let next = 0;
// dónde estamos ahora y donde estuvimos antes
let current;
var d;
var youdie = false;
var temps;
var tNivel = 3000;
var replay;
var diffCursor;
var ele;
var cnt=0;
//while our audio is playing,
//this will be set to true
var sampleIsPlaying = true;
var p=false;
var estat=true;
var j=15;
var rp = false;
var cBona=false;
var oBo;
var oMal;
var llistaUsuaris = null;
var nomUsuari;
var json;
var rank = true;
var IntroFoto;
var Nivells;
var Lose;
var Win;
var Joc;
var music;
var replay = false;
var quit = false;
var nU = null;
var nrep = 0;
function setup(){

    nomUsuari = document.getElementById('nomUsuari');
    var cnv = createCanvas(600,600);
    ele = createAudio('data/music.mp3');
    oBo = createAudio('data/cling.mp3');
    oMal = createAudio('data/fail.mp3');
    cnv.parent('canv');
    json = loadJSON("dades.json",carregat,error);
    player = new Human(width/2, 550); // Creació del jugador

    for(let i=0; i<10;i++){
        movers[i]=loadImage('data/MO'+i+'.png');
    }
    replay = loadImage('data/replay.png');
    lives = loadImage('data/heart.png');
    death = loadImage('data/heart-bw.png');
    IntroFoto = loadImage('data/Intro.png');
    Nivells = loadImage('data/Nivells.png');
    Lose = loadImage('data/GameOver.png');
    Win = loadImage('data/YouWin.png');
    Joc = loadImage('data/Joc.png');
    music = loadImage('data/Musica.png');

    current = createVector(0,0);
    current.y = -10;

    current.y = -10;
    next = millis() + random(1000, tNivel);
    timeDelay = 2300;
    path = new Path();


}
function ranking() {
    if(rank == true) {
        var myList = document.getElementById('ranking');
        myList.innerHTML='';
        var l = llistaUsuaris.length;
        for (let i = 0; i <= l-1; i++) {

                let nouTxt = llistaUsuaris[i].nom;
                let nouVal = llistaUsuaris[i].punts;


            let nouElem = document.createElement('li');
            nouElem.appendChild(document.createTextNode(nouTxt + ' '+ nouVal));
            document.querySelector('div>ol').appendChild(nouElem);
        }
        rank = false;
    }
}

// Función principal
function draw(){
    

    if(gameState==0){
        image(IntroFoto,0,0,600,600);


    }else if(gameState==1){
        
        image(Nivells,0,0,610,610);
        levels();

    } else if(gameState==2){
        image(Joc,0,0,600,600);
        game();
    }else if(gameState==3){
        gameOver();

    }

}

// Detecta si una tecla de moviment a estat apretada
function keyPressed(){
    if(gameState==0){
        if(keyCode == 13){

            document.getElementById('nomUsuari').disabled = true;
            cnt++;
            keyCode = 0;
            gameState++;
        }

    }
    if(gameState==1){
        //Select diff
        if (keyCode==40) {
            if (diffCursor<2){
                diffCursor++;
            } else {
                diffCursor = 0;
                //tNivel = 5000;
            }

        }
        if (keyCode==38) {
            if (diffCursor>0) {
                diffCursor--;
            }
            else {
                diffCursor = 2;
                //tNivel = 5000;
            }
        }
        if(keyCode == 13){
            cnt++;
            if(cnt>2 || rp==true){
                sound();
            }
            if(diffCursor==0){//easy
                tNivel=7000;
                gameState++;

            }else if(diffCursor==1){//medium
                tNivel=3000;
                gameState++;

            }else if(diffCursor==2){//difficult
                tNivel=700;
                gameState++;

            }

        }
    }
    if(gameState==2) {

        if (keyCode == 39) {
            esq = true;
        }
        if (keyCode == 37) {
            dret = true;
        }
    }


}

function keyReleased(){
    if (keyCode == 39) { esq = false;}
    if (keyCode == 37) { dret=false;}


}
/*function menu() {
    //Main menu
    background(255);

    fill(0);
    textSize(36);

    text("PRESS Enter TO START", width / 6, height / 2 + 50);
}*/

function levels() {
    fill(0);
    textSize(36);
    text("SELECT DIFFICULTY:", width/5, height/6);
    text("EASY", width/3, height/6+50);
    text("MEDIUM", width/3, height/6+100);
    text("HARD", width/3, height/6+150);
    if (diffCursor==0)
        text(">", width/3-50, height/6+50);
    if (diffCursor==1)
        text(">", width/3-50, height/6+100);
    if (diffCursor==2)
        text(">", width/3-50, height/6+150);

}

function pauseButton() {
    //fill(255,0,0);
    //rect(275,25,22,38);
    image(music, 260,20,50,50);
}


function game() {
    if(nU != null){
        document.getElementById('nomUsuari').value = nU;
        console.log("NU");
        console.log(nU);


    }
    diffCursor = -1;
    if(replay == null){
        replay = false;
    }
    pauseButton();
    if(estat == false){
        oMal.play();
        j--;
        if(j==0){
            j=15;
            estat = true;
        }

    }
    if(cBona==true){
        oBo.play();
        cBona = false;
    }
    player.drawHuman();
    temps = millis();
    if(millis()>next){
        current.x = random(0,540);
        path.add(current);
        next = millis() + random(1000, tNivel);
    }

    path.update(player);
    path.display();
    if (temps>=310000){
        youdie=false;
        ndeath=0;
        gameState=3;



    }
    let px = 20;
    let pd=120;

    for(let j=1; j<4; j++){
        image(lives, px, 20, 50, 50);
        px+=50;
    }

    if(ndeath==1){

        image(death, pd, 20, 50, 50);

    }
    if(ndeath==2){

        image(death, pd, 20, 50, 50);
        image(death, 70, 20, 50, 50);


    }if(ndeath==3){
        image(death, pd, 20, 50, 50);
        image(death, 70, 20, 50, 50);
        image(death, 20, 20, 50, 50);

    }if(ndeath==4){
        gameState=3;
        youdie = true;
        ndeath=0;
    }


    fill(0);
    textSize(30);
    text("SCORE: "+score, 400, 50);
    if (apretatA || esq){
        player.moveHumanE(5);//el 5 es quan avança
    }
    if (apretatD || dret){
        player.moveHumanD(5);
    }



}
function sound() {
    if (sampleIsPlaying) {

        ele.loop();

        sampleIsPlaying = false;

    } else {
        ele.pause();

        sampleIsPlaying = true;

    }
}
function mouseClicked() {
    if(gameState == 2){
        if(dist(285,44,mouseX,mouseY)<23.2){
            sound();

        }
    }
    else if(gameState == 3){
        
        if(dist(90,520,mouseX,mouseY)<71){
            rank = false;
            ele.play();
            gameState = 2;
            score = 0;
            nrep++;
            replay = true;
            //nomUsuari.value = document.getElementById('nomUsuari').value;




        }else if(dist(515,515,mouseX,mouseY)<71){
            gameState = 0;
            cnt=0;
            score = 0;
            quit = true;
            document.getElementById('nomUsuari').disabled = false;
            document.getElementById('nomUsuari').value = '';

        }
    }
}

function carregat(dades){
    llistaUsuaris=dades;


    ranking();
}
function error(error){
   llistaUsuaris=[];

}
function gameOver() {
    ele.stop();
    var trobat=false;
    var pos = 0;
    textAlign(CENTER);
    textSize(48);
    fill(0);
    if(youdie){
        image(Lose,0,0,600,675);
        text("GAME OVER",width/2,height/6+30);
    }else{
        image(Win,0,0,600,675);
        text("YOU WIN", width / 2, height / 6+30);
    }

    textSize(42);
    text("SCORE: " + score, width / 2, height / 3+5);

    path.reset();
    player.reset();
    if(nomUsuari.value.length>0){



        for(let i=0; i<llistaUsuaris.length; i++){
            if(llistaUsuaris[i].nom == nomUsuari.value){
                trobat = true;
                pos = i;
            }

        }
        if(trobat){
            llistaUsuaris[pos] = {"nom": nomUsuari.value,"punts":score};
            trobat = false;
        }else{
            llistaUsuaris.push({"nom": nomUsuari.value,"punts":score});
        }
        llistaUsuaris.sort(function(a,b){return b.punts-a.punts});
        if(llistaUsuaris.length>9){
            llistaUsuaris.splice(9);
        }

        saveJSON(llistaUsuaris,'dades.json');
        rank = true;

    }

    ranking();
    rank = false;

}