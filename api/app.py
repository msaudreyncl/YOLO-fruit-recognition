from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np
from pathlib import Path

app = Flask(__name__)
CORS(app)

MODEL_PATH = Path(__file__).resolve().parent.parent / "model" / "best.pt"
model = YOLO(str(MODEL_PATH))

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ready",
        "classes": model.names
    })

@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "No image received"}), 400

    file = request.files["image"]
    image_bytes = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({"error": "Invalid image"}), 400

    results = model.predict(
        source=image,
        conf=0.50,
        verbose=False
    )

    detections = []

    for result in results:
        for box in result.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "class": model.names[class_id],
                "confidence": round(confidence, 3),
                "x1": round(x1),
                "y1": round(y1),
                "x2": round(x2),
                "y2": round(y2)
            })

    return jsonify({
        "detections": detections,
        "count": len(detections)
    })

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )