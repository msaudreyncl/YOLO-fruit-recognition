<?php
$pageTitle = "Fruit Recognition System";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?></title>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>

<main class="container">

    <header>
        <p class="eyebrow">YOLO OBJECT DETECTION</p>
        <h1>Fruit Recognition System</h1>
        <p>Real-time detection of apples, oranges, and bananas.</p>
    </header>

    <section class="detector">

        <div class="camera-container">
            <video id="camera" autoplay playsinline></video>
            <canvas id="overlay"></canvas>
        </div>

        <div class="controls">
            <button id="start-camera">
                Start Camera
            </button>

            <button id="start-detection" disabled>
                Start Detection
            </button>

            <button id="stop-detection" disabled>
                Stop Detection
            </button>
        </div>

        <div class="status">
            <span id="status-dot"></span>
            <span id="status-text">
                Camera inactive
            </span>
        </div>

    </section>

    <section class="results">

        <div class="results-header">
            <div>
                <p class="eyebrow">DETECTION RESULTS</p>
                <h2>Detected Fruits</h2>
            </div>

            <span id="fruit-count">0 detected</span>
        </div>

        <div id="detection-results">
            <p>No detections yet.</p>
        </div>

    </section>

</main>

<canvas id="capture-canvas" hidden></canvas>

<script src="script/script.js"></script>

</body>
</html>