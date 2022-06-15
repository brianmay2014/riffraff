from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Riff, Comment
from app.utils.validutils import validation_errors_to_error_messages
from app.forms.comment_form import CommentForm
from app.forms.riff_form import RiffForm
from app.utils.s3utils import upload_file_to_s3, allowed_riff_file, get_unique_filename

# will need to import forms
# from app.forms.yadayada
#prolly need something for s3
# from ..utils.s3utils import  upload_file_to_s3, allowed_file, get_unique_filename

riff_routes = Blueprint('riffs', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            # errorMessages.append(f'{field} : {error}')
            errorMessages.append(f'{error}')
    return errorMessages



# get '/riffs'
@riff_routes.route('/')
def riffs():
    all_riffs = Riff.query.all()
    
    # print(all_riffs)
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
        # print('------*-/*-/-/*-*//*-*-/-----------')
        # print(form)

        if form.validate_on_submit():
            comment = Comment()
            form.populate_obj(comment)
            db.session.add(comment)
            db.session.commit()
            
            return comment.to_dict()
        else:
            # print('-------*-*/-/*-*/-*/-*/-----/*/-*-/*-*/-*/-*/', form.errors)
            return {"errors": validation_errors_to_error_messages(form.errors)}, 403


@riff_routes.route('/new', methods=["POST"])
# @login_required
def post_riff():
    if "link" not in request.files:
        return {"errors": validation_errors_to_error_messages({'link.file': ["Riff file is required"]})}, 400
        # return {"errors": "Riff file is required"}, 400

    link = request.files['link']

    if not allowed_riff_file(link.filename):
        return {"errors": validation_errors_to_error_messages({'link.filename': ["File type not permitted"]})}, 400
        # return {"errors": "File type not permitted"}, 400

    link.filename = get_unique_filename(link.filename)

    upload = upload_file_to_s3(link)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload['url']
    
    form = RiffForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['link'].data = url


    if form.validate_on_submit():
        riff = Riff()
        form.populate_obj(riff)
        db.session.add(riff)
        db.session.commit()
        
        return riff.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 403


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
        return {"errors": f"No riff with id {riff_id} exists"}, 404
    else:
        form = RiffForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['user_id'].data = riff.user_id
        form['link'].data = riff.link
        # print('-----**//*-*-/*-//*-/-*/*-*/-*-/*/-*/-/*---------',form)
        # print('-----**//*-*-/*-//*-/-*/*-*/-*-/*/-*/-/*---------',form.data)
        if form.validate_on_submit():
            # print('---*-*--a-sdf--*-*-**-asd*f*-/*-/asdfa/*-dsf*-/asdf/*-asd-f*asd*f*/-asdfa/*sdf-*/adsf')
            form.populate_obj(riff)
            db.session.add(riff)
            db.session.commit()
            return riff.to_dict()
        # print('-----**//*-*-/*-//*-/-*/*-*/-*-/*/-*/-/*---------',form.data)
        # print('errors-----**//*-*-/*-//*-/-*/*-*/-*-/*/-*/-/*---------',form.errors)
        return {"errors": validation_errors_to_error_messages(form.errors)}, 403

@riff_routes.route('/<int:riff_id>')
@login_required
def user(riff_id):
    riff = Riff.query.get(riff_id)
    return riff.to_dict()
