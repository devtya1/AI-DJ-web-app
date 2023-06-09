song = "";
var score_leftWrist = 0;
var score_rightWrist = 0;

function preload() {
  song = loadSound("music.mp3");
}

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
  if (results.length > 0) {
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    score_leftWrist = results[0].pose.keypoints[9].score;
    score_rightWrist = results[0].pose.keypoints[10].score;
    console.log("Left Wrist Score: " + score_leftWrist);
  }
}

function draw() {
  if (score_rightWrist >= 0.2) {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("black");
    circle(rightWristX, rightWristY, 20);
    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    }
    else if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "Speed = 1x";
      song.rate(1);
    }
    else if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "Speed = 1.5x";
      song.rate(1.5);
    }
    else if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      song.rate(2);
    }
    else {
      document.getElementById("speed").innerHTML = "Speed = 2.5x";
      song.rate(2.5);
    }
  }
  if (score_leftWrist >= 0.2) {
    fill("red");
    stroke("black");
    circle(leftWristX, leftWristY, 20);
    var intoNum = Number(leftWristY);
    var removeDecimal = floor(intoNum);
    var volume = removeDecimal / 500;
    document.getElementById("volume").innerHTML = "Volume: " + volume;
    song.setVolume(volume);
  }
}

function play() {
  song.play();
  song.rate(1);
}
