let capture;
let posenet;
let noseX, noseY;
let reyeX, reyeY;
let leyeX, leyeY;
let singlePose, skeleton;
let specs, smoke;

function preload() {
    // Preload images
    specs = loadImage('./spects.png');
    smoke = loadImage('./smoke.png'); // Ensure you have the image path correct
}

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    console.log(poses);

    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    // Draw video feed
    image(capture, 0, 0);
    fill(255, 0, 0);

    if (singlePose) {
        // Draw keypoints
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }
        
        // Draw skeleton
        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        // Draw images on specific body parts
        if (singlePose.keypoints[0].score > 0.5) { // Example condition for rendering
            image(specs, singlePose.nose.x - 35, singlePose.nose.y - 50, 80, 80);
            image(smoke, singlePose.nose.x - 35, singlePose.nose.y + 10, 40, 40);
        }
    }
}
