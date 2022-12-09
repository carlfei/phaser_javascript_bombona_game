var config = {
    type: Phaser.AUTO,
  //  width: window.innerWidth,
   // height: window.innerHeight,
   width: 500,
   height: 500,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 1000 }
        }
    }, 
    scene: [{
        preload: preload,
        create: create,
        update: update
    }]
};




var rota_izquier=-2, rota_derec=+2, retroceso_entra=0;

class MyScene extends Phaser.Scene {
    preload (){
        this.load.image('face', 'http://labs.phaser.io/assets/pics/bw-face.png');
    }
    create (data){
        this.face = this.add.image(data.x, data.y, 'face');
    }
}


var game = new Phaser.Game(config);

var jugador, vuelta=0, b;

var arriba,derecha,izquierda, reloj=0;


var ancho_img=52, alto_img=100;



var  posi_x, posi_y;

var ancho_miri=100, alto_miri=100;
var velocidad=500;

		







function preload() {

	 this.load.audio('sound_escopeta', 'assets/sound/escopeta.ogg', {
        instances: 1
    });

	this.load.audio('sound_choque', 'assets/sound/choque.mp3', {
        instances: 1
    });
	 this.load.audio('sound_explosion', 'assets/sound/explosion.mp3', {
        instances: 1
    });
	
	 this.load.audio('sound_gas', 'assets/sound/gas.ogg', {
        instances: 1
    });
	
	
	
	this.load.image('esco', 'assets/escopeta0.png');
	this.load.image('mirilla', 'assets/mirilla.png');
	this.load.image('ground2', 'assets/platform0.png');
	this.load.image('lateral','assets/lateral.png');
	this.load.image('botella', 'assets/botella.png');
	this.load.spritesheet('dud', 'assets/dud.png', { frameWidth: 150, frameHeight: 230 });
	this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 300, frameHeight: 300 });
	this.load.spritesheet('soplete', 'assets/soplete.png', { frameWidth: 310, frameHeight: 250 });
	
}
var letter;
function create() {
	//botella 27 * 100
	

	 
	  letter = this.add.text(50, 0, "").setStyle({
            fontSize: '15px'
        });
		

	this.sound.add('sound_escopeta');
	this.sound.add('sound_choque');
	this.sound.add('sound_explosion');
	sonic = 	this.sound.add('sound_gas');
	sonic.setLoop(true);
	sonic.play();
	
	
	 lateral = this.physics.add.staticGroup();


		lateral.create(0, 250, 'lateral');
		lateral.create(500, 250, 'lateral');
	
	
	
	
	
	
	 posi_x=250; posi_y=250;

    game.config.backgroundColor.setTo(108, 210, 222);

	 f = this.physics.add.sprite(250, 475 , 'esco');

	f.setGravity(0,-1000);	
	f.setCollideWorldBounds(true);
	
	g = this.physics.add.sprite(250, 475 , 'mirilla');
	
	g.setGravity(0,-1000);
	
	g.setCollideWorldBounds(true);
	
	b = this.physics.add.sprite(posi_x, posi_y, 'botella',0);
	
	

	b.setGravity(0,-1000);
	b.body.setVelocity(500,0);
	b.setCollideWorldBounds(true);
	

	 this.anims.create({
            key: 'retro',
            frames: this.anims.generateFrameNumbers('dud', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });
	
	this.anims.create({
            key: 'exp',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
		this.anims.create({
            key: 'sople',
            frames: this.anims.generateFrameNumbers('soplete', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
	
	
	
	
	
		gas = this.physics.add.sprite(posi_x+175, posi_y-150, 'soplete', 0);

	gas.body.setVelocity(500,0);
	gas.setGravity(0,-1000);
	gas.anims.play('sople', true);

	
	
	
	
	
	
	
	this.physics.add.collider(b, lateral);
	
	
	arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	firebutton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	 abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	
}





function update() {



	
	b.follow = false;

	if (b.body.touching.right){
	this.sound.play('sound_choque');﻿﻿﻿﻿

	b.body.setVelocityX(-velocidad);
	b.body.setVelocityY(-b.body.velocity.y);
	gas.body.setVelocityX(-velocidad);
	gas.body.setVelocityY(-b.body.velocity.y);
	

	}
	if (b.body.touching.left){
	this.sound.play('sound_choque');﻿﻿﻿﻿
	 b.body.setVelocityX(velocidad);
	 b.body.setVelocityY(-b.body.velocity.y);
	 gas.body.setVelocityX(velocidad);
	 gas.body.setVelocityY(-b.body.velocity.y);
	}
	if (b.body.touching.down){
	this.sound.play('sound_choque');﻿﻿﻿﻿
	 b.body.setVelocityY(-velocidad);
	 gas.body.setVelocityY(-velocidad);
	}
	if (b.body.touching.up){
	this.sound.play('sound_choque');﻿﻿﻿﻿
	 b.body.setVelocityY(velocidad);
	 gas.body.setVelocityY(velocidad);
	}
	
	
	
	
if(retroceso_entra==1)	{
	


retroceso.setVisible(false);	


f.setVisible(true);

}

	
	
	retroceso_entra=0;
	f.setVelocityX(0);
	g.setVelocityX(0);
	g.setVelocityY(0);

	if(derecha.isDown){

	f.setVelocityX(400);
	g.setVelocityX(400);

	}
	
	if(izquierda.isDown){

	f.setVelocityX(-400);
	g.setVelocityX(-400);

	}
	
	
	if(abajo.isDown){

	g.setVelocityY(400);
	
	rota_derec=rota_derec-2;
	
	
				if(rota_derec<=95){
	//	f.angle = rota_derec;
		rota_izquier=rota_derec;
		}
	}
	
	if(arriba.isDown){

	
	g.setVelocityY(-400);
	rota_izquier=rota_izquier+2;
	
	
				if(rota_izquier<=80){
	//	f.angle = rota_izquier;
		rota_derec=rota_izquier;
		}
	}
	

	if(firebutton.isDown){
	
	this.sound.play('sound_escopeta');﻿﻿﻿﻿
	

		
		f.setVisible(false);
		retroceso = this.physics.add.sprite(f.x, f.y-100, 'dud');
	//retroceso.setVisible(false);
	retroceso.setGravity(0,-1000);
		
		
		
		retroceso.anims.play('retro', true);
		

		if((g.x>=b.x && g.x<=b.x+ancho_img) && (g.y>=b.y && g.y<=alto_img+b.y)){
			b.setVisible(false);
			gas.anims.play('sople', false);

			
			gas.setFrame(6);
			
			gas.setVisible(false);
			
			
				bombona = this.physics.add.sprite(posi_x, posi_y, 'explosion');
		
        bombona.setBounce(0.2);
		

        bombona.setCollideWorldBounds(false);
		bombona.body.allowGravity = false;
		
		bombona.anims.play('exp', true);
		sonic.stop();
		velocidad=0;
		this.sound.play('sound_explosion');﻿﻿﻿﻿	
			
			
			}

		retroceso_entra=1;

		}

}
