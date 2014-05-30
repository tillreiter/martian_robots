describe("The user input", function (){

  jasmine.getFixtures().fixturesPath = './';
  loadFixtures('index2.html');

  var message_2 = "typo 5 3\n 1 1 1 E\n RFRFR234FRF";

  it("gets imported when button clicked from the textarea", function (){
  var message_1 = "5 3\n1 1 E\nRFRFRFRF";
      spyEvent = spyOnEvent('#go', 'click');
      $('#instructions').val(message_1);
      $('#go').trigger( "click" );
      initiate();
      // var command = new UserInput(input);

      expect('click').toHaveBeenTriggeredOn('#go');
      expect(spyEvent).toHaveBeenTriggered();
      expect(command.userInput).toBe("5 3\n1 1 E\nRFRFRFRF");
  });

  it("gets only processed if it fits defined input format", function (){

  });

  it("first line gets processed as grid coordinates", function (){

  });

  describe("following lines are each two line robot instructions", function (){

    it("whose first line gets processed as two grid integers and a direction", function (){

    });

    it("whose second line gets processed as a string of instruction letters", function (){

    });
  });
});

describe("The planet", function() {

  var mars = new Planet ([19, 24]);

  it("gets modeled with a 2-d grid",function() {
    expect(Object.prototype.toString.call(mars.cells)).toBe('[object Array]');
    expect(mars.cells.length).toEqual(500);
  });

  it ("constructor only accepts integer values", function (){

  });

  it("has a maximumum grid height and width of each 50", function () {
    expect(Planet.bind(null, 111, 12)).toThrow(new RangeError('Only integers between 0 and 49'));
    expect(Planet.bind(null, 3, 120)).toThrow(new RangeError('Only integers between 0 and 49'));

  });

  it ("has a minimum grid height and width of each 1", function () {
    expect(Planet.bind(null, 0, 1)).toThrow(new RangeError('Only integers between 0 and 50'));
    expect(Planet.bind(null, 111, 0)).toThrow(new RangeError('Only integers between 0 and 50'));
    expect(Planet.bind(null, -23, 0)).toThrow(new RangeError('Only integers between 0 and 50'));
  });
});

describe("A robot", function () {

  describe("has a position input", function (){

    it("that consists of a grid coordinate and a direction", function (){

    });

    it("that lays within the defined grid (planet)", function (){

    });
  });

  describe("has an instruction input", function (){

    it("that is a string of less than 100 letters", function (){

    });

    it("that turns the robot left with 'L' on the same cell", function (){

    });

    it("that turns the robot right with 'R' on the same cell", function (){

    });

    it("that moves the robot forward in the current direction one cell with 'F'", function (){

    });

    it("that throws an error if the instruction is not defined yet", function () {

    });
  });

  describe("moves across the grid", function () {

    it("according to its instructions starting from its position input", function () {

    });

    it("leaving a 'scent' at the last grid point when it moves off the grid", function () {

    });

    it("ignoring any instruction that would move it from the grid when it stands on a 'scented' grid point", function () {

    });
  });
});

describe("The program's output", function () {

  it("tells the position of each robot per line in the format like position input", function () {

  });

  it("adds 'LOST' to the position if the robot moved off the grid", function () {

  });
});

     var MSG = "Hello World!";

     function hideMessage() {
       $( "#pMsg" ).html("");
     }

     function showMessage() {
       $( "#pMsg" ).html(MSG);
     }

     function setUpHTMLFixture() {
       setFixtures('<form id="testForm" action="">'
                  +'  <h1>Test Form</h1>'
                  +'  <input type="text" id="txtMessage">'
                  +'  <br>'
                  +'  <button id="btnHideMessage" type="button" onclick="hideMessage()">Hide Message</button>'
                  +'  <button id="btnShowMessage" type="button" onclick="showMessage()">Show Message</button>'
                  +'  <br>'
                  +'  <p id="pMsg"></p>'
                  +'</form>');

    }

describe("DOM TESTS:***************", function() {
  describe("Button Click Event Tests", function() {
    var spyEvent;

    beforeEach(function() {
      setUpHTMLFixture();
    });

    it ("should invoke the btnShowMessage click event.", function() {
      spyEvent = spyOnEvent('#btnShowMessage', 'click');
      $('#btnShowMessage').trigger( "click" );

      expect('click').toHaveBeenTriggeredOn('#btnShowMessage');
      expect(spyEvent).toHaveBeenTriggered();
    });

    it ("should invoke the btnHideMessage click event.", function() {
      spyEvent = spyOnEvent('#btnHideMessage', 'click');
      $('#btnHideMessage').trigger( "click" );

      expect('click').toHaveBeenTriggeredOn('#btnHideMessage');
      expect(spyEvent).toHaveBeenTriggered();
    });
  });

  describe("Show message tests", function() {
    beforeEach(function() {
      setUpHTMLFixture();
      $('#txtMessage').val(MSG);
      $('#btnShowMessage').trigger( "click" );
    });

    it ("should display the message when button is clicked.", function() {
      expect($('#pMsg')).toHaveText($('#txtMessage').val());
    });
  });

  describe("Hide message tests", function() {
    beforeEach(function() {
      setUpHTMLFixture();
      $('#pMsg').text(MSG);
      $('#btnHideMessage').trigger( "click" );
    });

    it ("should remove the message when button is clicked.", function() {
      expect($('#pMsg')).toHaveText("");
    });
  });
});























// function UserInput(input) {
//   this.userInput = this.verify(input);
// }

// UserInput.prototype.verify = function (input){
//   var pGridAndCommands = /(\d+\s+\d+\s*\n+)((\d+\s+\d+\s*[NESW]{1}\s*\n+[LRF]*\s*)+)/i;

//   var verify = pGridAndCommands.test(input);
//   if (!verify) {
//     console.log("You're input is not correct my friend");
//     return verify;
//   } else {
//     return input;
//   }
// };

// UserInput.prototype.processInput = function (){
//   this.roboInstructions = [];

//   var pSplitLines = /[\r?\n]+/;
//   var pGridDefinition = /\d{1,2}\s+\d{1,2}/;
//   var pSplitWhitespace = /\s+/;
//   var pDirection = /[NESW]{1}/;
//   var pInstruction = /[RLF]+/;

//   function splitLines(string) {
//     return string.split(pSplitLines);
//   }

//   var lines = splitLines(this.userInput);

//   this.gridCoordinates = lines.shift().match(pGridDefinition)[0].split(pSplitWhitespace);

//   for (var i = 0; i < lines.length; i+=2) {
//     var rawCoordinates = lines[i];
//     var rawInstruction = lines [i+1];
//     var xy = rawCoordinates.match(pGridDefinition)[0].split(pSplitWhitespace);
//     var direction = rawCoordinates.match(pDirection)[0];
//     var instruction = rawInstruction.match(pInstruction)[0];
//     this.newRoboCommand(xy[0],xy[1],direction,instruction);
//   }
//   return this;
// };

// UserInput.prototype.newRoboCommand = function newRoboCommand (x,y,direction,instruction) {

//   var command = {
//     x: x,
//     y: y,
//     direction: direction,
//     instruction: instruction
//   };
//   this.roboInstructions.push(command);
// };








// //prepare user input
// var processInput = function (input) {
//     var userInput = input;
//     roboInstructions = [];

//   // ps to filter input
//   //you have to include split function that takes into account multiple lines, only one digit in the beginning etc.
//   //how can i throw nicer errors

//   var pGridAndCommands = /(\d+\s+\d+\s+)((\d+\s+\d+\s*[NESW]{1}\s*[LRF]*\s*)+)/i;
//   var pSplitLines = /[\r?\n]+/;
//   var pGridDefinition = /\d{1,2}\s+\d{1,2}/;
//   var pRobotPosition = /\d{1,2}s+\d{1,2}s+[NESW]s+/;
//   var pSplitWhitespace = /\s+/;
//   var pDirection = /[NESW]{1}/;
//   // additional commands need to be added into pInstruction. Robot.move accepts any string value
//   var pInstruction = /[RLF]+/

//   var lines = splitLines(userInput);

//   var verifyInput = function (){
//     var verify = pGridAndCommands.test(userInput)
//     if (!verify) {
//       console.log("shit get out of here");
//       alert("Not correct input");
//     } else {
//       console.log("processing userInput")
//     }
//   };

//   verifyInput()

//   // split input lines
//   function splitLines (string) {
//     return string.split(pSplitLines);
//   };

//   function newRoboCommand (x,y,direction,instruction) {
//     var command = {
//       x: x,
//       y: y,
//       direction: direction,
//       instruction: instruction
//     };
//     roboInstructions.push(command);
//   }

//   function roboCreate (lines){
//     for (var i = 0; i < lines.length; i++) {
//       var command = lines[i];
//       console.log("command", lines)
//       var xy = command.match(pGridDefinition)[0].split(pSplitWhitespace);
//       var direction = command.match(pDirection)[0];
//       var instruction = command.match(pInstruction)[0];
//       newRoboCommand(xy[0],xy[1],direction,instruction);
//     }
//     return roboInstructions
//   };

//   gridCoordinates = lines.shift().match(pGridDefinition)[0].split(pSplitWhitespace);

//   return [gridCoordinates, roboCreate(lines)]

// }


// // set up Planet grid constructor
// function Planet (width, height) {

//   this.width = parseInt(width) + 1;
//   this.height = parseInt(height) + 1;
//   // this.cells = new Array ((height + 1) * (width + 1));
//   this.cells = new Array (height * width)
// };

// Planet.prototype.valueAt = function (point) {
//   return this.cells[point.y * this.width + point.x];
// }

// Planet.prototype.scentAt = function (point) {
//   this.cells[point.y * this.width + point.x] = "scent";
// }

// Planet.prototype.isInside = function (point) {
//   return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
// }


// function Robot (x, y, direction, instruction) {
//   directions = ["N", "E", "S", "W"];

//   this.position = {
//         "x":x,
//         "y":y,
//   };
//   this.direction = direction;
//   this.instruction = instruction;
//   this.lost = false;
// }

// Robot.prototype.turnLeft = function (direction) {
//   var currentDir = directions.indexOf(direction);
//   if(currentDir === 0){currentDir = 4};
//   return directions[currentDir - 1];
// }

// Robot.prototype.turnRight = function (direction) {
//   var currentDir = directions.indexOf(direction);
//   if(currentDir === 3){currentDir = -1};
//   return directions[currentDir + 1];
// }

// Robot.prototype.moveForward = function () {
//   var oldPosition = {x: this.position.x, y: this.position.y};
//   var newPosition = {x: this.position.x, y: this.position.y};

//   if (this.direction === "N") {this.position.y ++};
//   if (this.direction === "E") {this.position.x ++};
//   if (this.direction === "S") {this.position.y --};
//   if (this.direction === "W") {this.position.x --};

//   if (mars.isInside(this.position) === false) {
//     console.log("lets hope");
//     if (mars.valueAt(oldPosition) === "scent") {
//       this.position = oldPosition;
//       console.log("we didnt go")
//     } else {
//       mars.scentAt(oldPosition);
//       console.log("we scented", oldPosition)
//       this.position = oldPosition;
//       this.lost = true;
//     }
//   }
// }

// Robot.prototype.move = function () {

//   if () {}

//   for (var i = 0; i < this.instruction.length; i++) {
//     // take into account yet defined commands
//     if (this.instruction.charAt(i) === 'L') {this.direction = (this.turnLeft(this.direction))};
//     if (this.instruction.charAt(i) === 'R') {this.direction = (this.turnRight(this.direction))};
//     if (this.instruction.charAt(i) === 'F') {
//       this.moveForward();
//       if (this.lost === true) {
//         break;
//       }
//     };
//   }
//   if (this.lost === true) {
//     output.push(this.position.x + " " + this.position.y + " " + this.direction + " " + "LOST")
//   } else {
//     output.push(this.position.x + " " + this.position.y + " " + this.direction)
//   }
// }

// // set up buttons and define functions to run on click
// initiate = function () {

//   function startRobots (commands) {
//     output = [];
//     for (var i = 0; i < commands.length; i++) {
//       current = commands[i];
//       robot = new Robot (current.x, current.y, current.direction, current.instruction);
//       robot.move();
//     }
//   }

//   var goClick = document.getElementById("go");
//   goClick.onclick = function run(){
//     var input = document.getElementById("instructions").value;
//     console.log("raw input is",input);
//     commands = processInput(input);
//     console.log("commands are",commands);
//     mars = new Planet (commands[0][0],commands[0][1]);
//     startRobots(commands[1]);
//     document.getElementById("output").value = output.join("\n");
//   };

//   var randomClick = document.getElementById("random");
//   randomClick.onclick = function (){
//     alert('Hello')
//   };


//   var clearClick = document.getElementById("clear");
//   clearClick.onclick = function (){
//     document.getElementById("instructions").value = "";
//     output = [];
//     mars = {};
//   };
// };

// // automatically run initate when script loads
// initiate();
