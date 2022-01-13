from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def login():
    return 'logged in'


@app.route("/logout")
def logout():
    return 'logged out'


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    return 'logged out'


@app.route('/settings', methods=['GET', 'POST'])
def settings():
    return 'logged out'


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True, host="0.0.0.0")