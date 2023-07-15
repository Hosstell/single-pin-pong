from flask import Flask, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('login')
def handle_message(data):
    print('received message: ')
    print(data)

    socketio.emit('rotate', {
        "field": "Проверочные данные с сервера"
    })

@socketio.on('dataFromPhone')
def handle_message(data):
    socketio.emit('rotate', data)


@app.route("/create-game/")
def hello():
    print(request.data)
    return "Hello World!  21"


if __name__ == '__main__':
    socketio.run(
        app,
        host='0.0.0.0',
        port=3000
    )
