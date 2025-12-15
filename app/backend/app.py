from flask import Flask, request
from sqlalchemy.types import JSON
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test1.db'
db = SQLAlchemy(app)
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)
    # timeStamp = db.Column(db.DateTime)
    # task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=True)
    def like(self):
        self.likes += 1
        
    def dislike(self):
        self.dislikes += 1
        
    def __repr__(self):
        return f'<Comment {self.text}>'
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    # comments = db.relationship('Comment', backref='task', lazy=True)
    # comments = db.Column(db.Array(db.String), default=[])
    comments = db.Column(JSON, nullable=True)
    # timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    def __repr__(self):
        return f'<Task {self.title}>'
with app.app_context():
    db.create_all()


@app.route('/addtask', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(
        title=data.get('title'),
        description=data.get('description'),
        # timestamp=datetime.datetime.now()
        # comments=[]
    )
    db.session.add(new_task)
    db.session.commit()
    return {'message': 'Task added successfully!'}, 201
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return (
        [
            {
                'id': task.id,
                'title': task.title,
                'description': task.description,
                # 'timestamp': task.timestamp,
                # 'comments': task.comments
            } for task in tasks
        ]
    )
    
@app.route('/deletetask/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return {'message': 'Task deleted successfully!'}
@app.route('/getcomment/<int:task_id>', methods=['GET'])
def get_comments(task_id):
    task = Task.query.get_or_404(task_id)
    # comments = Comment.query.filter_by(id=task.comments).all()
    return {
        'comments': task.comments
        
    }
@app.route('/addcomment/<int:task_id>', methods=['POST'])
def add_comment(task_id):
    
        data = request.get_json()
        task = Task.query.get_or_404(task_id)
        new_comment = Comment(
            text=data.get('text'),
            username=data.get('username')
            
            # timeStamp = datetime.datetime.now()
        )
        # task.comments.append(new_comment)
        # comment = Comment(
        #     text=data.get('text'),
        #     username=data.get('username')
        # )
        task.comments.append([new_comment])
        # comments = [{
        #     'id': new_comment.id,
        #     'text': new_comment.text,
        #     'username': new_comment.username,
        #     'likes': new_comment.likes,
        #     'dislikes': new_comment.dislikes
        # }]
        db.session.add(task)
        db.session.commit()
        # comment = Comment.query.filter_by(text=data.get('text'), username=data.get('username')).first()
        # task.comments = comment.id
        # db.session.add(task)
        
        # db.session.commit()
        return {'message': 'Comment added successfully!'}, 201
@app.route('/likecomment/<int:taski_id>/<int:comment_id>', methods=['POST'])
def like_comment(task_id,comment_id):
    comment = Task.query.get_or_404(task_id).query.get_or_404(comment_id)
    comment.like()
    db.session.add(comment)
    db.session.commit()
    return {'message': 'Comment liked successfully!', 'likes': comment.likes}
@app.route('/dislikecomment/<int:task_id>/<int:comment_id>', methods=['POST'])
def dislike_comment(task_id,comment_id):
    comment = Task.query.get_or_404(task_id).query.get_or_404(comment_id)
    comment.dislike()
    db.session.add(comment)
    db.session.commit()
    return {'message': 'Comment disliked successfully!', 'dislikes': comment.dislikes}
@app.route('/deletecomment/<int:task_id>/<int:comment_id>', methods=['POST'])
def delete_comment(task_id,comment_id):
    task = Task.query.get_or_404(task_id)
    comment = task.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment deleted successfully!'}
if __name__ == '__main__':
    app.run(debug=True)