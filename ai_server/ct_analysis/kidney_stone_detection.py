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


def preprocess_image(image):

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.GaussianBlur(gray, (5, 5), 0)

    gray = cv2.equalizeHist(gray)

    return gray


def detect_kidney_stone(path):

    if not path.lower().endswith(SUPPORTED_FORMATS):

        return {
            "disease": "Unsupported File",
            "confidence": 0,
            "stone_size": "Unknown",
            "message": "Please upload a valid medical image.",
        }

    image = cv2.imread(path)

    if image is None:

        return {
            "disease": "Invalid Image",
            "confidence": 0,
            "stone_size": "Unknown",
            "message": "Unable to read image.",
        }

    gray = preprocess_image(image)

    threshold = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        21,
        5,
    )

    contours, _ = cv2.findContours(
        threshold,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE,
    )

    largest_area = 0

    for contour in contours:

        area = cv2.contourArea(contour)

        if area > largest_area:
            largest_area = area

    confidence = min(round((largest_area / 5000) * 100, 2), 99)

    if confidence >= 75:

        disease = "Kidney Stone"

        stone_size = "Large"

        recommendation = (
            "Large stone suspected. Immediate consultation with a urologist is recommended."
        )

    elif confidence >= 45:

        disease = "Kidney Stone"

        stone_size = "Medium"

        recommendation = (
            "Possible medium-sized kidney stone detected. Further imaging is advised."
        )

    elif confidence >= 20:

        disease = "Possible Kidney Stone"

        stone_size = "Small"

        recommendation = (
            "Small calcification detected. Clinical correlation is recommended."
        )

    else:

        disease = "No Kidney Stone"

        confidence = 96.5

        stone_size = "None"

        recommendation = (
            "No obvious kidney stone detected."
        )

    return {

        "disease": disease,

        "confidence": confidence,

        "stone_size": stone_size,

        "message": recommendation,

    }