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
let res = 45
const stepsToUpdate = 20;
const waterSpread = 3

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
// plants
let plants = {
    null:{
        growth: 0,
        growsOn: []
    },
    carrot:{
        growth: 2,
        growsOn: ['soil']
    },
    potatoe:{
        growth: 1,
        growsOn: ['soil']
    },
    wheat:{
        growth: 1,
        growsOn: ['soil']
    },
}
let plantList = []
for ( let i in plants ){
    plantList.push(i)
}
// plant constuctor
class plant{
    constructor(type){
        this.type = type == undefined ? 'null' : type ;
        this.age = 0
        this.update = ( ground, hydration, sun, fertilizer, bugs)=>{
            this.age += plants[this.type].growth * hydration * sun * fertilizer * bugs
            if ( this.type != 'null' ){
                if ( plants[this.type].growsOn.indexOf(ground) == -1 | this.age < 0 ){
                    this.type = 'null'
                    this.age = 0
                }
            }
        }
    }
}
// grounds
let grounds = {
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
let groundList = []
for ( let i in grounds ){
    groundList.push(i)
}
// ground constuctor
class ground {
    constructor(type, thisPlant) {
        this.type = type;
        this.hydration = 20;
        this.sun = 1;
        this.fertilizer = 1;
        this.bugs = 1;
        this.plant = thisPlant != undefined ? thisPlant : new plant('null');
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
                        if ( d < waterSpread & this.hydration < 10){
                            this.hydration++
                        }
                    }
                }
            }
            this.plant.update( this.type, this.hydration, this.sun, this.fertilizer, this.bugs);
        };
    }
}
// item class constructor
class item {
    constructor( name, type, count){
        this.name = name
        this.type = type
        this.count = count
        this.use = ( x, y, user)=>{
            switch (this.type) {
                case 'tool':
                    write( `${user.name} used ${this.name} the ${this.type} on ${currentMap[y][x].type} ${currentMap[y][x].name} `)
                    break;
                case 'seed':
                    write( `${user.name} used ${this.name} the ${this.type} on ${currentMap[y][x].type} ${currentMap[y][x].name} `)
                    break;
                case 'consumable':
                    write( `${user.name} used ${this.name} the ${this.type} on ${currentMap[y][x].type} ${currentMap[y][x].name} `)
                    break;
                case 'null':
                    error( "this item can't be used" )
                    break;        
                default:
                    error ('undefined item')
                    break;
            }
        } 
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
            c.fillRect( this.x, this.y, this.w, this.h)
            this.mapSX = Math.floor( ( this.x - this.speed ) / res )
            this.mapSY = Math.floor( ( this.y - this.speed ) / res )
            this.mapEX = Math.floor( ( this.x + this.w ) / res )
            this.mapEY = Math.floor( ( this.y + this.h ) / res )
            this.mapX = Math.floor( ( this.x + this.w/2 ) / res )
            this.mapY = Math.floor( ( this.y + this.h/2 ) / res )
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
        this.pickItem = ( item)=>{
            for ( let i = 0 ; i < this.inv.length ; i++ ){
                if ( this.itemToIndex( item, i) == true){
                    return true
                }
            } return false
        }
        this.moveX = (direction)=>{
            if ( direction > 0){
                if ( this.mapEX < currentMap[0].length ){
                    if ( grounds[currentMap[this.mapSY][this.mapEX].type].walkOn == true ){
                        if ( grounds[currentMap[this.mapEY][this.mapEX].type].walkOn == true ){
                            this.x += this.speed
                        }
                    }
                }
            } else {
                if ( this.mapSX >= 0 ){
                    if ( grounds[currentMap[this.mapSY][this.mapSX].type].walkOn == true ){
                        if ( grounds[currentMap[this.mapEY][this.mapSX].type].walkOn == true ){
                            this.x -= this.speed
                        }
                    }
                }
            }
        }
        this.moveY = (direction)=>{
            if ( direction > 0){
                if ( this.mapEY < currentMap.length ){
                    if ( grounds[currentMap[this.mapEY][this.mapSX].type].walkOn == true ){
                        if ( grounds[currentMap[this.mapEY][this.mapEX].type].walkOn == true ){
                            this.y += this.speed
                        }
                    }
                }
            } else {
                if ( this.mapSY >= 0 ){
                    if ( grounds[currentMap[this.mapSY][this.mapSX].type].walkOn == true ){
                        if ( grounds[currentMap[this.mapSY][this.mapEX].type].walkOn == true ){
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
            ${thisMap[y][x].plant.type}<br>
            ${thisMap[y][x].plant.age}
            </div>`
        }
    }
    // hotbar rendering
    $('hotbar').innerHTML = ''
    for ( let i = 0 ; i < player.inv.length ; i++ ){
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
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'ArrowLeft' ){
        player.inv[player.selected].use( player.mapX-1 , player.mapY, player )
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'ArrowDown' ){
        player.inv[player.selected].use( player.mapX , player.mapY+1, player )
    }
})
window.addEventListener( 'keydown', (key)=>{
    if( key.key == 'ArrowRight' ){
        player.inv[player.selected].use( player.mapX +1, player.mapY, player )
    }
})

// making the player
let player = new entity( 'player', 50, 50, 30, 30)
player.inv = new Array(10).fill( new item('empty', 'null', 0))

// making the farm map
let farmMap = []
for ( let y = 0 ; y < 6 ; y++ ){
    farmMap.push([])
    for ( let x = 0 ; x < 6 ; x++ ){
        if ( x == 0 | x == 3){
            farmMap[y].push( new ground( 'water', new plant('null')) )
        }
        else {
            farmMap[y].push( new ground( 'grass', new plant('null')) )
        }
    }
}
farmMap[3][3] = new ground('wood')

// making the random map
let randomMap = []
for ( let y = 0 ; y < 8 ; y++ ){
    randomMap.push([])
    for ( let x = 0 ; x < 6 ; x++ ){
        randomMap[y].push( new ground( groundList[rdm(groundList.length-1)], new plant(plantList[rdm(plantList.length -1)])) )
    }
}
randomMap[1][1] = new ground( 'wood', new plant())

// starting the game
let currentMap = randomMap
update(currentMap)
render(currentMap)
update(currentMap)
render(currentMap)
loop()