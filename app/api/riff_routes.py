from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Riff, Comment
from app.utils.validutils import validation_errors_to_error_messages
from app.forms.comment_form import CommentForm
from app.forms.riff_form import RiffForm
from app.utils.s3utils import upload_file_to_s3, allowed_file, get_unique_filename

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


@riff_routes.route('/new', methods=["POST"])
# @login_required
def post_riff():
    # print('/*-/*-/*-*-//*-*/-/*-/*-*-/-/**-/*-/*-//*-*-/*/-*-/*-/-*/*-/*-/*-/*-/*/-*-/*/-*-/*-/*-/*-/*-/-*/*-/*-/*-/in-route')
    if "link" not in request.files:
        return {"errors": "Riff file is required"}, 400

    link = request.files['link']

    print('////////////////before///////////////////////', link)

    if not allowed_file(link.filename):
        return {"errors": "File type not permitted"}, 400

    link.filename = get_unique_filename(link.filename)

    print('////////////////after///////////////////////', link)

    upload = upload_file_to_s3(link)

    print('|||||||||||||||||||||||||||||||||||||||||', upload)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        print('=======upload messed up')
        return upload, 400

    url = upload['url']
    
    form = RiffForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['link'].data = url

    print('---------------------------', form)

    if form.validate_on_submit():
        print('*-//*-*/-/*-/*-*-/-/**-/*-/*-//*-*-/*/-*-*-//*-*/-/*-/*-*-/-/**-/*-/*-//*-*-/*/-*-in validated form')
        riff = Riff()
        form.populate_obj(riff)
        db.session.add(riff)
        db.session.commit()
        
        return riff.to_dict()
    else:
        return {"errors": form.errors}, 403


@riff_routes.route('/<int:riff_id>/', methods=["DELETE"])
@login_required
def delete_riff(riff_id):
    """
    Deletes a riff from the database
    """
    riff = Riff.query.get(riff_id)
    db.session.delete(riff)
    db.session.commit()

    return f'Riff id number {riff_id} has been deleted'

@riff_routes.route('/<int:riff_id>', methods=["PATCH"])
@login_required
def edit_riff(riff_id):
    """
    Performs an update on a riff in the database
    """
    riff = Riff.query.get(riff_id)
    if not riff:
        return {"errors": f"No riff with is {riff_id} exists"}, 404
    else:
        form = RiffForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['user_id'].data = riff.user_id
        form['link'].data = riff.link
        if form.validate_on_submit():
            form.populate_obj(riff)
            db.session.add(riff)
            db.session.commit()
            return riff.to_dict()
        return {'errors': form.errors}, 403