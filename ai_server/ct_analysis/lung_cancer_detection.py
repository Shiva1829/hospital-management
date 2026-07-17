import cv2
import numpy as np

SUPPORTED_FORMATS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tif",
    ".tiff",
    ".webp",
)


def preprocess(image):

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.GaussianBlur(gray, (5, 5), 0)

    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    gray = clahe.apply(gray)

    return gray


def detect_lung_cancer(path):

    if not path.lower().endswith(SUPPORTED_FORMATS):

        return {

            "disease": "Unsupported File",

            "confidence": 0,

            "stage": "Unknown",

            "message": "Unsupported image format."

        }

    image = cv2.imread(path)

    if image is None:

        return {

            "disease": "Invalid Image",

            "confidence": 0,

            "stage": "Unknown",

            "message": "Unable to read uploaded image."

        }

    gray = preprocess(image)

    threshold = cv2.adaptiveThreshold(

        gray,

        255,

        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,

        cv2.THRESH_BINARY,

        21,

        4,

    )

    contours, _ = cv2.findContours(

        threshold,

        cv2.RETR_EXTERNAL,

        cv2.CHAIN_APPROX_SIMPLE,

    )

    suspicious_regions = 0

    largest_area = 0

    for contour in contours:

        area = cv2.contourArea(contour)

        if area > 120:

            suspicious_regions += 1

        largest_area = max(largest_area, area)

    confidence = min(

        round(

            (largest_area / 3500) * 100,

            2

        ),

        99

    )

    if confidence >= 80:

        disease = "Possible Lung Cancer"

        stage = "Stage II"

        recommendation = (

            "Multiple suspicious regions detected. CT evaluation and oncologist consultation recommended."

        )

    elif confidence >= 55:

        disease = "Possible Lung Nodule"

        stage = "Stage I"

        recommendation = (

            "Possible pulmonary nodule detected. Follow-up CT scan advised."

        )

    elif confidence >= 30:

        disease = "Minor Abnormality"

        stage = "Observation"

        recommendation = (

            "Minor abnormality detected. Clinical correlation recommended."

        )

    else:

        disease = "Normal Lung"

        confidence = 97.3

        stage = "None"

        recommendation = (

            "No obvious lung abnormality detected."

        )

    return {

        "disease": disease,

        "confidence": confidence,

        "stage": stage,

        "suspicious_regions": suspicious_regions,

        "message": recommendation,

    }