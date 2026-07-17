import os
import cv2
import numpy as np
import easyocr
from PIL import Image

SUPPORTED_FORMATS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tif",
    ".tiff",
    ".webp",
)

reader = easyocr.Reader(
    ['en'],
    gpu=False
)


def preprocess_image(image):

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    gray = cv2.GaussianBlur(
        gray,
        (3, 3),
        0
    )

    gray = cv2.equalizeHist(gray)

    gray = cv2.adaptiveThreshold(

        gray,

        255,

        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,

        cv2.THRESH_BINARY,

        31,

        11,

    )

    return gray


def extract_text(file_path):

    try:

        extension = os.path.splitext(file_path)[1].lower()

        if extension not in SUPPORTED_FORMATS:

            return {

                "success": False,

                "text": "",

                "message": "Unsupported image format."

            }

        image = cv2.imread(file_path)

        if image is None:

            return {

                "success": False,

                "text": "",

                "message": "Unable to read uploaded image."

            }

        processed = preprocess_image(image)

        results = reader.readtext(

            processed,

            paragraph=True,

            detail=1

        )

        if len(results) == 0:

            return {

                "success": True,

                "text": "",

                "message": "No text detected."

            }

        extracted_text = ""

        confidence_sum = 0

        for result in results:

            extracted_text += result[1] + "\n"

            confidence_sum += result[2]

        average_confidence = round(

            confidence_sum / len(results),

            2

        )

        return {

            "success": True,

            "text": extracted_text.strip(),

            "confidence": average_confidence,

            "message": "OCR completed successfully."

        }

    except Exception as error:

        return {

            "success": False,

            "text": "",

            "message": str(error)

        }