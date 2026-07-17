from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware

import shutil
import os
import uuid
import requests

# ==========================================================
# AI Modules
# ==========================================================

from disease_prediction.heart_image_detection import predict_heart
from disease_prediction.liver_image_detection import predict_liver

from OCR.report_reader import extract_text

from xray_analysis.pneumonia_detection import detect_pneumonia

from ct_analysis.kidney_stone_detection import detect_kidney_stone
from ct_analysis.lung_cancer_detection import detect_lung_cancer

from mri_analysis.brain_tumor_detection import detect_brain_tumor

# ==========================================================
# FastAPI
# ==========================================================

app = FastAPI(
    title="AI Hospital Server",
    version="1.0"
)

# ==========================================================
# CORS
# ==========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

# ==========================================================
# Upload Folder
# ==========================================================

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# ==========================================================
# Allowed Formats
# ==========================================================

ALLOWED_EXTENSIONS = {

    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp",
    ".tif",
    ".tiff"

}

# ==========================================================
# Validate Uploaded Image
# ==========================================================

def validate_image(filename):

    extension = os.path.splitext(filename)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(

            status_code=400,

            detail=f"Unsupported image format ({extension})"

        )

# ==========================================================
# Save Uploaded Image
# ==========================================================

def save_upload(upload_file):

    unique_name = (

        str(uuid.uuid4())

        + "_"

        + upload_file.filename

    )

    file_path = os.path.join(

        UPLOAD_FOLDER,

        unique_name

    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(

            upload_file.file,

            buffer

        )

    return file_path

# ==========================================================
# Delete Uploaded Image
# ==========================================================

def remove_upload(file_path):

    try:

        if os.path.exists(file_path):

            os.remove(file_path)

    except Exception:

        pass

# ==========================================================
# Save Prediction into MERN Backend
# ==========================================================

def save_prediction(

    disease_type,

    result,

    image_path,

    patient_name="Unknown"

):

    try:

        requests.post(

            "http://localhost:4000/api/v1/predictions/add",

            json={

                "patientName": patient_name,

                "diseaseType": disease_type,

                "result": result.get("disease", ""),

                "confidence": result.get("confidence", 0),

                "status": result.get("status", ""),

                "recommendation": result.get("recommendation", ""),

                "imagePath": image_path

            },

            timeout=5

        )

        print(

            f"{disease_type} prediction stored."

        )

    except requests.exceptions.RequestException as e:

        print(

            "Prediction Save Failed:",

            str(e)

        )

# ==========================================================
# Home
# ==========================================================

@app.get("/")

def home():

    return {

        "success": True,

        "message": "AI Hospital Server Running Successfully"

    }
# ==========================================================
# HEART DISEASE PREDICTION
# ==========================================================

@app.post("/heart")

async def heart_prediction(

    file: UploadFile = File(...)

):

    validate_image(file.filename)

    file_path = save_upload(file)

    try:

        result = predict_heart(file_path)

        save_prediction(

            "Heart Disease",

            result,

            file_path

        )

        return {

            "success": True,

            **result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

    finally:

        remove_upload(file_path)


# ==========================================================
# LIVER DISEASE PREDICTION
# ==========================================================

@app.post("/liver")

async def liver_prediction(

    file: UploadFile = File(...)

):

    validate_image(file.filename)

    file_path = save_upload(file)

    try:

        result = predict_liver(file_path)

        save_prediction(

            "Liver Disease",

            result,

            file_path

        )

        return {

            "success": True,

            **result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

    finally:

        remove_upload(file_path)


# ==========================================================
# OCR REPORT READER
# ==========================================================

@app.post("/ocr")

async def report_ocr(

    file: UploadFile = File(...)

):

    validate_image(file.filename)

    file_path = save_upload(file)

    try:

        ocr_result = extract_text(file_path)

        return {

            "success": True,

            "filename": file.filename,

            **ocr_result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

    finally:

        remove_upload(file_path)
        
    # ==========================================================
# X-RAY PNEUMONIA DETECTION
# ==========================================================

@app.post("/xray")

async def xray_prediction(

    file: UploadFile = File(...)

):

    validate_image(file.filename)

    file_path = save_upload(file)

    try:

        result = detect_pneumonia(file_path)

        save_prediction(

            "Pneumonia",

            result,

            file_path

        )

        return {

            "success": True,

            **result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

    finally:

        remove_upload(file_path)


# ==========================================================
# KIDNEY STONE DETECTION
# ==========================================================

@app.post("/kidney")

async def kidney_prediction(

    file: UploadFile = File(...)

):

    validate_image(file.filename)

    file_path = save_upload(file)

    try:

        result = detect_kidney_stone(file_path)

        save_prediction(

            "Kidney Stone",

            result,

            file_path

        )

        return {

            "success": True,

            **result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

    finally:

        remove_upload(file_path)


# ==========================================================
# LUNG CANCER DETECTION
# ==========================================================

@app.post("/cancer")

async def lung_cancer_prediction(

    file: UploadFile = File(...)

):

    validate_image(file.filename)

    file_path = save_upload(file)

    try:

        result = detect_lung_cancer(file_path)

        save_prediction(

            "Lung Cancer",

            result,

            file_path

        )

        return {

            "success": True,

            **result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

    finally:

        remove_upload(file_path)
    # ==========================================================
# BRAIN TUMOR MRI DETECTION
# ==========================================================

@app.post("/brain-tumor")

async def brain_tumor_prediction(

    file: UploadFile = File(...)

):

    # Validate uploaded image
    validate_image(file.filename)

    # Save uploaded image
    file_path = save_upload(file)

    try:

        # CNN Prediction
        result = detect_brain_tumor(file_path)

        # Save prediction into MERN Backend
        save_prediction(

            "Brain Tumor",

            result,

            file_path

        )

        return {

            "success": True,

            **result

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

    finally:

        # Always remove uploaded image
        remove_upload(file_path)