//prepare user input
var processInput = function (input) {
    var userInput = input;
    roboInstructions = [];

  // patterns to filter input
  var patternSplitLines = /[\r?\n]+/;
  var patternGridDefinition = /\d{1,2}\s+\d{1,2}/;
  var patternRobotPosition = /\d{1,2}s+\d{1,2}s+[NESW]s+/;
  var patternRobotInstruction = /w+/;
  var patternSplitWhitespace = /\s+/;
  var patternDirection = /[NESW]{1}/;
  // additional commands need to be added into patternInstruction. Robot.move accepts any string value
  var patternInstruction = /[RLF]+/

  var lines = splitLines(userInput);

  // split input lines
  function splitLines (string) {
    return string.split(patternSplitLines);
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
      var xy = command.match(patternGridDefinition)[0].split(patternSplitWhitespace);
      var direction = command.match(patternDirection)[0];
      var instruction = command.match(patternInstruction)[0];
      newRoboCommand(xy[0],xy[1],direction,instruction);
    }
    return roboInstructions
  };
  console.log(lines);

  gridCoordinates = lines.shift().match(patternGridDefinition)[0].split(patternSplitWhitespace);

  return [gridCoordinates, roboCreate(lines)]
}


// set up Planet grid constructor
function Planet (width, height) {

  this.height = height;
  this.width = width;
  this.cells = new Array (height * width);
};

Planet.prototype.valueAt = function (point) {
  return this.cells[point.y * this.width + point.x];
}

Planet.prototype.setValueAt = function (point, value) {
  this.cells[point.y * this.width + point.x] = value;
}

Planet.prototype.isInside = function (point) {
  return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
}


function Robot (x, y, direction, instruction) {
  directions = ["N", "E", "S", "W"];

  this.position = {
        "x":x,
        "y":y
  };
  this.direction = direction;
  this.instruction = instruction;
}

Robot.prototype.turnLeft = function (direction) {
  var currentDir = directions.indexOf(direction);
  if(currentDir === 0){currentDir = 4};
  return directions[currentDir - 1];
}

Robot.prototype.turnRight = function (direction) {
  console.log("Hello")
  var currentDir = directions.indexOf(direction);
  if(currentDir === 3){currentDir = -1};
  return directions[currentDir + 1];
}

Robot.prototype.moveForward = function (direction, position) {
  var newPosition = position;

  if (direction === "N") {newPosition.x += 1};
  if (direction === "E") {newPosition.y += 1};
  if (direction === "S") {newPosition.x -= 1};
  if (direction === "W") {newPosition.y -= 1};

/*  if (isInside(newPosition) === false) {
    if (valueAt(position) === "Scent") {
      newPosition = position + " LOST";
    } else {
      setValueAt(position, "Scent")
    }
  }*/

  return newPosition;
}

Robot.prototype.move = function (instr_arr) {

  for (var i = 0; i < instr_arr.length; i++) {
    // take into account yet defined commands
    if (instr_arr[i] === 'L') {this.direction = (this.turnLeft(this.direction))};
    if (instr_arr[i] === 'R') {this.direction = (this.turnRight(this.direction))};
    if (instr_arr[i] === 'F') {this.position = (this.moveForward(this.direction,this.position))};
  }
}

// set up buttons and define functions to run on click
initiate = function () {

  function startRobots (commands) {
    for (var i = 0; i < commands.length; i++) {
      current = commands[i];
      robot = new Robot (current.x, current.y, current.direction, current.instruction)
    }
  }

  var goClick = document.getElementById("go");
  goClick.onclick = function run(){
    var input = document.getElementById("instructions").value;
    var commands = processInput(input);
    var mars = new Planet (commands[0][0],commands[0][1]);

    console.log("this is mars", mars);
    console.log("this is mars", commands);
    document.getElementById("output").value = input;
  };

  var randomClick = document.getElementById("random");
  randomClick.onclick = function hello (){
    alert('Hello')
  };


  var clearClick = document.getElementById("clear");
  clearClick.onclick = function (){
    document.getElementById("instructions").value = "";
  };
};

// automatically run initate when script loads
initiate();
