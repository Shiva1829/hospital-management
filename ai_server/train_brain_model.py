import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Data generator
train_data = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

# Training set
train_generator = train_data.flow_from_directory(
    "dataset",
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="training"
)

# Validation set
val_generator = train_data.flow_from_directory(
    "dataset",
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="validation"
)

# CNN model
model = Sequential([

    Conv2D(
        32,
        (3, 3),
        activation='relu',
        input_shape=(224, 224, 3)
    ),

    MaxPooling2D(2, 2),

    Conv2D(
        64,
        (3, 3),
        activation='relu'
    ),

    MaxPooling2D(2, 2),

    Conv2D(
        128,
        (3, 3),
        activation='relu'
    ),

    MaxPooling2D(2, 2),

    Flatten(),

    Dense(
        128,
        activation='relu'
    ),

    Dropout(0.5),

    Dense(
        4,
        activation='softmax'
    )

])

# Compile model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=10
)

# Save model
model.save("models/brain_tumor_model.h5")

print("Model saved successfully.")