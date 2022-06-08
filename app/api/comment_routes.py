from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Riff, Comment
from app.utils.validutils import validation_errors_to_error_messages
from app.forms.comment_form import CommentForm

# will need to import forms
# from app.forms.yadayada
#prolly need something for s3
# from ..utils.s3utils import  upload_file_to_s3, allowed_file, get_unique_filename

comment_routes = Blueprint('comments', __name__)

# get '/riffs'
@comment_routes.route('/')
def comments():
    all_comments = Comment.query.all()
    # print(all_comments)
    return {'comments': [comment.to_dict() for comment in all_comments]}


@comment_routes.route('/<int:id>', methods=["DELETE"])
def delete_comment(id):

    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()

    return f'Comment id:{id} deleted'


@comment_routes.route('/<int:id>', methods=["PATCH"])
def edit_comment(id):
    """
    Edits a comment
    """





    comment = Comment.query.get(id)
    if not comment:
        return {"errors": f"No comment with id {id} exists"}, 404
    else:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['user_id'].data = comment.user_id
        form['riff_id'].data = comment.riff_id
        if form.validate_on_submit():
            form.populate_obj(comment)
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
        return {'errors': form.errors}, 403
