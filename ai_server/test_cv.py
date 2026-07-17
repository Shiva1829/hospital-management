import cv2
import os

# Image path
image_path = "uploads/CBC.jpg"

print("Current Working Directory:", os.getcwd())
print("Image Path:", image_path)
print("File Exists:", os.path.exists(image_path))

# Read image
img = cv2.imread(image_path)

print("Image Object Type:", type(img))

if img is not None:
    print("✅ Image Loaded Successfully")
    print("Image Shape:", img.shape)
    print("Height:", img.shape[0])
    print("Width:", img.shape[1])
    print("Channels:", img.shape[2])

    # Optional: Display image
    cv2.imshow("Loaded Image", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

else:
    print("❌ OpenCV could not read the image.")
    print("Possible reasons:")
    print("1. Wrong image path")
    print("2. File does not exist")
    print("3. Image is corrupted")
    print("4. Unsupported image format")