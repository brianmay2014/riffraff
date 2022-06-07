from ..models import db
from ..models.riff import Riff



riffs = [
{id: 1, "title": "two part intro", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/1-warm.mp3", "user_id": 1, "note": "I see this one as a good opener, but not sure where to take it after this"},
{id: 2, "title": "calm enthusiasm", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/1-warm2.mp3", "user_id": 1, "note": "a slow progression back to where it starts"},
{id: 3, "title": "oil in the pan", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/1-warm3.mp3", "user_id": 1, "note": "lil twangy, lil tangy"},
{id: 4, "title": "downward spooky", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/1-warm4.mp3", "user_id": 1, "note": "I love the dissonance in here, but can't think of the next chords"},
{id: 5, "title": "form and fortune", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/1-warm5.mp3", "user_id": 1, "note": "eighth note fun for everyone"},
{id: 6, "title": "and the future", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/1-warm6.mp3", "user_id": 1, "note": "I love it, but it sounds like the end of the song"},
{id: 7, "title": "a slow headbanger", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/2-heavy.mp3", "user_id": 2, "note": "the old 0-1-4 in a drop D"},
{id: 8, "title": "mental manners", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/2-heavy2.mp3", "user_id": 2, "note": "a great little driving riff with a couple surprise break checks"},
{id: 9, "title": "12 dimensions", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/2-heavy3.mp3", "user_id": 2, "note": "all over the fretboard, and all 12 notes"},
{id: 10, "title": "kites", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/3-rocky.mp3", "user_id": 3, "note": "little poppy, little diminished 5th-y"},
{id: 11, "title": "EBA", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/3-rocky2.mp3", "user_id": 3, "note": "E7, B7, A7 - but what comes next??"},
{id: 12, "title": "waves in place", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/3-rocky3.mp3", "user_id": 3, "note": "open feel with a chromatic womp womp womp back into it"},
{id: 13, "title": "angel armadas", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/4-space.mp3", "user_id": 4, "note": "I could write in C# harmonic forever, sorry not sorry"},
{id: 14, "title": "ring service", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/4-space2.mp3", "user_id": 4, "note": "felt atmospheric tonight, what can i say"},
{id: 15, "title": "fun random chords", "link": "https://riff-raff.s3.us-west-1.amazonaws.com/seedsongs/4-space3.mp3", "user_id": 4, "note": "literally don't know the chords, or what chords should come next"}
]

def seed_riffs():
    seeder = [Riff.seed(riff) for riff in riffs]
    db.session.add_all(seeder)
    db.session.commit()

def undo_riffs():
    db.session.execute('TRUNCATE riffs RESTART IDENTITY CASCADE;')
    db.session.commit()