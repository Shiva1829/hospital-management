import os
from OCR.report_reader import extract_text

# Image path
image_path = "uploads/CBC.jpg"

print("=" * 50)
print("AI Hospital OCR Test")
print("=" * 50)

print("Current Working Directory:", os.getcwd())
print("Image Path:", image_path)
print("File Exists:", os.path.exists(image_path))

if not os.path.exists(image_path):
    print("❌ Image not found.")
    exit()

try:

    result = extract_text(image_path)

    print("\nOCR Result")
    print("-" * 50)

    if isinstance(result, dict):

        print("Success:", result.get("success"))

        print("\nExtracted Text:\n")

        print(result.get("text"))

        if result.get("summary"):
            print("\nSummary:\n")
            print(result.get("summary"))

        if result.get("detected_values"):
            print("\nDetected Values:")
            for key, value in result["detected_values"].items():
                print(f"{key}: {value}")

    else:

        print(result)

except Exception as e:

    print("\nOCR Failed")
    print(str(e))