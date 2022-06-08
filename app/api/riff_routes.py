from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Riff, Comment
from app.utils.validutils import validation_errors_to_error_messages
from app.forms.comment_form import CommentForm

# will need to import forms
# from app.forms.yadayada
#prolly need something for s3
# from ..utils.s3utils import  upload_file_to_s3, allowed_file, get_unique_filename

riff_routes = Blueprint('riffs', __name__)

# get '/riffs'
@riff_routes.route('/')
def riffs():
    all_riffs = Riff.query.all()
    print(all_riffs)
    return {'riffs': [riff.to_dict() for riff in all_riffs]}


@riff_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def post_comment(id):
    riff = Riff.query.get(id)
    if not riff:
        return {'errors': f"No riff with id number {id} exists"}, 404
    else:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            comment = Comment()
            form.populate_obj(comment)
            db.session.add(comment)
            db.session.commit()
            
            return comment.to_dict()
        else:
            return {"errors": form.errors}, 403




# @riff_routes.route('/<int:id>/comments')
# def comments(id):
#     print('============', id)
#     riff = riff = Riff.query.get(id)
#     print('-*/-*/-*/-*/-*/-*/', riff)
#     if not riff:
#         return {"errors": f"No riffs with id number {id} exists"}, 404
#     else:
#         comments = riff.comments
#         print('comments-*//*-/*-*-/*-//*-/*-*-/*-/*-/-/*-/*-/*/*-*-/', comments)
#         return {"comments" : [comment.to_dict() for comment in comments]}

