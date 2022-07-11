from flask import Blueprint, jsonify, flash, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms.follow_form import FollowForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    print('*****/*/-/*-/*-/*-/*-/*-*/-*/-*/-/*-/*-/*-*/-/*-*/-/*-/*-/*-/*-/*-/*-*/-/*-/*-*/-*/-*/-*/-*/-*/-*/-/*-*/-')
    # print(id)
    print(current_user)
    user = User.query.get(id)
    print(user)
    print(user.username)
    # print(user.to_dict())
    return user.to_dict()



@user_routes.route('/follow/<followed_id>/', methods=['POST'])
@login_required
def follow(followed_id):
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter_by(id=followed_id).first()
        if user is None:
            flash('User {} not found.'.format(followed_id))
            # return redirect(url_for('riffs'))
        if user == current_user:
            flash('You cannot follow yourself!')
            # return redirect(url_for('/users/{}'.format(user.id)))
        current_user.follow(user)
        db.session.commit()
        flash('You are following {}'.format(user.username))
        return {'message': f"You are now following {user.username}"}, 200
    else:
        return {'errors': f"Error occurred while following, please try again"}, 500


@user_routes.route('/unfollow/<followed_id>/', methods=['POST'])
@login_required
def unfollow(followed_id):
    # print('*****/*/-/*-/*-/*-/*-/*-*/-*/-*/-/*-/*-/*-*/-/*-*/-/*-/*-/*-/*-/*-/*-*/-/*-/*-*/-*/-*/-*/-*/-*/-*/-/*-*/-')
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter_by(id=followed_id).first()
        if user is None:
            flash('User {} not found.'.format(followed_id))
            # return redirect(url_for('riffs'))
        if user == current_user:
            flash('You cannot unfollow yourself!')
            # return redirect(url_for('users/{}'.format(user.id)))
        current_user.unfollow(user)
        db.session.commit()
        flash('You are not following {}'.format(user.username))
        return {'message': f"You are no longer following {user.username}"}, 200
    else:
        return {'errors': f"Error occurred while following, please try again"}, 500


@user_routes.route('/follows/', methods=['GET'])
@login_required
def get_follows():
    # print('*****/*/-/*-/*-/*-/*-/*-*/-*/-*/-/*-/*-/*-*/-/*-*/-/*-/*-/*-/*-/*-/*-*/-/*-/*-*/-*/-*/-*/-*/-*/-*/-/*-*/-')
    # user = User.query.filter_by(id=followed_id).first()
    f_ids = current_user.get_following()
    # print('*****/*/-/*-/*-/*-/*-/*-*/-*/-*/-/*-/*-/*-*/-/*-*/-/*-/*-/*-/*-/*-/*-*/-/*-/*-*/-*/-*/-*/-*/-*/-*/-/*-*/-')
    return {f'{current_user.id}': f_ids['following_ids']}
    
