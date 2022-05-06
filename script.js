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
let res = 60
const stepsToUpdate = 30;
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
    empty:{
        displayName: 'empty',
    },
    null:{
        displayName: 'empty',
    },
    // tools
    dagger: {
        displayName: 'dagger',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    knife: {
        displayName: 'knife',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    sword: {
        displayName: 'sword',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    mattock: {
        displayName: 'mattock',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    axe: {
        displayName: 'axe',
        type: 'tool',
        places: 'null',
        breaks: [],        
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    pickaxe: {
        displayName: 'pickaxe',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    hoe: {
        displayName: 'hoe',
        type: 'tool',
        places: 'null',
        breaks: [],        
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    sickle: {
        displayName: 'sickle',
        type: 'tool',
        places: 'null',
        breaks: ['crop'],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    scyth: {
        displayName: 'scyth',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    wateringCan: {
        displayName: 'wateringCan',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    blucket: {
        displayName: 'blucket',
        type: 'tool',
        places: 'null',
        breaks: [],
        damage: 5,
        speed: 5,
        durability: 100,
        oneUse: false,
    },
    shears: {
        displayName: 'shears',
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
        displayName: 'potatoe seed',
        type: 'seed',
        places: 'potatoe',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    carrotSeed: {
        displayName: 'carrot seed',
        type: 'seed',
        places: 'carrot',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    onionSeed: {
        displayName: 'onion seed',
        type: 'seed',
        places: 'onion',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    pepperSeed: {
        displayName: 'pepper seed',
        type: 'seed',
        places: 'pepper',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    tomatoSeed: {
        displayName: 'tomato seed',
        type: 'seed',
        places: 'tomato',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    cucumberSeed: {
        displayName: 'cucumber seed',
        type: 'seed',
        places: 'cucumber',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    eggplantSeed: {
        displayName: 'eggplant seed',
        type: 'seed',
        places: 'eggplant',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    strawberrySeed: {
        displayName: 'strawberry seed',
        type: 'seed',
        places: 'strawberry',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    rasberrieSeed: {
        displayName: 'rasberrie seed',
        type: 'seed',
        places: 'rasberrie',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    bananaSeed: {
        displayName: 'banana seed',
        type: 'seed',
        places: 'banana',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    appleSeed: {
        displayName: 'apple seed',
        type: 'seed',
        places: 'apple',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    orangeSeed: {
        displayName: 'orange seed',
        type: 'seed',
        places: 'orange',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    lemonSeed: {
        displayName: 'lemon seed',
        type: 'seed',
        places: 'lemon',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    peachSeed: {
        displayName: 'peach seed',
        type: 'seed',
        places: 'peach',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    riceSeed: {
        displayName: 'rice seed',
        type: 'seed',
        places: 'rice',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    // crops
    potatoe: {
        displayName: 'potatoe',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    carrot: {
        displayName: 'carrot',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    onion: {
        displayName: 'onion',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    pepper: {
        displayName: 'pepper',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    tomato: {
        displayName: 'tomato',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    cucumber: {
        displayName: 'cucumber',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    eggplant: {
        displayName: 'eggplant',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    strawberry: {
        displayName: 'strawberry',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    rasberrie: {
        displayName: 'rasberrie',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    banana: {
        displayName: 'banana',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    apple: {
        displayName: 'apple',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    orange: {
        displayName: 'orange',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    lemon: {
        displayName: 'lemon',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    peach: {
        displayName: 'peach',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
    rice: {
        displayName: 'rice',
        type: 'crop',
        places: 'null',
        breaks: [],
        damage: 0,
        speed: 5,
        durability: 100,
        oneUse: true,
    },
}
let itemList = []
for ( let i in items ){
    itemList.push(i)
}
class item {
    constructor( name, type, count, tier){
        this.name = name
        this.displayName = items[this.name].displayName
        this.type = type
        this.count = count
        this.places = items[this.name].places
        this.damage = items[this.name].damage
        this.speed = items[this.name].speed
        this.durability = items[this.name].durability
        this.breaks = items[this.name].breaks
        this.oneUse = items[this.name].oneUse
        this.use = ( x, y, user )=>{
            switch (this.type) {
                case 'tool':
                    if ( this.breaks.indexOf( currentMap[y][x].object.breaksWith ) != -1 ) {
                        if ( currentMap[y][x].object.age >= currentMap[y][x].object.maturity ) {
                            player.pickItem( new item ( 
                                currentMap[y][x].object.breaksTo[0],
                                currentMap[y][x].object.breaksTo[1],
                                currentMap[y][x].object.breaksTo[2],
                                currentMap[y][x].object.breaksTo[3]
                                 ) )
                            currentMap[y][x].object.place('null')
                        }
                    }
                    if ( this.name == 'hoe' ){
                        if ( currentMap[y][x].type == 'grass' ){
                            currentMap[y][x].type = 'soil'
                        }
                    }
                    break;
                case 'seed':
                    if ( objects[this.places].growsOn.indexOf(currentMap[y][x].type) != -1 ){
                        if ( currentMap[y][x].object.name == 'null' ){
                            currentMap[y][x].object.place( this.places )
                            player.inv[player.inv.indexOf(this)].count--
                        }
                    }
                    break;
                case 'crop':
                    
                    break;
                case 'cell':
                    
                    break;
                case 'consumable':

                    break;
                case 'empty':

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
        maturity: 0,
        growsOn: ['soil', 'water', 'grass', 'sand', 'stone', 'wood'],
        breaksWith: 'none',
        breaksTo: [ 'empty', 'null', 0, 1 ] 
    },
    empty:{
        growth: 0,
        maturity: 0,
        growsOn: ['soil', 'water', 'grass', 'sand', 'stone', 'wood'],
        breaksWith: 'none',
        breaksTo: [ 'empty', 'null', 0, 1 ] 
    },
    potatoe: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'potatoe', 'crop', 1, 1],
    },
    carrot: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'carrot', 'crop', 1, 1],
    },
    onion: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'onion', 'crop', 1, 1],
    },
    pepper: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'pepper', 'crop', 1, 1],
    },
    tomato: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'tomato', 'crop', 1, 1],
    },
    cucumber: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'cucumber', 'crop', 1, 1],
    },
    eggplant: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'eggplant', 'crop', 1, 1],
    },
    strawberry: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'strawberry', 'crop', 1, 1],
    },
    rasberrie: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'rasberrie', 'crop', 1, 1],
    },
    banana: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'banana', 'crop', 1, 1],
    },
    apple: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'apple', 'crop', 1, 1],
    },
    orange: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'orange', 'crop', 1, 1],
    },
    lemon: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'lemon', 'crop', 1, 1],
    },
    peach: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['soil'],
        breaksWith: 'crop',
        breaksTo: [ 'peach', 'crop', 1, 1],
    },
    rice: {
        growth: 0.3,
        maturity: 4,
        growsOn: ['water'],
        breaksWith: 'crop',
        breaksTo: [ 'rice', 'crop', 1, 1]
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
        this.maturity = objects[this.name].maturity
        this.breaksTo = objects[this.name].breaksTo
        this.breaksWith = objects[this.name].breaksWith
        this.texture = `${this.name}-object-${Math.floor(this.age)}.png`
        
        this.update = ( cell, hydration, sun, fertilizer, bugs)=>{
            if ( this.age < this.maturity ){
                this.age += this.growth
            }
            this.texture = `${this.name}-object-${Math.floor(this.age)}.png`
            if ( this.growsOn.indexOf(cell) == -1 | this.age < 0 ){
                this.place('null')
            }
        }
        this.place = (name)=>{
            this.name = name == undefined ? 'null' : name ;
            this.age = 0
            this.inv = []
            this.growth = objects[this.name].growth
            this.growsOn = objects[this.name].growsOn
            this.maturity = objects[this.name].maturity
            this.breaksTo = objects[this.name].breaksTo
            this.breaksWith = objects[this.name].breaksWith
            this.texture = `${this.name}-object-${Math.floor(this.age)}.png`

            this.update = ( cell, hydration, sun, fertilizer, bugs)=>{
                if ( this.age < this.maturity ){
                    this.age += this.growth
                }
                this.texture = `${this.name}-object-${Math.floor(this.age)}.png`
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
    width = res*currentMap.length;
    if ( canvas.height != height | canvas.width != width ){
        canvas.height = height
        canvas.width = width
    }
}

// HTML render function
function render(thisMap){
    container.innerHTML = ''
    for ( let y = 0 ; y < thisMap.length ; y++ ){
        container.innerHTML += `<div class="row" id="row${y}" style="width:${res*thisMap.length}px" >
        </div>`
        for ( let x = 0 ; x < thisMap[y].length ; x++ ){
            $(`row${y}`).innerHTML += `<div class="${thisMap[y][x].type }" id="cell ${y}-${x}" style="width: ${res}px ; height: ${res}px;"></div>`
            $(`cell ${y}-${x}`).innerHTML = `<img class="object" src="./textures/${thisMap[y][x].object.texture}" alt="${thisMap[y][x].object.name} ${Math.floor(thisMap[y][x].object.age)}" />`
        }
    }
    // hotbar rendering
    $('hotbar').innerHTML = ''
    for ( let i = 0 ; i < player.inv.length ; i++ ){
        if ( player.inv[i].durability <= 0 ){
            player.inv[i] = new item( 'empty', 'null', 0, 1)
        }
        if ( player.inv[i].count <= 0 ){
            player.inv[i] = new item( 'empty', 'null', 0, 1)
        }
        if ( player.selected == i ){
            $('hotbar').innerHTML +=`
                <div id="hotbar${i}" class="selected" > ${player.inv[i].displayName + ' ' + player.inv[i].count}</div>
            `
        } else {
            $('hotbar').innerHTML +=`
                <div id="hotbar${i}">${player.inv[i].displayName + ' ' + player.inv[i].count}</div>
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
    if( key.key == 'a' ){
        player.moveX(-1)
    }
    if( key.key == 's' ){
        player.moveY(1)
    }
    if( key.key == 'd' ){
        player.moveX(1)
    }
})

window.addEventListener( 'keydown', (key) => {
    if( key.key == 'ArrowDown' ){
        player.inv[player.selected].use( player.mapX , player.mapY+1, player )
    }
    if( key.key == 'ArrowRight' ){
        player.inv[player.selected].use( player.mapX +1, player.mapY, player )
    }
    if( key.key == 'ArrowLeft' ){
        player.inv[player.selected].use( player.mapX-1 , player.mapY, player )
    }
    if( key.key == 'ArrowUp' ){
        player.inv[player.selected].use( player.mapX , player.mapY-1, player )
    }
    if ( key.key / 1 + 1 > 0 & key.key != ' ' ) {
        if ( key.key == 0){
            player.selected = 9
        } else {
            player.selected = key.key - 1
        }
    }
})

// making the player
let player = new entity( 'player', res*1.5, res*1.5, 0.7, 0.7)
player.inv = new Array(10).fill( new item('empty', 'null', 0, 1))

// making the farm map
let farmMap = []
for ( let y = 0 ; y < 13 ; y++ ){
    farmMap.push([])
    for ( let x = 0 ; x < 13 ; x++ ){
        if ( x == 0 | x == 4){
            farmMap[y].push( new cell( 'water', new object('null')) )
        }
        else if ( y != 2) {
            farmMap[y].push( new cell( 'grass', new object('null')) )
        }
         else {
            farmMap[y].push( new cell( 'soil', new object('null')) )
        }
    }
}
farmMap[2][4] = new cell('wood')

// making the random map
let randomMap = []
for ( let y = 0 ; y < 10 ; y++ ){
    randomMap.push([])
    for ( let x = 0 ; x < 10 ; x++ ){
        randomMap[y].push( new cell(
            cellList[rdm(cellList.length-1)],
            new object(objectList[rdm(objectList.length -1)])) )
        if (rdm(1)) randomMap[y][x] = new cell ( 'soil', new object(objectList[rdm(objectList.length -1)]))
    }
}
randomMap[1][1] = new cell( 'wood', new object())

// starting the game
let currentMap = farmMap
givePlayer( new item('hoe', 'tool', 1, 1) )
givePlayer( new item('sickle', 'tool', 2, 1) )
givePlayer( new item('potatoeSeed', 'seed', 20, 1) )
givePlayer( new item('tomatoSeed', 'seed', 20, 1) )
givePlayer( new item('riceSeed', 'seed', 20, 1) )
update(currentMap)
render(currentMap)
update(currentMap)
render(currentMap)
loop()