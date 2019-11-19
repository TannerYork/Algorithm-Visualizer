from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
    """Index page of the application"""
    return render_template('main.html', page="index")


@app.route('/sorting')
def sorting():
    """Page for visualizing sorting algorythms"""
    return render_template('main.html', page="sorting")

@app.route('/pathfinding')
def pathfinding():
    """Page for visualizing sorting algorythms"""
    return render_template('main.html', page="pathfinding")

if __name__ == '__main__':
    app.run(debug=True)