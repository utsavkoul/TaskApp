from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)

    def like(self):
        self.likes += 1
        
    def dislike(self):
        self.dislikes += 1
        
    def __repr__(self):
        return f'<Comment {self.text}>'
    
with app.app_context():
    db.create_all()
@app.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return {
        'comments': [
            {
                'id': comment.id,
                'text': comment.text,
                'username': comment.username,
                'likes': comment.likes,
                'dislikes': comment.dislikes
            } for comment in comments
        ]
    }
@app.route('/addcomment', methods=['POST'])
def add_comment():
    
        data = request.get_json()
        new_comment = Comment(
            text=data.get('text'),
            username=data.get('username')
        )
        db.session.add(new_comment)
        db.session.commit()
        return {'message': 'Comment added successfully!'}, 201
@app.route('/likecomment/<int:comment_id>', methods=['POST'])
def like_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    comment.like()
    db.session.add(comment)
    db.session.commit()
    return {'message': 'Comment liked successfully!', 'likes': comment.likes}
@app.route('/dislikecomment/<int:comment_id>', methods=['POST'])
def dislike_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    comment.dislike()
    db.session.add(comment)
    db.session.commit()
    return {'message': 'Comment disliked successfully!', 'dislikes': comment.dislikes}
@app.route('/deletecomment/<int:comment_id>', methods=['POST'])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment deleted successfully!'}
if __name__ == '__main__':
    app.run(debug=True)