from app.models import db, User
from datetime import datetime

# users = [
# {id: 1, "email": "demo@demo.com", "username": "demoriffer", "password": "password", "pic_url": "", "bio": "demo user for riffraff", "created_at": datetime.now, "updated_at": datetime.now },
# {id: 2, "email": "heavy@heavy.com", "username": "heavyriffer", "password": "thrasher", "pic_url": "", "bio": "just here to write something to head bang to", "created_at": datetime.now, "updated_at": datetime.now },
# {id: 3, "email": "rock@rock.com", "username": "rocknriffer", "password": "rocker", "pic_url": "", "bio": "love my distortion as much as the next guy", "created_at": datetime.now, "updated_at": datetime.now },
# {id: 4, "email": "space@space.com", "username": "spacedriffer", "password": "spacer", "pic_url": "", "bio": "i cannot seem to stop buying pedals, send help", "created_at": datetime.now, "updated_at": datetime.now }
# ]

# Adds a demo user, you can add other users here if you want
def seed_users():

    latla = datetime.now

    print(latla)
    print(type(latla))

    demo = User(
        username='demo',
        email='demo@demo.com',
        password='password',
        pic_url='https://riff-raff.s3.us-west-1.amazonaws.com/images/demo.png',
        bio='demo user for riffraff',
        created_at=datetime.now(),
        updated_at=datetime.now())
    heavy = User(
        username='heavyriffer',
        email='heavy@heavy.com',
        password='thrasher',
        pic_url='https://riff-raff.s3.us-west-1.amazonaws.com/images/metal.png',
        bio='just here to write something to head bang to',
        created_at=datetime.now(),
        updated_at=datetime.now())
    rock = User(
        username='rocknriffer',
        email='rock@rock.com',
        password='rocker',
        pic_url='https://riff-raff.s3.us-west-1.amazonaws.com/images/rock.png',
        bio='love my distortion as much as the next guy',
        created_at=datetime.now(),
        updated_at=datetime.now())
    space = User(
        username='spacedriffer',
        email='space@space.com',
        password='spacer',
        pic_url='https://riff-raff.s3.us-west-1.amazonaws.com/images/space.png',
        bio='i cannot seem to stop buying pedals, send help',
        created_at=datetime.now(),
        updated_at=datetime.now())


    db.session.add(demo)
    db.session.add(heavy)
    db.session.add(rock)
    db.session.add(space)

    # seeder = [User.seed(user) for user in users]
    # db.session.add_all(seeder)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
