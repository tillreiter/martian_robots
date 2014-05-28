function UserInput(input) {
  this.userInput = this.verify(input);
}

UserInput.prototype.verify = function (input){
  var pGridAndCommands = /(\d+\s+\d+\s*\n+)((\d+\s+\d+\s*[NESW]{1}\s*\n+[LRF]*\s*)+)/i;

  var verify = pGridAndCommands.test(input);
  if (!verify) {
    console.log("You're input is not correct my friend");
    return verify;
  } else {
    return input;
  }
};

UserInput.prototype.processInput = function (){
  this.roboInstructions = [];

  var pSplitLines = /[\r?\n]+/;
  var pGridDefinition = /\d{1,2}\s+\d{1,2}/;
  var pSplitWhitespace = /\s+/;
  var pDirection = /[NESW]{1}/;
  var pInstruction = /[RLF]+/;

  function splitLines(string) {
    return string.split(pSplitLines);
  }

  var lines = splitLines(this.userInput);

  this.gridCoordinates = lines.shift().match(pGridDefinition)[0].split(pSplitWhitespace);

  for (var i = 0; i < lines.length; i+=2) {
    var rawCoordinates = lines[i];
    var rawInstruction = lines [i+1];
    var xy = rawCoordinates.match(pGridDefinition)[0].split(pSplitWhitespace);
    var direction = rawCoordinates.match(pDirection)[0];
    var instruction = rawInstruction.match(pInstruction)[0];
    this.newRoboCommand(xy[0],xy[1],direction,instruction);
  }
  return this;
};

UserInput.prototype.newRoboCommand = function newRoboCommand (x,y,direction,instruction) {

  var command = {
    x: x,
    y: y,
    direction: direction,
    instruction: instruction
  };
  this.roboInstructions.push(command);
};








//prepare user input
var processInput = function (input) {
    var userInput = input;
    roboInstructions = [];

  // ps to filter input
  //you have to include split function that takes into account multiple lines, only one digit in the beginning etc.
  //how can i throw nicer errors

  var pGridAndCommands = /(\d+\s+\d+\s+)((\d+\s+\d+\s*[NESW]{1}\s*[LRF]*\s*)+)/i;
  var pSplitLines = /[\r?\n]+/;
  var pGridDefinition = /\d{1,2}\s+\d{1,2}/;
  var pRobotPosition = /\d{1,2}s+\d{1,2}s+[NESW]s+/;
  var pSplitWhitespace = /\s+/;
  var pDirection = /[NESW]{1}/;
  // additional commands need to be added into pInstruction. Robot.move accepts any string value
  var pInstruction = /[RLF]+/

  var lines = splitLines(userInput);

  var verifyInput = function (){
    var verify = pGridAndCommands.test(userInput)
    if (!verify) {
      console.log("shit get out of here");
      alert("Not correct input");
    } else {
      console.log("processing userInput")
    }
  };

  verifyInput()

  // split input lines
  function splitLines (string) {
    return string.split(pSplitLines);
  };

  function newRoboCommand (x,y,direction,instruction) {
    var command = {
      x: x,
      y: y,
      direction: direction,
      instruction: instruction
    };
    roboInstructions.push(command);
  }

  function roboCreate (lines){
    for (var i = 0; i < lines.length; i++) {
      var command = lines[i];
      console.log("command", lines)
      var xy = command.match(pGridDefinition)[0].split(pSplitWhitespace);
      var direction = command.match(pDirection)[0];
      var instruction = command.match(pInstruction)[0];
      newRoboCommand(xy[0],xy[1],direction,instruction);
    }
    return roboInstructions
  };

  gridCoordinates = lines.shift().match(pGridDefinition)[0].split(pSplitWhitespace);

  return [gridCoordinates, roboCreate(lines)]

}


// set up Planet grid constructor
function Planet (width, height) {

  this.width = parseInt(width) + 1;
  this.height = parseInt(height) + 1;
  // this.cells = new Array ((height + 1) * (width + 1));
  this.cells = new Array (height * width)
};

Planet.prototype.valueAt = function (point) {
  return this.cells[point.y * this.width + point.x];
}

Planet.prototype.scentAt = function (point) {
  this.cells[point.y * this.width + point.x] = "scent";
}

Planet.prototype.isInside = function (point) {
  return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
}


function Robot (x, y, direction, instruction) {
  directions = ["N", "E", "S", "W"];

  this.position = {
        "x":x,
        "y":y,
  };
  this.direction = direction;
  this.instruction = instruction;
  this.lost = false;
}

Robot.prototype.turnLeft = function (direction) {
  var currentDir = directions.indexOf(direction);
  if(currentDir === 0){currentDir = 4};
  return directions[currentDir - 1];
}

Robot.prototype.turnRight = function (direction) {
  var currentDir = directions.indexOf(direction);
  if(currentDir === 3){currentDir = -1};
  return directions[currentDir + 1];
}

Robot.prototype.moveForward = function () {
  var oldPosition = {x: this.position.x, y: this.position.y};
  var newPosition = {x: this.position.x, y: this.position.y};

  if (this.direction === "N") {this.position.y ++};
  if (this.direction === "E") {this.position.x ++};
  if (this.direction === "S") {this.position.y --};
  if (this.direction === "W") {this.position.x --};

  if (mars.isInside(this.position) === false) {
    console.log("lets hope");
    if (mars.valueAt(oldPosition) === "scent") {
      this.position = oldPosition;
      console.log("we didnt go")
    } else {
      mars.scentAt(oldPosition);
      console.log("we scented", oldPosition)
      this.position = oldPosition;
      this.lost = true;
    }
  }
}

Robot.prototype.move = function () {

  if () {}

  for (var i = 0; i < this.instruction.length; i++) {
    // take into account yet defined commands
    if (this.instruction.charAt(i) === 'L') {this.direction = (this.turnLeft(this.direction))};
    if (this.instruction.charAt(i) === 'R') {this.direction = (this.turnRight(this.direction))};
    if (this.instruction.charAt(i) === 'F') {
      this.moveForward();
      if (this.lost === true) {
        break;
      }
    };
  }
  if (this.lost === true) {
    output.push(this.position.x + " " + this.position.y + " " + this.direction + " " + "LOST")
  } else {
    output.push(this.position.x + " " + this.position.y + " " + this.direction)
  }
}

// set up buttons and define functions to run on click
initiate = function () {

  function startRobots (commands) {
    output = [];
    for (var i = 0; i < commands.length; i++) {
      current = commands[i];
      robot = new Robot (current.x, current.y, current.direction, current.instruction);
      robot.move();
    }
  }

  var goClick = document.getElementById("go");
  goClick.onclick = function run(){
    var input = document.getElementById("instructions").value;
    console.log("raw input is",input);
    commands = processInput(input);
    console.log("commands are",commands);
    mars = new Planet (commands[0][0],commands[0][1]);
    startRobots(commands[1]);
    document.getElementById("output").value = output.join("\n");
  };

  var randomClick = document.getElementById("random");
  randomClick.onclick = function (){
    alert('Hello')
  };


  var clearClick = document.getElementById("clear");
  clearClick.onclick = function (){
    document.getElementById("instructions").value = "";
    output = [];
    mars = {};
  };
};

// automatically run initate when script loads
initiate();
