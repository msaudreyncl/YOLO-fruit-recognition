const video = document.getElementById("camera");
const overlay = document.getElementById("overlay");
const captureCanvas = document.getElementById("capture-canvas");

const startCameraBtn = document.getElementById("start-camera");
const startDetectionBtn = document.getElementById("start-detection");
const stopDetectionBtn = document.getElementById("stop-detection");

const statusText = document.getElementById("status-text");
const statusDot = document.getElementById("status-dot");
const resultsContainer = document.getElementById("detection-results");
const fruitCount = document.getElementById("fruit-count");

const overlayCtx = overlay.getContext("2d");
const captureCtx = captureCanvas.getContext("2d");

let detecting = false;
let processing = false;

startCameraBtn.addEventListener("click", startCamera);
startDetectionBtn.addEventListener("click", startDetection);
stopDetectionBtn.addEventListener("click", stopDetection);

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: false
        });

        video.srcObject = stream;

        video.onloadedmetadata = () => {
            overlay.width = video.videoWidth;
            overlay.height = video.videoHeight;

            captureCanvas.width = video.videoWidth;
            captureCanvas.height = video.videoHeight;

            statusText.textContent = "Camera ready";
            statusDot.style.background = "#2f8f46";

            startCameraBtn.disabled = true;
            startDetectionBtn.disabled = false;
        };

    } catch (error) {
        console.error(error);
        statusText.textContent = "Unable to access camera";
        statusDot.style.background = "#c74444";
    }
}

function startDetection() {
    detecting = true;

    startDetectionBtn.disabled = true;
    stopDetectionBtn.disabled = false;

    statusText.textContent = "Detection active";
    statusDot.style.background = "#2f8f46";

    detectFrame();
}

function stopDetection() {
    detecting = false;

    startDetectionBtn.disabled = false;
    stopDetectionBtn.disabled = true;

    overlayCtx.clearRect(
        0,
        0,
        overlay.width,
        overlay.height
    );

    statusText.textContent = "Detection stopped";
}

async function detectFrame() {
    if (!detecting) {
        return;
    }

    if (!processing) {
        processing = true;

        captureCtx.drawImage(
            video,
            0,
            0,
            captureCanvas.width,
            captureCanvas.height
        );

        captureCanvas.toBlob(
            async (blob) => {

                try {
                    const formData = new FormData();

                    formData.append(
                        "image",
                        blob,
                        "frame.jpg"
                    );

                    const response = await fetch(
                        "http://127.0.0.1:5000/detect",
                        {
                            method: "POST",
                            body: formData
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `Server error: ${response.status}`
                        );
                    }

                    const data = await response.json();

                    drawDetections(
                        data.detections || []
                    );

                    showResults(
                        data.detections || []
                    );

                } catch (error) {
                    console.error(error);

                    statusText.textContent =
                        "Detection server unavailable";

                    statusDot.style.background =
                        "#c74444";

                } finally {
                    processing = false;
                }
            },
            "image/jpeg",
            0.8
        );
    }

    setTimeout(detectFrame, 300);
}

function drawDetections(detections) {
    overlayCtx.clearRect(
        0,
        0,
        overlay.width,
        overlay.height
    );

    overlayCtx.lineWidth = 3;
    overlayCtx.font = "16px Arial";

    detections.forEach((detection) => {

        const width =
            detection.x2 - detection.x1;

        const height =
            detection.y2 - detection.y1;

        overlayCtx.strokeStyle = "#4cff78";
        overlayCtx.fillStyle = "#4cff78";

        overlayCtx.strokeRect(
            detection.x1,
            detection.y1,
            width,
            height
        );

        const confidence =
            Math.round(
                detection.confidence * 100
            );

        overlayCtx.fillText(
            `${detection.class} ${confidence}%`,
            detection.x1,
            Math.max(20, detection.y1 - 8)
        );
    });
}

function showResults(detections) {

    fruitCount.textContent =
        `${detections.length} detected`;

    if (!detections.length) {

        resultsContainer.innerHTML =
            "<p>No fruit detected.</p>";

        return;
    }

    resultsContainer.innerHTML =
        detections.map((item) => {

            const confidence =
                Math.round(
                    item.confidence * 100
                );

            return `
                <div class="detection-item">
                    <strong>
                        ${item.class}
                    </strong>

                    <span>
                        ${confidence}% confidence
                    </span>
                </div>
            `;

        }).join("");
}