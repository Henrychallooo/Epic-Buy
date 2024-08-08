from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)

# Load the GPT-Neo model and tokenizer
model_name = "EleutherAI/gpt-neo-1.3B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    inputs = tokenizer(user_input, return_tensors='pt')
    outputs = model.generate(inputs['input_ids'], max_length=150)
    response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run(port=5000)
