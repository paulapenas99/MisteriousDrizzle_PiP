
function Human(x, y){

    this.posX = x;
    this.posY = y;



    this.animacio = createSprite(this.posX, this.posY);
    this.myAnimation = this.animacio.addAnimation("eyes","data/Personatge-0.png","data/Personatge-0.png","data/Personatge-0.png","data/Personatge-1.png","data/Personatge-1.png");
    this.animacio.addAnimation("hit","data/Personatge-2.png","data/Personatge-2.png");
    this.myAnimation.offY=18;
    this.animacio.scale = .35;
    this.drawHuman=function(){
        if(j>=15){
            this.animacio.changeAnimation("eyes");
        }else{
            player.hits();
            estat = false;
        }

        drawSprites();
    };

    this.moveHumanE=function(x){
        if (this.posX < 550){
            this.posX += x;
            this.animacio.position.x = this.posX;
        }

    };
    this.moveHumanD=function(x){
        if (this.posX > 50){
            this.posX -= x;
            this.animacio.position.x = this.posX;
        }
    };
    this.hits=function () {

            this.animacio.changeAnimation("hit");


    };
    this.reset = function () {
        estat = true;
    };

    this.comprovaColisio = function(mx, my){
        
      if (my + 110 >= this.animacio.position.y && my <= this.animacio.position.y) {
        if (mx <= this.animacio.position.x+50 && mx + 80 >= this.animacio.position.x){
            return true;
        } 
      } 
      return false;
        
    }

};

class Path {
    constructor() {
        this.particles = [];

        this.objt=int(random(0,movers.length));

    }
    reset(){
        this.particles = [];

    }
    add(position) {

        this.particles.push(new Particle(position,this.objt));

    }


    update(player) {

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(player);
        }

    }


    display() {

        for (let i = this.particles.length - 1; i >= 0; i--) {

            if (this.particles[i].lifespan <= 0) {
                this.particles.splice(i, 1);

            } else {
                this.particles[i].display();
            }
        }

    }
}


class Particle {
    constructor(position,objt) {
        objt = int(random(0,movers.length));

        this.position = createVector(position.x, position.y);

        this.lifespan = 1;
        this.objt = objt;

    }

    update(player) {

        this.position.y+=3;

        if(this.objt>=5){
            if (player.comprovaColisio(this.position.x, this.position.y)) {

                estat = false;
                this.lifespan=0;

                ndeath++;
                player.posX=width/2;
                player.animacio.position.x=width/2;
                if (ndeath!=4){
                    score=0;
                }

            }
        }else{
            if (player.comprovaColisio(this.position.x, this.position.y)) {
                cBona = true;
                this.lifespan=0;
                score+=5;
            }
            if(this.position.y>600){
                this.lifespan = 0;
                score-=3;
            }
        }


        if(score <= -10){
            ndeath++;
            player.posX=width/2;
            player.animacio.position.x=width/2;
            score=0;

        }


    }


    display() {

        image(movers[this.objt],this.position.x,this.position.y,width/15,height/15);

    }
}