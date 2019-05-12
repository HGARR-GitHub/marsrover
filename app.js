/*



*/


const maxBoardX = 9  //from 0 to 9
const maxBoardY = 9
const imageDir = "images/"
const maxMoves = 15
const listOfMoves = ["l","l","f","f","f","r","r","b","b","b"]
let rovers = []
let stones = []
let marsobjects = []

let counter = 0

document.onload = main


function main(){
  
  
  let next = ""
  let counter = 0

  //Initializing marsrovers and push them in the marsobject array.
  let rover1 = new MarsRover()
  rover1.id = "rover1"
  rover1.direction = "N"
  rover1.currentY = rover1.currentX = rover1.prevX = rover1.prevY = 3
  rover1.img = "url('" + imageDir + "rover.svg')"
  marsobjects.push(rover1)

  
  let rover2= new MarsRover()
  rover2.id = "rover2"
  rover2.direction = "N"
  rover2.currentY = rover2.currentX = rover2.prevX = rover2.prevY = 7
  rover2.img = "url('" + imageDir + "rover.svg')"
  marsobjects.push(rover2)

  let rover3= new MarsRover()
  rover3.id = "rover3"
  rover3.direction = "E"
  rover3.currentY = rover3.currentX = rover3.prevX = rover3.prevY = 5
  rover3.img = "url('" + imageDir + "rover2.png')"
  marsobjects.push(rover3)


  let rover4= new MarsRover()
  rover4.id = "rover4"
  rover4.direction = "E"
  rover4.currentY = rover4.currentX = rover4.prevX = rover4.prevY = 9
  rover4.img = "url('" + imageDir + "rover2.png')"
  marsobjects.push(rover4)
  

  //Initializing the rocks and puch them in the marsobject array.
  let rock1 = new MarsRock()
  rock1.currentY = 3
  rock1.currentX = 4
  marsobjects.push(rock1)

  let rock2 = new MarsRock()
  rock2.currentY = 4
  rock2.currentX = 9
  marsobjects.push(rock2)

  let rock3 = new MarsRock()
  rock3.currentY = 6
  rock3.currentX = 4
  marsobjects.push(rock3)

  let rock4 = new MarsRock()
  rock4.currentY = 9
  rock4.currentX = 5
  marsobjects.push(rock4)

  initBoard()

  moveRovers()
  
  //displayTravelLog()
}

function initBoard(){

  //show all rocks
  displayRocksBoard()

  //show all rovers in begin position
  displayAllRoversBoard()

}

function displayRocksBoard(){

  let currentElemId = ""
  let currentElem = ""
  const rocks = marsobjects.filter(marsobject => marsobject.type == "rock")
  
  //show all rocks in the corresponding elements
  for (let i = 0; i < rocks.length; i++){  
    currentElemId = "b" + rocks[i].currentY + "-" + rocks[i].currentX
    currentElem = document.getElementById(currentElemId)
    currentElem.style.backgroundImage = rocks[i].img
  }
    
}

function displayAllRoversBoard(){
  
  //Show all rovers on the board.
  const rovers = marsobjects.filter(marsobject => marsobject.type == "marsrover")
 

  for (let i = 0; i < rovers.length; i++){
    
    let currentElemId = "b" + rovers[i].currentY + "-" + rovers[i].currentX
    let prevElemId = "b" + rovers[i].prevY + "-" + rovers[i].prevX

    let currentElem = document.getElementById(currentElemId)
    let prevElem = document.getElementById(prevElemId)

    prevElem.style.backgroundImage = "none"
    currentElem.style.backgroundImage = rovers[i].img
  
  }

}

function moveRoverBoard(rover){

  let currentElemId = "b" + rover.currentY + "-" + rover.currentX
  let prevElemId = "b" + rover.prevY + "-" + rover.prevX

  let currentElem = document.getElementById(currentElemId)
  let prevElem = document.getElementById(prevElemId)

  prevElem.style.backgroundImage = "none"
  currentElem.style.backgroundImage = rover.img

}


function displayTravelLog(){
  
  //display the travel logs that are stored in the marsrover objects.
  let x = 0
  const rovers = marsobjects.filter(marsobject => marsobject.type == "marsrover")

  for (let i = 0; i < rovers.length; i++){
    for (x = 0; x < rovers[i].travelLog.length;x++){
      console.log(rovers[i].travelLog[x])
    }
  }
  
}

function saveMoveIntravelLog(rover){
  //the push does not work correct . It only adds the first row
  //maybe the construction array.array.push is not correct??? But it doesnt give an error either?
  let strLog = rover.id + " / " + "Move: " + rover.nextMove
  + " / " + "Direction: " + rover.direction
  + " / " + "Previous Pos (Y,X): (" + rover.prevY + " , " + rover.prevX + ")"
  + " / " + "Current Pos (Y,X): (" + rover.currentY + " , " + rover.currentX + ")"
  + " / " + "Result: " + rover.alertCollision

  rover.travelLog.push(strLog)
  
  //workaround to show the log in the console.
  console.log(strLog)
}


function moveRovers(){

  
  let nextMove = ""
  let tlog = []

  for (let i = 0; i < marsobjects.length; i++){
    
    if (marsobjects[i].type == "marsrover"){
      //select a random move from a list of moves
      nextMove = listOfMoves[(Math.floor(Math.random() * listOfMoves.length))]
      nextMove = nextMove.toUpperCase()
      marsobjects[i].nextMove = nextMove
       
      marsobjects[i].EngineOn()

      marsobjects[i].alertCollision = "No Collision"
      let prevX = marsobjects[i].prevX
      let prevY = marsobjects[i].prevY
      let posX = marsobjects[i].currentX
      let posY = marsobjects[i].currentY

      switch (nextMove){
        case "R":
          marsobjects[i].changeDirection("R")
          break
        case "L":
          marsobjects[i].changeDirection("L")
          break
        case "F":
          marsobjects[i].move("F")
          break
        case "B":
          marsobjects[i].move("B")
          break
      }

      if (nextMove == "F" || nextMove == "B"){
        if (checkcollision(marsobjects[i])){
          //if there is a collision then set the coordinates back to the previous current positions.
          marsobjects[i].currentX = posX
          marsobjects[i].currentY = posY
          marsobjects[i].prevX = prevX
          marsobjects[i].crevY = prevY
        } 
      }
      moveRoverBoard(marsobjects[i])
      marsobjects[i].EngineOf()
      saveMoveIntravelLog(marsobjects[i])
       
    }
  }


  //wait one second before the next move for every rover object is executed.
  counter++
  if (counter < maxMoves){
    setTimeout(function(){moveRovers()},1000)
  }

}

function checkcollision(rover){
  //here we check if the rover has a collision with:
  //1. the borders  2. rocks  3.other rovers


  //1. Check for Border collision
  if (rover.currentX < 0 || rover.currentX > maxBoardX){
    rover.alertCollision = "X position out of boundery!"
    return true
  }

  if (rover.currentY < 0 || rover.currentY > maxBoardY){
    rover.alertCollision = "Y position out of boundery!"
    return true
  }


  //2. Check for an object (Rock or Another rover)
  for (let i = 0; i < marsobjects.length; i++){
    //only check the objects that are not equal to the rover that is moving.
    if (rover.id != marsobjects[i].id){
      if (rover.currentY == marsobjects[i].currentY && rover.currentX == marsobjects[i].currentX){
        rover.alertCollision = "A " + marsobjects[i].type + " is blocking!"
        return true  
      }
    }

  }

  return false

}



function MarsRock(){
  this.type = "rock",
  this.currentY = 0,
  this.currentX = 0,
  this.img = "url('" + imageDir + "rock.png')"
}

function MarsRover(){
  //class object
  this.type = "marsrover",
  this.id = "",
  this.img = "",
  this.engineStarted = false,
  this.direction = "N",
  this.travelLog = [],
  this.nextMove="",
  this.alertCollision = "",

  this.EngineOn = function () {
    this.engineStarted = true;
  },

  this.EngineOf = function () {
    this.engineStarted = false
  },

  this.changeDirection = function (steer){
    
    //input is (L)eft and (R)ight
    //we cycle through the array to determine the direction
    //For example: Initial Direction = (N)orth. If input is (L)eft then
    //array index position goes -1 = (W)est. If input is (R)ight then
    //array index goes +1 = (E)ast. 

    let possibleDirections = ["N","E","S","W"]
    const maxIndex = possibleDirections.length-1
    let currentIndex = possibleDirections.indexOf(this.direction)
    
    
    if (this.engineStarted){
      
      switch (steer){
        case "L":
          newIndex = currentIndex - 1
          break
        case "R":
          newIndex = currentIndex + 1
          break
      }

      //correct if newIndex passes max or min. So if direction = "N" (index 0) and we 
      //turn Left then index goes to index -1 then it should change to 
      //max index = 3 meaning direction "W"
      if (newIndex<0){
        newIndex = maxIndex
      }
      else if (newIndex>maxIndex){
        newIndex = 0
      }

      //set the new direction
      this.direction = possibleDirections[newIndex]
      this.alertCollision = "Direction changed"

    }

  },
  
  this.move = function(goMove){
    
    //goDirection = (F)orward or (B)ackwards
    
    this.prevY = this.currentY
    this.prevX = this.currentX 

    switch (this.direction){
      case "N":
        if (goMove == "F"){
          this.currentY = this.currentY-1
        } else if (goMove == "B"){
          this.currentY = this.currentY+1
        }
      break
  
      case "E":
        if (goMove == "F"){
          this.currentX = this.currentX+1
        } else if (goMove == "B"){
          this.currentX = this.currentX-1
        }
      break
  
      case "S":
      if (goMove == "F"){
        this.currentY = this.currentY+1
      } else if (goMove == "B"){
        this.currentY = this.currentY-1
      }
      break
  
      case "W":
        if (goMove == "F"){
          this.currentX = this.currentX-1
        } else if (goMove == "B"){
          this.currentX = this.currentX+1
        }
      break
    }


  }

}
