if (untangleGame === undefined) {
  var untangleGame = {};
}

untangleGame.thinLineThickness = 1;
untangleGame.boldLineThickness = 5;
untangleGame.lines = [];

untangleGame.drawCircle = function(x, y, radius) {
  var ctx = untangleGame.ctx;
  ctx.fillStyle = "GOLD";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
};

untangleGame.drawLine = function(x1, y1, x2, y2, thickness) {
  var ctx = untangleGame.ctx;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = "#cfc";
  ctx.stroke();
};

untangleGame.connectCircles = function() {
  // setup all lines based on the circles relationship
  var level = untangleGame.levels[untangleGame.currentLevel];
  untangleGame.lines.length = 0;
  for (var i in level.relationship) {
    var connectedPoints = level.relationship[i].connectedPoints;
    var startPoint = untangleGame.circles[i];
    for (var j in connectedPoints) {
      var endPoint = untangleGame.circles[connectedPoints[j]];
      untangleGame.lines.push(new untangleGame.Line(startPoint, endPoint, untangleGame.thinLineThickness));
    }
  }
};

untangleGame.drawAllLines = function(){
  // draw all remembered line
  for(var i=0;i<untangleGame.lines.length;i++) {
    var line = untangleGame.lines[i];
    var startPoint = line.startPoint;
    var endPoint = line.endPoint;
    var thickness = line.thickness;
    untangleGame.drawLine(startPoint.x, startPoint.y, endPoint.x,
    endPoint.y, thickness);
  }
};

untangleGame.drawAllCircles = function() {
  // draw all remembered circles
  for(var i=0;i<untangleGame.circles.length;i++) {
    var circle = untangleGame.circles[i];
    untangleGame.drawCircle(circle.x, circle.y, circle.radius);
  }
};

untangleGame.clear = function() {
  var ctx = untangleGame.ctx;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
};

// draw the level progress text
untangleGame.drawLevelProgress = function() {
  var ctx = untangleGame.ctx;
  ctx.font = "26px Arial";
  ctx.fillStyle = "WHITE";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("Puzzle "+untangleGame.currentLevel+", Completeness: " + untangleGame.levelProgress + "%", 60, ctx.canvas.height-60);
}


