from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
# Load model directly
from transformers import AutoImageProcessor, AutoModelForObjectDetection,pipeline

processor = AutoImageProcessor.from_pretrained("facebook/detr-resnet-101")
model = AutoModelForObjectDetection.from_pretrained("facebook/detr-resnet-101")
pipe = pipeline("object-detection", model="facebook/detr-resnet-101",processor=processor) 

app = Flask(__name__)

CORS(app)

@app.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image file in the request!"}), 400

    image_file = request.files["image"]
    try:
        img = Image.open(image_file.stream)

        output = pipe(img)
        print(output)
        
        descriptions = set()
        
        for item in output:
           descriptions.add(f"{item['label']}")

        return jsonify({"description": ", ".join(descriptions)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)