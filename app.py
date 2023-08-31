import os
from flask import Flask, request, render_template
import replicate
from dotenv import load_dotenv
import base64

load_dotenv()

app = Flask(__name__, template_folder='templates')

def generate_caption(image_data):
    input_params = {
        "image": f"data:image/jpeg;base64,{base64.b64encode(image_data).decode()}",
        "caption": True,
        "question": "",
        "context": "",
        "use_nucleus_sampling": False,
        "temperature": 1.0
    }

    output = replicate.run(
        "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
        input=input_params
    )

    return output

@app.route('/', methods=['GET', 'POST'])
def index():
    caption_result = None

    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            image_data = image_file.read()
            caption_result = generate_caption(image_data)

    return render_template('index.html', caption_result=caption_result)

if __name__ == '__main__':
    app.run(debug=True)