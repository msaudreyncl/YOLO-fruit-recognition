# YOLO Fruit Detection System 🍎🍌🍊

A real-time fruit detection system using **YOLO (You Only Look Once)** that identifies **apples, bananas, and oranges** through a live webcam feed.

The project combines a trained YOLO object detection model with a **Python detection server** and a **PHP-based web interface**. Detected fruits are displayed with their corresponding **bounding boxes, class labels, and confidence scores**.

---

## Features

- Real-time webcam-based fruit detection
- Detects **Apple, Banana, and Orange**
- YOLO-based object detection
- Displays bounding boxes around detected fruits
- Shows predicted fruit class and confidence score
- Uses a custom-trained fruit dataset
- Python detection server for model inference
- PHP, HTML, CSS, and JavaScript web interface
- No manual image uploading required

---

## System Workflow

```text
Live Webcam
     ↓
Capture Camera Frame
     ↓
Web Interface
     ↓
Python Detection Server
     ↓
YOLO Model
     ↓
Fruit Detection
     ↓
Class + Confidence + Bounding Box
     ↓
Display Detection Result
```

The browser captures frames from the webcam and sends them to the Python detection server. The trained YOLO model analyzes each frame and returns the detected fruit, confidence score, and bounding-box coordinates to the website.

---

## Supported Classes

| Class | Fruit |
|---:|---|
| 0 | Apple |
| 1 | Banana |
| 2 | Orange |

The actual class IDs depend on the class order defined in `data.yaml`.

---

## Technologies Used

**Machine Learning**
- Python
- Ultralytics YOLO
- OpenCV

**Backend**
- Python detection server
- Flask / API communication

**Web Interface**
- PHP
- HTML
- CSS
- JavaScript

**Development Environment**
- Visual Studio Code
- XAMPP
- Python virtual environment

---

## Dataset

The YOLO model is trained using a custom dataset containing annotated images of:

- Apples
- Bananas
- Oranges

Each fruit is labeled using **bounding-box annotations** in YOLO format.

Typical dataset structure:

```text
dataset/
├── data.yaml
├── train/
│   ├── images/
│   └── labels/
└── valid/
    ├── images/
    └── labels/
```

A separate `test` folder is optional. The model can still be trained using the provided `train` and `valid` datasets.

---

## Project Structure

```text
YOLO-fruit-recognition/
│
├── dataset/
│   ├── data.yaml
│   ├── train/
│   └── valid/
│
├── runs/
│   └── detect/
│       └── train/
│           └── weights/
│               ├── best.pt
│               └── last.pt
│
├── website/
│   ├── index.php
│   ├── assets/
│   ├── style/
│   └── scripts/
│
├── detection_server.py
├── train.py
├── requirements.txt
└── README.md
```

---

## Model Training

Install Ultralytics:

```bash
pip install ultralytics
```

Example training code:

```python
from ultralytics import YOLO

model = YOLO("yolov8n.pt")

model.train(
    data="dataset/data.yaml",
    epochs=50,
    imgsz=640
)
```

After training, the best-performing model is typically saved as:

```text
runs/detect/train/weights/best.pt
```

This model is used by the detection server for fruit recognition.

---

## Installation

### 1. Clone or download the project

Place the project inside the XAMPP `htdocs` directory:

```text
C:\xampp\htdocs\YOLO-fruit-recognition
```

### 2. Create a virtual environment

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

Typical dependencies include:

```text
ultralytics
opencv-python
flask
flask-cors
numpy
```

---

## Running the System

### 1. Start the Python Detection Server

From the project directory:

```powershell
.venv\Scripts\Activate.ps1
python detection_server.py
```

Keep this terminal running while using the website.

### 2. Start the PHP Website

Using XAMPP, open the **XAMPP Control Panel** and start:

```text
Apache
```

Then access the website through:

```text
http://localhost/YOLO-fruit-recognition/website/
```

Alternatively, use XAMPP's PHP executable:

```powershell
C:\xampp\php\php.exe -S localhost:8080 -t website
```

Then open:

```text
http://localhost:8080
```

### 3. Allow Camera Access

Allow the browser to access the webcam when prompted.

Present an **apple, banana, or orange** in front of the camera to begin detection.

---

## Detection Output

For each detected fruit, the system can display:

- **Fruit class** — Apple, Banana, or Orange
- **Confidence score** — probability of the prediction
- **Bounding box** — location of the detected fruit in the camera frame

Example:

```text
Apple — 94%
Banana — 89%
Orange — 91%
```

A confidence threshold can be used to prevent low-confidence detections from being displayed.

---

## Troubleshooting

### Detection Server Unavailable

Make sure the Python detection server is running:

```powershell
python detection_server.py
```

Also verify that the website is communicating with the correct server address and port.

### `php` is not recognized

If PowerShell does not recognize the `php` command, use the PHP executable included with XAMPP:

```powershell
C:\xampp\php\php.exe -S localhost:8080 -t website
```

### Camera Not Working

Check:

- Browser camera permissions
- Windows camera privacy settings
- Whether another application is using the webcam
- Whether the website is running through `localhost`

### Poor or Incorrect Detection

Detection accuracy can be affected by:

- Poor lighting
- Complex backgrounds
- Distance from the camera
- Fruit orientation
- Limited training data
- Incorrect annotations
- High confidence threshold

---

## Limitations

The current model is trained specifically to recognize **apples, bananas, and oranges**. Objects outside these classes are not intentionally recognized.

Model accuracy may vary depending on lighting, camera quality, object orientation, background conditions, and the quality of the training dataset.

---

## Future Improvements

Future versions of the system may include:

- Additional fruit classes
- Larger and more diverse datasets
- Improved detection accuracy
- Detection history
- Saved detection results
- Performance statistics
- Improved web interface
- Raspberry Pi deployment
- Faster real-time inference

---

## Purpose

The **YOLO Fruit Detection System** was developed as an academic computer vision project demonstrating the integration of:

**Machine Learning + Computer Vision + Web Development**

It provides a practical implementation of custom dataset preparation, YOLO model training, real-time object detection, API communication, and web-based visualization.

---

## License

This project is intended for **educational and academic purposes**. Third-party datasets, pretrained models, libraries, and frameworks remain subject to their respective licenses.