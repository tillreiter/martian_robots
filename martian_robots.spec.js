describe("The user input", function (){

  it("gets imported from the textarea", function (){

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

    it("that is two lines per robot and gets executed sequentially", function () {

    });

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

  it("tells the position of each robot perline in the format like position input", function () {

  });

  it("adds 'LOST' to the position if the robot moved off the grid", function () {

  });
});
