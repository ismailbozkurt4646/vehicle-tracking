from flask import Flask, render_template, jsonify
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://ismail--gps-default-rtdb.firebaseio.com/"
})

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/vehicles")
def vehicles():
    ref = db.reference("vehicles")
    return jsonify(ref.get())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
