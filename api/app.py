from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/', methods=['POST'])
def word_request():
	if (request.method == 'POST') & request.is_json:
		req_data = request.get_json()
		word = req_data['url']
	return jsonify({'word': word})


if __name__ == '__main__':
	app.run()
