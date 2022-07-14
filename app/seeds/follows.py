from app.models import db
from app.models.like import likes
from app.models.user import User
from app.models.riff import Riff

def seed_follows():

    demo = User.query.get(1)
    heavy = User.query.get(2)
    rock = User.query.get(3)
    space = User.query.get(4)

    
    demo.followed.extend([heavy, rock, space])
    heavy.followed.extend([rock])
    rock.followed.extend([heavy, space])
    space.followed.extend([heavy, rock, demo])

    # 1-6 demo
    # 7-9 heavy
    # 10-12 rock
    # 13-15 space

    db.session.commit()

def undo_follows():
    db.session.execute('TRUNCATE followers RESTART IDENTITY CASCADE;')
    db.session.commit()