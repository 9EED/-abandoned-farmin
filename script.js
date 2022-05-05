// basic functions
function rdm (max){
    return Math.floor(Math.random()*(max +1));
};
function random ( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function rdmAround (x, floor){
    if (floor) return Math.floor( Math.random()* x * 2 - x )
    return Math.random()* x * 2 - x
}
function write (input){
    console.log('%c' +  JSON.stringify(input), 'color: #8BF');
    return void 0;
};
function error (input){
    console.log('%c' + JSON.stringify(input), 'color: #F54;');
    return void 0;
};
function $ (id){
    return document.getElementById(id);
};
function randomColor (){
    return `hsl( ${rdm(360)}, ${random( 20, 70, true)}%, 50%)`;
};

// cheat commands
function setMap(map){
    currentMap = map
    player.x = 100
    player.y = 100
}
function givePlayer(item){
    player.pickItem(item)
}

// variable declarations
let container = $('container');
let width = container.clientHeight;
let height = container.clientHeight;
const playerSpeed = 5
let res = 50
const stepsToUpdate = 20;
const waterSpread = 2.5

// canvas setup
let canvas = $('canvas')
let c = canvas.getContext('2d')
c.fillStyle = '#55b'

// mouse tracker
let mouse = {
    x: 0,
    y: 0,
    z: false
}
window.addEventListener( 'mousemove', ( event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener( 'mousedown', ()=>{
    mouse.z = true;
});
window.addEventListener( 'mouseup', ()=>{
    mouse.z = false;
});

// item class constructor
let items = {
    empty:{},
    null:{},
    // tools
    dagger: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    knife: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    sword: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    mattock: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    axe: {
        type: 'tool',
        places: 'null',
        breaks: [],        
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    pickaxe: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    hoe: {
        type: 'tool',
        places: 'null',
        breaks: [],        
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    sickle: {
        type: 'tool',
        places: 'null',
        breaks: ['crop'],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    scyth: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    wateringCan: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    blucket: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    shears: {
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    //seeds
    potatoeSeed: {
        type: 'seed',
        places: 'potatoe',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    carrotSeed: {
        type: 'seed',
        places: 'carrot',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    onionSeed: {
        type: 'seed',
        places: 'onion',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    pepperSeed: {
        type: 'seed',
        places: 'pepper',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    tomatoSeed: {
        type: 'seed',
        places: 'tomato',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    cucumberSeed: {
        type: 'seed',
        places: 'cucumber',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    eggplantSeed: {
        type: 'seed',
        places: 'eggplant',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    strawberrySeed: {
        type: 'seed',
        places: 'strawberry',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    rasberrieSeed: {
        type: 'seed',
        places: 'rasberrie',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    bananaSeed: {
        type: 'seed',
        places: 'banana',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    appleSeed: {
        type: 'seed',
        places: 'apple',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    orangeSeed: {
        type: 'seed',
        places: 'orange',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    lemonSeed: {
        type: 'seed',
        places: 'lemon',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    peachSeed: {
        type: 'seed',
        places: 'peach',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    riceSeed: {
        type: 'seed',
        places: 'rice',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    // 
    potatoe: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    carrot: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    onion: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    pepper: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    tomato: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    cucumber: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    eggplant: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    strawberry: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    rasberrie: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    banana: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    apple: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    orange: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    lemon: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    peach: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    rice: {
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
}
class item {
    constructor( name, type, count){
        this.name = name
        this.type = type
        this.count = count
        this.damage = items[this.name].damage
        this.speed = items[this.name].speed
        this.durability = items[this.name].durability
        this.breaks = items[this.name].breaks
        this.oneUse = items[this.name].oneUse
        this.use = ( x, y )=>{
            switch (this.type) {
                case 'tool':
                    if ( this.breaks.indexOf( currentMap[y][x].object.breaksWith ) != -1 ) {
                        player.pickItem( new item ( currentMap[y][x].object.breaksTo[0], currentMap[y][x].object.breaksTo[1], currentMap[y][x].object.breaksTo[2] ) )
                        currentMap[y][x].object.place('null')
                    }
                    break;
                case 'seed':
                    currentMap[y][x].object.place( items[this.name].places )
                    break;
                case 'crop':
                
                    break;
                case 'cell':

                    break;
                case 'consumable':

                    break;
                case 'null':
                    break;        
                default:
                    error ('undefined item')
                    break;
            }
        } 
    }
}

// objects
let objects = {
    null:{
        growth: 0,
        growsOn: ['soil', 'water', 'grass', 'sand', 'stone', 'wood'],
        breaksWith: 'none',
        breaksTo: [ 'empty', 'null', 0  ] 
    },
    empty:{
        growth: 0,
        growsOn: ['soil', 'water', 'grass', 'sand', 'stone', 'wood'],
        breaksWith: 'none',
        breaksTo: [ 'empty', 'null', 0  ] 
    },
    potatoe: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'potatoe', 'crop', 1 ] 
    },
    carrot: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'carrot', 'crop', 1 ] 
    },
    onion: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'onion', 'crop', 1 ] 
    },
    pepper: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'pepper', 'crop', 1 ] 
    },
    tomato: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'tomato', 'crop', 1 ] 
    },
    cucumber: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'cucumber', 'crop', 1 ] 
    },
    eggplant: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'eggplant', 'crop', 1 ] 
    },
    strawberry: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'strawberry', 'crop', 1 ] 
    },
    rasberrie: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'rasberrie', 'crop', 1 ] 
    },
    banana: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'banana', 'crop', 1 ] 
    },
    apple: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'apple', 'crop', 1 ] 
    },
    orange: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'orange', 'crop', 1 ] 
    },
    lemon: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'lemon', 'crop', 1 ] 
    },
    peach: {
        growth: 3,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'peach', 'crop', 1 ] 
    },
    rice: {
        growth: 3,
        growsOn: ['water'],
        breaksWith: 'crop',
        breaksTo: [ 'rice', 'crop', 1 ]
    },
}
let objectList = []
for ( let i in objects ){
    objectList.push(i)
}
// object constuctor
class object{
    constructor(name){
        this.name = name == undefined ? 'null' : name ;
        this.age = 0
        this.inv = []
        this.growth = objects[this.name].growth
        this.growsOn = objects[this.name].growsOn
        this.breaksTo = objects[this.name].breaksTo
        this.breaksWith = objects[this.name].breaksWith
        
        this.update = ( cell, hydration, sun, fertilizer, bugs)=>{
            this.age += this.growth * hydration * sun * fertilizer * bugs
            if ( this.growsOn.indexOf(cell) == -1 | this.age < 0 ){
                this.place('null')
            }
        }
        this.place = (name)=>{
            this.name = name
            this.age = 0
            this.inv = []
            this.growth = objects[this.name].growth
            this.growsOn = objects[this.name].growsOn
            this.breaksTo = objects[this.name].breaksTo
            this.breaksWith = objects[this.name].breaksWith

            this.update = ( cell, hydration, sun, fertilizer, bugs)=>{
                this.age += this.growth * hydration * sun * fertilizer * bugs
                if ( this.growsOn.indexOf(cell) == -1 | this.age < 0 ){
                    this.place('null')
                }
            }
        }
    }
}

// cells
let cells = {
    water: {
        walkOn: false
    },
    grass: {
        walkOn: true
    },
    soil: {
        walkOn: true
    },
    stone: {
        walkOn: true
    },
    wood:{
        walkOn: true
    },
    sand:{
        walkOn: true
    }
}
let cellList = []
for ( let i in cells ){
    cellList.push(i)
}

// cell constuctor
class cell {
    constructor(type, thisObject) {
        this.type = type;
        this.hydration = 5;
        this.sun = 1;
        this.fertilizer = 1;
        this.bugs = 1;
        this.object = thisObject != undefined ? thisObject : new object();
        this.update = ( X, Y, thisMap) => {
            this.sun;
            this.bugs;
            if ( this.fertilizer > 1 ){
                this.fertilizer -= 1
            }
            
            if ( this.hydration > -1 ){
                this.hydration -= 1
            }
            
            for ( let y = 0 ; y < thisMap.length ; y++ ){
                for ( let x = 0 ; x < thisMap[y].length ; x++ ){
                    if ( thisMap[y][x].type == 'water' ){
                        let d = Math.sqrt( Math.pow ( X - x , 2 ) + Math.pow ( Y - y , 2 ) )
                        if ( d < waterSpread & this.hydration < 2){
                            this.hydration = 1
                        }
                    }
                }
            }
            this.object.update( this.type, this.hydration, this.sun, this.fertilizer, this.bugs);
        };
    }
}

// entity class
class entity {
    constructor( name, x, y, w, h, texture) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.mapX;
        this.mapY;
        this.mapSX;
        this.mapSY;
        this.mapEX;
        this.mapEY;
        this.w = w;
        this.h = h;
        this.speed = 5
        this.inv = [];
        this.selected = 0;
        this.texture = texture;
        this.render = ()=>{
            c.fillRect( this.x, this.y, this.w*res, this.h*res)
            this.mapSX = Math.floor( ( this.x - this.speed ) / res )
            this.mapSY = Math.floor( ( this.y - this.speed ) / res )
            this.mapEX = Math.floor( this.x / res + this.w )
            this.mapEY = Math.floor(  this.y / res + this.h )
            this.mapX = Math.floor(  this.x / res + this.h / 2)
            this.mapY = Math.floor(  this.y / res + this.h / 2)
            for(let i = 0 ; i < this.inv ; i++){
            }
        }
        this.itemToIndex = ( item, index )=>{
            if ( this.inv[index].type == 'null' ){
                this.inv[index] = item
                return true
            } else if ( this.inv[index].name == item.name & this.inv[index].type == item.type ){
                this.inv[index].count += item.count
                return true
            }
            return false
        }
        this.pickItem = ( item )=>{
            for ( let i = 0 ; i < player.inv.length ; i++ ){
                if ( item.name != player.inv[i].name & player.inv[i].name != 'empty' ){
                    continue
                }
                if ( item.name == player.inv[i].name ){
                    player.inv[i].count += item.count
                    break
                }
                if ( player.inv[i].name == 'empty' ){
                    player.inv[i] = item
                    break
                }
            }
        }
        this.moveX = (direction)=>{
            if ( direction > 0){
                if ( this.mapEX < currentMap[0].length ){
                    if ( cells[currentMap[this.mapSY][this.mapEX].type].walkOn == true ){
                        if ( cells[currentMap[this.mapEY][this.mapEX].type].walkOn == true ){
                            this.x += this.speed
                        }
                    }
                }
            } else {
                if ( this.mapSX >= 0 ){
                    if ( cells[currentMap[this.mapSY][this.mapSX].type].walkOn == true ){
                        if ( cells[currentMap[this.mapEY][this.mapSX].type].walkOn == true ){
                            this.x -= this.speed
                        }
                    }
                }
            }
        }
        this.moveY = (direction)=>{
            if ( direction > 0){
                if ( this.mapEY < currentMap.length ){
                    if ( cells[currentMap[this.mapEY][this.mapSX].type].walkOn == true ){
                        if ( cells[currentMap[this.mapEY][this.mapEX].type].walkOn == true ){
                            this.y += this.speed
                        }
                    }
                }
            } else {
                if ( this.mapSY >= 0 ){
                    if ( cells[currentMap[this.mapSY][this.mapSX].type].walkOn == true ){
                        if ( cells[currentMap[this.mapSY][this.mapEX].type].walkOn == true ){
                            this.y -= this.speed
                        }
                    }
                }
            }
        }
    }
}

// update function
function update(thisMap){    
    for ( let y = 0 ; y < thisMap.length ; y++ ){
        for ( let x = 0 ; x < thisMap[y].length ; x++ ){
            thisMap[y][x].update( x, y, thisMap)
        }
    }
    height = container.clientHeight;
    width = container.clientWidth;
    if ( canvas.height != height | canvas.width != width ){
        canvas.height = height
        canvas.width = width
    }
}

// HTML render function
function render(thisMap){
    container.innerHTML = ''
    for ( let y = 0 ; y < thisMap.length ; y++ ){
        container.innerHTML += `<div class="row" id="row${y}">
        </div>`
        for ( let x = 0 ; x < thisMap[y].length ; x++ ){
            $(`row${y}`).innerHTML += `
            <div class="${thisMap[y][x].type}" id="floor${y}-${x}" style="
            width: ${res}px;
            height: ${res}px;
            ">
            ${thisMap[y][x].object.name}<br>
            ${thisMap[y][x].object.age}
            </div>`
        }
    }
    // hotbar rendering
    $('hotbar').innerHTML = ''
    for ( let i = 0 ; i < player.inv.length ; i++ ){
        if ( player.inv[i].durability <= 0 ){
            player.inv[i] = new item( 'empty', 'null', 0)
        }
        if ( player.inv[i].count <= 0 ){
            player.inv[i] = new item( 'empty', 'null', 0)
        }
        if ( player.selected == i ){
            $('hotbar').innerHTML +=`
                <div id="hotbar${i}" class="selected" > ${player.inv[i].name + ' ' + player.inv[i].count}</div>
            `
        } else {
            $('hotbar').innerHTML +=`
                <div id="hotbar${i}">${player.inv[i].name + ' ' + player.inv[i].count}</div>
            `
        }
    }
    //hotbar functionality
    for ( let i = 0 ; i < player.inv.length ; i++){
        $(`hotbar${i}`).addEventListener( 'click', () => {
            player.selected = i
        })
    }
    return true
}

// cnavas render function
function updateCanvas(){
    c.clearRect( 0, 0, width, height)
    player.render()
}

// game loop
let step = 0;
function loop(){
    updateCanvas()
    step++
    if ( step == stepsToUpdate ){
        step = 0
        update(currentMap)
        render(currentMap)
    }
    requestAnimationFrame(loop)
}

// user input
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'w' ){
        player.moveY(-1)
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'a' ){
        player.moveX(-1)
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 's' ){
        player.moveY(1)
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'd' ){
        player.moveX(1)
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'ArrowUp' ){
        player.inv[player.selected].use( player.mapX , player.mapY-1, player )
        if ( player.inv[player.selected].oneUse == true ) player.inv[player.selected].count--
        else player.inv[player.selected].durability--
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'ArrowLeft' ){
        player.inv[player.selected].use( player.mapX-1 , player.mapY, player )
        if ( player.inv[player.selected].oneUse == true ) player.inv[player.selected].count--
        else player.inv[player.selected].durability--
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'ArrowDown' ){
        player.inv[player.selected].use( player.mapX , player.mapY+1, player )
        if ( player.inv[player.selected].oneUse == true ) player.inv[player.selected].count--
        else player.inv[player.selected].durability--
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'ArrowRight' ){
        player.inv[player.selected].use( player.mapX +1, player.mapY, player )
        if ( player.inv[player.selected].oneUse == true ) player.inv[player.selected].count--
        else player.inv[player.selected].durability--
    }
})

// making the player
let player = new entity( 'player', 50, 50, 0.7, 0.7)
player.inv = new Array(10).fill( new item('empty', 'null', 0))

// making the farm map
let farmMap = []
for ( let y = 0 ; y < 6 ; y++ ){
    farmMap.push([])
    for ( let x = 0 ; x < 6 ; x++ ){
        if ( x == 0 | x == 3){
            farmMap[y].push( new cell( 'water', new object('null')) )
        }
        else {
            farmMap[y].push( new cell( 'soil', new object('null')) )
        }
    }
}
farmMap[3][3] = new cell('wood')

// making the random map
let randomMap = []
for ( let y = 0 ; y < 8 ; y++ ){
    randomMap.push([])
    for ( let x = 0 ; x < 6 ; x++ ){
        randomMap[y].push( new cell( cellList[rdm(cellList.length-1)], new object(objectList[rdm(objectList.length -1)])) )
        if (rdm(1)) randomMap[y][x] = new cell ( 'soil', new object(objectList[rdm(objectList.length -1)]))
    }
}
randomMap[1][1] = new cell( 'wood', new object())

// starting the game
let currentMap = farmMap
givePlayer( new item('sickle', 'tool', 2) )
givePlayer( new item('potatoeSeed', 'seed', 20) )
givePlayer( new item('tomatoSeed', 'seed', 20) )
givePlayer( new item('riceSeed', 'seed', 20) )
update(currentMap)
render(currentMap)
update(currentMap)
render(currentMap)
loop()
