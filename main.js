noseX = 0;
noseY = 0;

function preload() {
    img = loadImage("bear-mask.png");
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.position(350, 340);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x - 40;
        noseY = results[0].pose.nose.y - 5;
        console.log("Nose x = " + noseX);
        console.log("Nose y = " + noseY);
    }
}

function draw() {
    image(video, 0, 0, 640, 480);
    image(img, noseX - 110, noseY - 170, 300, 300);
}

function take_snapshot() {
    save("mask-filtered-selfie.png");
}