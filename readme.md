# 🍎🍌🍊 YOLO Fruit Detection System

A real-time **fruit object detection system** developed using **YOLO11**, Python, Flask, PHP, JavaScript, and OpenCV.

The system is trained to detect three fruit classes:

- 🍎 Apple
- 🍌 Banana
- 🍊 Orange

The project covers the complete computer vision workflow—from dataset preparation and YOLO model training to model evaluation, API deployment, and live webcam detection through a web interface.

---

## System Overview

The project follows this workflow:

```text
Dataset
   ↓
Train / Validation / Test
   ↓
YOLO11 Training
   ↓
best.pt
   ↓
Model Evaluation
   ↓
Python Flask API
   ↓
PHP + CSS + JavaScript Website
   ↓
Live Webcam
   ↓
Real-Time Fruit Detection
```

The browser captures frames from the webcam and sends them to the Flask API. The API uses the trained YOLO model to detect fruits and returns the detected class, confidence score, and bounding-box coordinates to the website.

---

## Features

- Real-time webcam detection
- Detects **Apple, Banana, and Orange**
- Supports multiple fruits in one frame
- YOLO11 object detection
- Bounding-box visualization
- Detection confidence scores
- Custom-trained `best.pt` model
- Separate training, validation, and test datasets
- Flask-based inference API
- PHP-based web interface
- Separate PHP, CSS, and JavaScript files

---

## Technologies Used

| Component | Technology |
|---|---|
| Object Detection | YOLO11 |
| Model Training | Python / Ultralytics |
| Computer Vision | OpenCV |
| Training Environment | Jupyter Notebook |
| Backend API | Flask + Flask-CORS |
| Frontend | PHP, HTML, CSS, JavaScript |
| Camera | Browser WebRTC / `getUserMedia()` |

---

## Project Structure

```text
fruit-yolo-system/
│
├── .venv/
│
├── training/
│   ├── fruit_detection.ipynb
│   │
│   ├── dataset/
│   │   ├── data.yaml
│   │   ├── train/
│   │   │   ├── images/
│   │   │   └── labels/
│   │   ├── valid/
│   │   │   ├── images/
│   │   │   └── labels/
│   │   └── test/
│   │       ├── images/
│   │       └── labels/
│   │
│   ├── test_images/
│   │   └── my_fruits.jpg
│   │
│   ├── runs/
│   │   └── fruit_detector/
│   │       └── weights/
│   │           ├── best.pt
│   │           └── last.pt
│   │
│   └── predictions/
│
├── model/
│   └── best.pt
│
├── api/
│   └── app.py
│
└── website/
    ├── index.php
    ├── style/
    │   └── style.css
    ├── script/
    │   └── script.js
    └── assets/
```

---

## Dataset

The dataset contains annotated images of **apples, bananas, and oranges** divided into three sets:

- **Train** — used by YOLO to learn the fruit classes and bounding boxes.
- **Validation** — used to monitor model performance during training.
- **Test** — used for final evaluation using images not used for model training.

The dataset configuration is stored in:

```text
training/dataset/data.yaml
```

The class order defined in `data.yaml` must not be changed because the YOLO annotation class IDs correspond to this order.

---

## Model Training

Training is performed through:

```text
training/fruit_detection.ipynb
```

The project uses the lightweight **YOLO11 Nano (`yolo11n.pt`)** model to reduce hardware requirements.

Example training configuration:

```python
results = model.train(
    data="dataset/data.yaml",
    epochs=50,
    imgsz=640,
    batch=4,
    device="cpu",
    workers=2,
    project="runs",
    name="fruit_detector"
)
```

After training, YOLO generates:

```text
training/runs/fruit_detector/weights/
├── best.pt
└── last.pt
```

`best.pt` is used as the final model for evaluation and deployment.

A copy is placed in:

```text
model/best.pt
```

for use by the Flask API.

---

## Model Evaluation

The trained model is evaluated using both the validation and test datasets.

Important evaluation metrics include:

- Precision
- Recall
- mAP50
- mAP50–95

Predictions are also visually inspected to check for:

- Correct fruit classification
- Correct bounding boxes
- Missed fruits
- Incorrect classifications
- Duplicate detections
- Low-confidence detections

The model is additionally tested using custom images and the computer's webcam before deployment to the website.

---

## Installation

### 1. Create and activate the virtual environment

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install ultralytics jupyterlab opencv-python flask flask-cors
```

---

## Running the System

The complete application requires **two servers running at the same time**.

### 1. Start the Flask Detection API

From the main project directory:

```bash
.venv\Scripts\activate
cd api
python app.py
```

The API runs at:

```text
http://127.0.0.1:5000
```

Check whether the model is ready through:

```text
http://127.0.0.1:5000/health
```

A successful response should indicate that the server is ready and show the available fruit classes.

### 2. Start the PHP Website

Open another terminal:

```bash
cd website
```

If PHP is available in PATH:

```bash
php -S localhost:8000
```

If using XAMPP's PHP executable:

```bash
C:\xampp\php\php.exe -S localhost:8000
```

Then open:

```text
http://localhost:8000
```

---

## Live Detection Process

Once both servers are running:

```text
Webcam
   ↓
JavaScript captures frame
   ↓
POST image to /detect
   ↓
Flask API
   ↓
model/best.pt
   ↓
YOLO inference
   ↓
JSON detection results
   ↓
JavaScript
   ↓
Bounding Boxes + Class + Confidence
```

The user must first click **Start Camera** and allow browser camera access.

After clicking **Start Detection**, camera frames are continuously sent to the Flask API for inference.

Each detection contains:

```text
Fruit Class
Confidence Score
Bounding Box Coordinates
```

For example:

```text
Apple  — 94%
Banana — 91%
Orange — 89%
```

Multiple fruits can also be detected within the same frame.

---

## API Endpoints

### `GET /health`

Checks whether the Flask server and YOLO model are ready.

### `POST /detect`

Receives a camera frame, processes it using `best.pt`, and returns detected fruits as JSON.

Example response:

```json
{
    "detections": [
        {
            "class": "apple",
            "confidence": 0.94,
            "x1": 120,
            "y1": 80,
            "x2": 350,
            "y2": 310
        }
    ],
    "count": 1
}
```

---

## Troubleshooting

### Detection Server Unavailable

Make sure the Flask server is running:

```bash
cd api
python app.py
```

Then check:

```text
http://127.0.0.1:5000/health
```

### `php` is not recognized

Use the PHP executable included with XAMPP:

```bash
C:\xampp\php\php.exe -S localhost:8000
```

### Camera Not Working

Check browser camera permissions and make sure no other application is currently using the webcam.

### Detection Is Slow

The system performs inference using the CPU. The inference image size can be reduced to improve performance:

```python
results = model.predict(
    source=image,
    conf=0.50,
    imgsz=416,
    verbose=False
)
```

The interval between detection requests can also be increased in `script.js`.

---

## Limitations

- Detects only Apple, Banana, and Orange.
- Detection accuracy depends on the quality of the training dataset.
- Lighting, background, camera quality, distance, and fruit orientation may affect detection.
- Real-time inference speed is limited when running on CPU.
- The system is intended primarily for academic and educational use.

---

## Purpose

The **YOLO Fruit Detection System** was developed as a practical introduction to the complete object-detection pipeline:

```text
Dataset Preparation
        ↓
YOLO Training
        ↓
Validation & Testing
        ↓
Model Deployment
        ↓
Flask API
        ↓
Web Integration
        ↓
Real-Time Detection
```

The project demonstrates how a trained computer vision model can be integrated into a web-based application for real-time object detection.