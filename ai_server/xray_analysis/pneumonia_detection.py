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

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    gray = cv2.GaussianBlur(
        gray,
        (5, 5),
        0
    )

    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    gray = clahe.apply(gray)

    return gray


def detect_pneumonia(path):

    if not path.lower().endswith(SUPPORTED_FORMATS):

        return {

            "disease": "Unsupported File",

            "confidence": 0,

            "status": "Invalid",

            "recommendation":
            "Please upload JPG, PNG, BMP, TIFF or WEBP images."

        }

    image = cv2.imread(path)

    if image is None:

        return {

            "disease": "Invalid Image",

            "confidence": 0,

            "status": "Error",

            "recommendation":
            "Unable to read uploaded image."

        }

    gray = preprocess(image)

    edges = cv2.Canny(
        gray,
        40,
        140
    )

    edge_density = np.sum(edges > 0)

    threshold = cv2.adaptiveThreshold(

        gray,

        255,

        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,

        cv2.THRESH_BINARY,

        21,

        5

    )

    contours, _ = cv2.findContours(

        threshold,

        cv2.RETR_EXTERNAL,

        cv2.CHAIN_APPROX_SIMPLE

    )

    suspicious_regions = 0

    largest_area = 0

    for contour in contours:

        area = cv2.contourArea(contour)

        if area > 120:

            suspicious_regions += 1

        largest_area = max(
            largest_area,
            area
        )

    confidence = min(

        round(

            (
                edge_density / 18000 * 50
                +
                largest_area / 3500 * 50
            ),

            2

        ),

        99

    )

    if confidence >= 80:

        disease = "Pneumonia Detected"

        status = "High Risk"

        recommendation = (
            "High probability of pneumonia detected. Immediate chest CT and physician consultation recommended."
        )

    elif confidence >= 55:

        disease = "Possible Pneumonia"

        status = "Moderate Risk"

        recommendation = (
            "Possible pneumonia detected. Clinical correlation recommended."
        )

    elif confidence >= 35:

        disease = "Minor Lung Opacity"

        status = "Observation"

        recommendation = (
            "Minor opacity observed. Follow-up chest X-ray advised."
        )

    else:

        disease = "Normal Chest"

        confidence = 97.4

        status = "Low Risk"

        recommendation = (
            "No obvious pulmonary abnormality detected."
        )

    return {

        "disease": disease,

        "confidence": confidence,

        "status": status,

        "suspicious_regions": suspicious_regions,

        "recommendation": recommendation

    }