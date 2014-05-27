//prepare user input
var processInput = function (input) {
    var userInput = input;
    roboInstructions = [];

  // patterns to filter input
  //you have to include split function that takes into account multiple lines
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
      console.log("command", lines)
      var xy = command.match(patternGridDefinition)[0].split(patternSplitWhitespace);
      var direction = command.match(patternDirection)[0];
      var instruction = command.match(patternInstruction)[0];
      newRoboCommand(xy[0],xy[1],direction,instruction);
    }
    return roboInstructions
  };

  gridCoordinates = lines.shift().match(patternGridDefinition)[0].split(patternSplitWhitespace);

  return [gridCoordinates, roboCreate(lines)]

}


// set up Planet grid constructor
function Planet (width, height) {

  this.width = width;
  this.height = height;
  this.cells = new Array (height * width);
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

Robot.prototype.moveForward = function (direction, position) {
  var oldPosition = {x: position.x, y: position.y};
  var newPosition = {x: position.x, y: position.y};

  if (direction === "N") {newPosition.x ++};
  if (direction === "E") {newPosition.y ++};
  if (direction === "S") {newPosition.x --};
  if (direction === "W") {newPosition.y --};

  if (mars.isInside(newPosition) === false) {
    console.log("lets hope");
    if (mars.valueAt(oldPosition) === "scent") {
      newPosition = oldPosition;
      console.log("we didnt go")
    } else {
      mars.scentAt(oldPosition);
      console.log("we scented", oldPosition)
      this.lost = true;
      return oldPosition;
    }
  }

  return newPosition;
}

Robot.prototype.move = function () {

  for (var i = 0; i < this.instruction.length; i++) {
    // take into account yet defined commands
    if (this.instruction.charAt(i) === 'L') {this.direction = (this.turnLeft(this.direction))};
    if (this.instruction.charAt(i) === 'R') {this.direction = (this.turnRight(this.direction))};
    if (this.instruction.charAt(i) === 'F') {
      this.position = (this.moveForward(this.direction, this.position));
      if (this.lost === true) {
        console.log("Into lostbreaker")
      }
    };
  }
  output.push(this.position.x + " " + this.position.y + " " + this.direction)
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
  randomClick.onclick = function hello (){
    alert('Hello')
  };


  var clearClick = document.getElementById("clear");
  clearClick.onclick = function (){
    document.getElementById("instructions").value = "";
    output = [];
  };
};

// automatically run initate when script loads
initiate();
