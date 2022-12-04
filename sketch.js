const isFlipped = true;

let keypointsHand = [];
var fire_image;
const videoElement = document.getElementsByClassName("input_video")[0];
videoElement.style.display = "none";

function onHandsResults(results) {
  keypointsHand = results.multiHandLandmarks;
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});

hands.setOptions({
  selfieMode: isFlipped,
  maxNumHands: 2, // 今回、簡単化のため検出数の最大1つまでに制限
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onHandsResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();

let videoImage;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  videoImage = createGraphics(320, 180);
  fire_image= loadImage('fire.gif')
}

function draw() {
  clear();
  background("rgba(100, 100, 255, 0.2)");

  videoImage.drawingContext.drawImage(
    videoElement,
    0,
    0,
    videoImage.width,
    videoImage.height
  );

  push();
  if (isFlipped) {
    translate(width, 0);
    scale(-1, 1);
  }
  displayWidth = width;
  displayHeight = (width * videoImage.height) / videoImage.width;
  image(videoImage, 0, 0, displayWidth, displayHeight);
  pop();

  if (keypointsHand.length > 0) {
    // console.log(keypointsHand.length);
    console.log(keypointsHand[0].length); // 結果を得る
    for (let i = 0; i < keypointsHand[0].length; i += 1) {
      const indexTip = keypointsHand[0][i];
      image(fire_image,indexTip.x * displayWidth-50, indexTip.y * displayHeight-50,100,100)
      
    }
    // const indexTip = keypointsHand[0][8];
    // console.log(indexTip);

    // ellipse(indexTip.x * displayWidth, indexTip.y * displayHeight, 50);
    // image(fire_image,indexTip.x * displayWidth-100, indexTip.y * displayHeight-100,200,200)
    // const indexTip4 = keypointsHand[0][4];
    // console.log(indexTip4);

    // ellipse(indexTip4.x * displayWidth, indexTip4.y * displayHeight, 50);
    // image(fire_image,indexTip4.x * displayWidth-100, indexTip4.y * displayHeight-100,200,200)
  }
}