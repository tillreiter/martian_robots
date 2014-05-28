// UserInput constructor to check input and clean it up for further processing
function UserInput(input) {
  this.userInput = this.verify(input);
  this.roboInstructions = [];

};

// if correct commands are entered pull them out and ignore the rest; wrong input returns false
UserInput.prototype.verify = function (input){

  // regex to filter out entire command, if new instructions get added to program add to [LRF] in pGridAndCommands and adjust Robot prototype accordingly
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

// deconstruct verified input
UserInput.prototype.processInput = function (){
  var pSplitLines = /[\r?\n]+/;
  var pGridDefinition = /\d{1,2}\s+\d{1,2}/;
  var pSplitWhitespace = /\s+/;
  var pDirection = /[NESW]{1}/;
  var pInstruction = /[RLF]+/;

  var lines = splitLines(this.userInput);

  // first line is always grid definition and gets shifted from lines var
  this.gridCoordinates = lines.shift().match(pGridDefinition)[0].split(pSplitWhitespace);

  function splitLines(string) {
    return string.split(pSplitLines);
  }

  // iterate over raw robot instruction; 2 elements form one instruction
  for (var i = 0; i < lines.length; i+=2) {
    var rawCoordinates = lines[i];
    var rawInstruction = lines [i+1];
    var xy = rawCoordinates.match(pGridDefinition)[0].split(pSplitWhitespace);
    var direction = rawCoordinates.match(pDirection)[0];
    var instruction = rawInstruction.match(pInstruction)[0];
    this.newRoboCommand(xy[0],xy[1],direction,instruction);
  }
};

// build roboInstructions object and push it to instructions array
// where should I verify grid not bigger than 50?
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

  // add 1 to width and height so smallest possible grid has 4 cells when entered 0,0 in first row
  this.width = parseInt(gridCoordinates[0]) + 1;
  this.height = parseInt(gridCoordinates[1]) + 1;

  // create cells array to push sented cells information
  this.cells = new Array (this.height * this.width)
};

// check if value is scented
Planet.prototype.valueAt = function (point) {
  return this.cells[point.y * this.width + point.x];
}

// scent cell
Planet.prototype.scentAt = function (point) {
  this.cells[point.y * this.width + point.x] = "scent";
}

// check if cell is inside
Planet.prototype.isInside = function (point) {
  return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
}


// Robot constructor to build single robots
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

// execute instruction string
Robot.prototype.move = function () {

  // if initial robot position is not in grid it gets ignored
  if (mars.isInside(this.position)) {
    for (var i = 0; i < this.instruction.length; i++) {

      // take into account yet defined instruction - add more instructions here
      if (this.instruction.charAt(i) === 'L') {this.direction = (this.turnLeft(this.direction))};
      if (this.instruction.charAt(i) === 'R') {this.direction = (this.turnRight(this.direction))};
      if (this.instruction.charAt(i) === 'F') {
        this.moveForward();

        // break out of iterating when robot is lost
        if (this.lost === true) {
          break;
        }
      };
    };

    // push result of move operation to output
    if (this.lost === true) {
      output.push(this.position.x + " " + this.position.y + " " + this.direction + " " + "LOST")
    } else {
      output.push(this.position.x + " " + this.position.y + " " + this.direction)
    };
  };
};

// switch to before element in directions array
Robot.prototype.turnLeft = function (direction) {
  var currentDir = directions.indexOf(direction);
  if(currentDir === 0){currentDir = 4};
  return directions[currentDir - 1];
}

// switch to next element in directions array
Robot.prototype.turnRight = function (direction) {
  var currentDir = directions.indexOf(direction);
  if(currentDir === 3){currentDir = -1};
  return directions[currentDir + 1];
}

// move robot one cell in current direction
Robot.prototype.moveForward = function () {
  var oldPosition = {x: this.position.x, y: this.position.y};

  if (this.direction === "N") {this.position.y ++};
  if (this.direction === "E") {this.position.x ++};
  if (this.direction === "S") {this.position.y --};
  if (this.direction === "W") {this.position.x --};

  // check if new position is within grid
  if (mars.isInside(this.position) === false) {

    // if not and oldPosition scent ignore
    if (mars.valueAt(oldPosition) === "scent") {
      this.position = oldPosition;
    }

    // if yes scent cell and mark lost
    else {
      mars.scentAt(oldPosition);
      this.position = oldPosition;
      this.lost = true;
    }
  }
}


// initiate DOM with button functions
initiate = function () {

  // iterate over robot instructions
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
      command.processInput();

      // lay out current grid
      mars = new Planet (command.gridCoordinates);

      // process all user instructions
      startRobots(command.roboInstructions);
      document.getElementById("output").value = output.join("\n");
    }
  };

  var randomClick = document.getElementById("random");
  randomClick.onclick = function (){
    alert('Hello')
  };

  // reset (global) variables
  var clearClick = document.getElementById("clear");
  clearClick.onclick = function (){
    document.getElementById("instructions").value = "";
    output = [];
    mars = {};
  };
};

// automatically run initate when script loads
initiate();
