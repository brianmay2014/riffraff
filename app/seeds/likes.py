from app.models import db
from app.models.like import likes
from app.models.user import User
from app.models.riff import Riff

def seed_likes():


    demo = User.query.get(1)
    riff7 = Riff.query.get(7)
    riff10 = Riff.query.get(10)
    riff14 = Riff.query.get(14)
    demo.user_likes.extend([riff7, riff10, riff14])

    heavy = User.query.get(2)
    riff1 = Riff.query.get(1)
    riff3 = Riff.query.get(3)
    riff4 = Riff.query.get(4)
    riff11 = Riff.query.get(11)
    riff12 = Riff.query.get(12)
    
    heavy.user_likes.extend([riff1, riff3, riff4, riff10, riff11, riff12, riff14])


    rock = User.query.get(3)
    riff2 = Riff.query.get(2)
    riff5 = Riff.query.get(5)
    riff6 = Riff.query.get(6)
    riff9 = Riff.query.get(9)
    riff15 = Riff.query.get(15)
    
    rock.user_likes.extend([riff2, riff5, riff6, riff7, riff9, riff14, riff15])

    space = User.query.get(4)
    riff2 = Riff.query.get(2)
    riff5 = Riff.query.get(5)
    riff6 = Riff.query.get(6)
    riff9 = Riff.query.get(9)
    riff15 = Riff.query.get(15)
    
    space.user_likes.extend([riff1, riff2, riff5, riff6, riff7, riff9, riff10, riff11])

    # 1-6 demo
    # 7-9 heavy
    # 10-12 rock
    # 13-15 space

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()