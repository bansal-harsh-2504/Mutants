from flask import Flask, request, jsonify
import subprocess
import re

app = Flask(__name__)


@app.route('/pull_image', methods=['POST'])
def pull_image():
    image_name = request.json.get('image_name')
    if image_name:
        output = execute_command(f"docker pull {image_name}")
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Image name is required.'}), 400


@app.route('/run_container', methods=['POST'])
def run_container():
    image_name = request.json.get('image_name')
    container_command = request.json.get('command')
    if image_name:
        command = f"docker run -dit {image_name}" + (f" {container_command}" if container_command else "")
        output = execute_command(command)
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Image name is required.'}), 400


@app.route('/delete_image', methods=['POST'])
def delete_image():
    image_id = request.json.get('image_id')
    if image_id:
        output = execute_command(f"docker rmi {image_id}")
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Image ID or name is required.'}), 400


@app.route('/remove_container', methods=['POST'])
def remove_container():
    container_id = request.json.get('container_id')
    if container_id:
        output = execute_command(f"docker rm {container_id}")
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Container ID is required.'}), 400


@app.route('/stop_container', methods=['POST'])
def stop_container():
    container_id = request.json.get('container_id')
    if container_id:
        output = execute_command(f"docker stop {container_id}")
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Container ID is required.'}), 400


@app.route('/start_container', methods=['POST'])
def start_container():
    container_id = request.json.get('container_id')
    if container_id:
        output = execute_command(f"docker start {container_id}")
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Container ID is required.'}), 400


@app.route('/display_images', methods=['GET'])
def display_images():
    output = execute_command("docker images")
    return jsonify({'output': output}), 200


@app.route('/display_containers', methods=['GET'])
def display_containers():
    output = execute_command("docker ps -a")
    return jsonify({'output': output}), 200


@app.route('/get_memory_usage', methods=['POST'])
def get_memory_usage():
    container_id = request.json.get('container_id')
    if container_id:
        output = execute_command(f"docker stats --no-stream --format '{{{{.MemUsage}}}}' {container_id}")
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Container ID is required.'}), 400


@app.route('/get_cpu_usage', methods=['POST'])
def get_cpu_usage():
    container_id = request.json.get('container_id')
    if container_id:
        output = execute_command(f"docker stats --no-stream --format '{{{{.CPUPerc}}}}' {container_id}")
        return jsonify({'output': output}), 200
    else:
        return jsonify({'error': 'Container ID is required.'}), 400


def execute_command(command):
    process = subprocess.Popen(command.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = process.communicate()
    if output:
        return output.decode()
    if error:
        return error.decode()

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
