describe("The user input", function (){

  it("first line gets processed as grid coordinates", function (){

  });

  describe("following lines are each two line robot instructions", function (){

    it("whose first line gets processed as two grid integers and a direction", function (){

    });

    it("whose second line gets processed as a string of instruction letters", function (){

    });
  })
});

describe("The surface of Mars", function() {

  var mars = new Planet (20, 25);

  it("gets modeled with a 2-d grid",function() {
    expect(Object.prototype.toString.call(mars.cells)).toBe('[object Array]');
    expect(mars.cells.length).toEqual(500);
  });

  it("gets modeled once per execution of the program as the first input line", function(){

  });

  it ("constructor only accepts integer values", function (){

  });

  it("has a maximumum grid height and width of each 50", function () {
    expect(Planet.bind(null, 111, 12)).toThrow(new RangeError('Only integers between 0 and 50'));
    expect(Planet.bind(null, 3, 120)).toThrow(new RangeError('Only integers between 0 and 50'));

  });

  it ("has a minimum grid height and width of each 1", function () {
    expect(Planet.bind(null, 0, 1)).toThrow(new RangeError('Only integers between 0 and 50'));
    expect(Planet.bind(null, 111, 0)).toThrow(new RangeError('Only integers between 0 and 50'));
    expect(Planet.bind(null, -23, 0)).toThrow(new RangeError('Only integers between 0 and 50'));


  });
});

describe("A robot", function () {

  describe("has a position input", function (){

    it("that consists of a grid coordinate and an orientation", function (){

    });

    it("that lays within the defined grid (which is max 50*50)", function (){

    });
  });

  describe("has an instruction input", function (){

    it("that is a string of less than 100 letters", function (){

    });

    it("that turns the robot left with 'L' on the same grid", function (){

    });

    it("that turns the robot right with 'R' on the same grid", function (){

    });

    it("that moves the robot forward in the current direction one grid with 'F'", function (){

    });

    it("that throws an error if the instruction is not defined yet", function () {

    });

    it("that is two lines per robot and gets executed sequentially", function () {

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

  describe("gives an output", function () {

    it("that tells the position of each robot per one line in the format as position input", function () {

    });

    it("that adds 'LOST' to the position if the robot moved off the grid", function () {

    });
  });
});
