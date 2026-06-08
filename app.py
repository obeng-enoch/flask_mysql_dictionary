from flask import Flask, render_template, url_for, request
from flaskext.mysql import MySQL
import datetime
import pymysql.cursors

app = Flask(__name__)

app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_DB'] = 'dictionary'
app.config['MYSQL_DATABASE_USER'] = 'obeng-mensah'
app.config['MYSQL_DATABASE_PASSWORD'] = 'EOMensah-58'

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route('/', methods=['GET', 'POST'])
def index():
    user_response = ''
    if request.method == 'POST':
        user_input = request.form['word']
        conn = mysql.get_db()
        cur = conn.cursor()
        cur.execute('SELECT meaning FROM word WHERE word = %s', (user_input))
        rv = cur.fetchall()
        user_response = rv[0]['meaning']

    return render_template('index.html', user_response=user_response)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)