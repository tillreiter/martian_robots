function UserInput(input) {
  this.userInput = this.verify(input);
}

UserInput.prototype.verify = function (input){
  var pGridAndCommands = /(\d+\s+\d+\s*\n+)((\d+\s+\d+\s*[NESW]{1}\s*\n+[LRF]+\s*\n*)+)/i;

  var verify = input.match(pGridAndCommands);
  if (!verify) {
    console.log("You're input is not correct my friend");
    return false;
  } else {
    console.log('Input can get processed');
    return verify[0];
  }
};

UserInput.prototype.processInput = function (){
  var pSplitLines = /[\r?\n]+/;
  var pGridDefinition = /\d{1,2}\s+\d{1,2}/;
  var pSplitWhitespace = /\s+/;
  var pDirection = /[NESW]{1}/;
  var pInstruction = /[RLF]+/;

  var lines = splitLines(this.userInput);

  this.roboInstructions = [];
  this.gridCoordinates = lines.shift().match(pGridDefinition)[0].split(pSplitWhitespace);

  function splitLines(string) {
    return string.split(pSplitLines);
  }

  for (var i = 0; i < lines.length; i+=2) {
    var rawCoordinates = lines[i];
    var rawInstruction = lines [i+1];
    var xy = rawCoordinates.match(pGridDefinition)[0].split(pSplitWhitespace);
    var direction = rawCoordinates.match(pDirection)[0];
    var instruction = rawInstruction.match(pInstruction)[0];
    this.newRoboCommand(xy[0],xy[1],direction,instruction);
  }
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

// set up Planet grid constructor
function Planet (gridCoordinates) {

  this.width = parseInt(gridCoordinates[0]) + 1;
  this.height = parseInt(gridCoordinates[1]) + 1;
  // this.cells = new Array ((height + 1) * (width + 1));
  this.cells = new Array (this.height * this.width)
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

  //if initial robot position is not in grid it gets ignored
  if (mars.isInside(this.position)) {
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
    };

    // check if robot wants to move off grid, stop if already scented, otherwise scent
    if (this.lost === true) {
      output.push(this.position.x + " " + this.position.y + " " + this.direction + " " + "LOST")
    } else {
      output.push(this.position.x + " " + this.position.y + " " + this.direction)
    };
  };
};

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
    var command = new UserInput(input);
    if (!command.userInput) {
      alert("this input seems lousy! Did you enter it in the correct format?")
    } else {
      command.processInput()
      console.log("command is",command);
      mars = new Planet (command.gridCoordinates);
      startRobots(command.roboInstructions);
      document.getElementById("output").value = output.join("\n");
    }
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
