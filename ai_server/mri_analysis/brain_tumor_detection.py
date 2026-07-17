import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model

# -----------------------------
# Supported Image Formats
# -----------------------------
SUPPORTED_FORMATS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tif",
    ".tiff",
    ".webp",
)

# -----------------------------
# Load CNN Model
# -----------------------------
MODEL_PATH = "models/brain_tumor_model.h5"

try:
    model = load_model(MODEL_PATH)
except Exception as e:
    model = None
    print("Error loading model:", e)

# -----------------------------
# Classes
# -----------------------------
classes = [
    "glioma",
    "meningioma",
    "notumor",
    "pituitary"
]

# -----------------------------
# Image Preprocessing
# -----------------------------
def preprocess_image(img_path):

    image = cv2.imread(img_path)

    if image is None:
        raise ValueError("Unable to read image.")

    # Convert to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Resize exactly as model expects
    image = cv2.resize(image, (224, 224))

    # Contrast Enhancement
    lab = cv2.cvtColor(image, cv2.COLOR_RGB2LAB)

    l, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    l = clahe.apply(l)

    lab = cv2.merge((l, a, b))

    image = cv2.cvtColor(
        lab,
        cv2.COLOR_LAB2RGB
    )

    image = image.astype(np.float32)

    image = image / 255.0

    image = np.expand_dims(
        image,
        axis=0
    )

    return image

# -----------------------------
# Prediction
# -----------------------------
def detect_brain_tumor(img_path):

    if model is None:

        return {

            "success": False,

            "disease": "Model Not Loaded",

            "confidence": 0,

            "status": "Error",

            "recommendation":
            "Brain tumor CNN model could not be loaded."

        }

    if not os.path.exists(img_path):

        return {

            "success": False,

            "disease": "Image Not Found",

            "confidence": 0,

            "status": "Error",

            "recommendation":
            "Uploaded image not found."

        }

    extension = os.path.splitext(img_path)[1].lower()

    if extension not in SUPPORTED_FORMATS:

        return {

            "success": False,

            "disease": "Unsupported Image",

            "confidence": 0,

            "status": "Invalid",

            "recommendation":
            "Please upload JPG, PNG, BMP, TIFF or WEBP image."

        }

    try:

        img = preprocess_image(img_path)

        prediction = model.predict(
            img,
            verbose=0
        )

        predicted_index = int(np.argmax(prediction))

        confidence = round(
            float(np.max(prediction) * 100),
            2
        )

        disease = classes[predicted_index]

        if disease == "notumor":

            return {

                "success": True,

                "disease": "No Brain Tumor",

                "tumor_type": "None",

                "confidence": confidence,

                "status": "Normal",

                "recommendation":
                "No tumor detected."

            }

        recommendations = {

            "glioma":
            "Glioma suspected. Immediate neurosurgical consultation recommended.",

            "meningioma":
            "Meningioma suspected. MRI review by neurologist recommended.",

            "pituitary":
            "Pituitary tumor suspected. Endocrinologist consultation advised."

        }

        return {

            "success": True,

            "disease": disease.capitalize() + " Tumor",

            "tumor_type": disease.capitalize(),

            "confidence": confidence,

            "status": "Tumor Detected",

            "recommendation":
            recommendations.get(
                disease,
                "Consult neurologist."
            )

        }

    except Exception as e:

        return {

            "success": False,

            "disease": "Prediction Failed",

            "confidence": 0,

            "status": "Error",

            "recommendation": str(e)

        }