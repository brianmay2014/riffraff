from ..models import db
from ..models.comment import Comment


comments = [
    {id: 1, "user_id": 2, "riff_id": 1, "text": "weird measure to throw in there, but it somehow fits?" },
    {id: 2, "user_id": 3, "riff_id": 2, "text": "Really has some calming midwest vibes" },
    {id: 3, "user_id": 4, "riff_id": 3, "text": "Make me think of making breakfast in the morning" },
    {id: 4, "user_id": 3, "riff_id": 4, "text": "try open chords based off these with some higher accents to make it feel like a chorus maybe?" },
    {id: 5, "user_id": 2, "riff_id": 5, "text": "maybe throw some breaks in there, some measures of 5/4 to keep the audience guessing" },
    {id: 6, "user_id": 4, "riff_id": 6, "text": "I feel like it could go with form and fortune" },
    {id: 7, "user_id": 1, "riff_id": 7, "text": "feels like the measures before a circle pit" },
    {id: 8, "user_id": 3, "riff_id": 8, "text": "something slow afterwards with lots of china cymbal, that's my two cents" },
    {id: 9, "user_id": 4, "riff_id": 9, "text": "i'd say the next part should be descending, it'd be fun to have it be almost like a mirror" },
    {id: 10, "user_id": 1, "riff_id": 10, "text": "throw some G in there, geez" },
    {id: 11, "user_id": 2, "riff_id": 11, "text": "Why not try D, C, E, G/F#" },
    {id: 12, "user_id": 4, "riff_id": 12, "text": "i love the 'womp womp womp' part, really brings it back to the start" },
    {id: 13, "user_id": 1, "riff_id": 13, "text": "love me a good C# to A" },
    {id: 14, "user_id": 2, "riff_id": 14, "text": "i feel like this would be amazing in surround sound" },
    {id: 15, "user_id": 3, "riff_id": 15, "text": "me neither, but i love what you've done with the place" },
    {id: 16, "user_id": 4, "riff_id": 1, "text": "love the pull off sound in here" },
    {id: 17, "user_id": 2, "riff_id": 2, "text": "this'd be nice with the windows down driving across the country" },
    {id: 18, "user_id": 3, "riff_id": 3, "text": "scramble some eggs and through some hammer ons, this breakfast is done" },
    {id: 19, "user_id": 4, "riff_id": 4, "text": "the disonance tastes delightful to my ears" },
    {id: 20, "user_id": 2, "riff_id": 5, "text": "like a happy little chugging, choo choo i say" },
    {id: 21, "user_id": 3, "riff_id": 6, "text": "love the enddisonance" },
    {id: 22, "user_id": 3, "riff_id": 7, "text": "i wanna mosh to this" },
    {id: 23, "user_id": 4, "riff_id": 8, "text": "this this shreds" },
    {id: 24, "user_id": 1, "riff_id": 9, "text": "i love this, i am losing my mind every time i listen to it" },
    {id: 25, "user_id": 3, "riff_id": 10, "text": "if this is called kites, i wanna fly it" },
    {id: 26, "user_id": 4, "riff_id": 11, "text": "i dig it, i dig it, i dig it" },
    {id: 27, "user_id": 1, "riff_id": 12, "text": "i bet you could make a song out of these two chords" },
    {id: 28, "user_id": 2, "riff_id": 13, "text": "dark, vibey, i like it" },
    {id: 29, "user_id": 3, "riff_id": 14, "text": "feels like the song is spinning around me" },
    {id: 30, "user_id": 1, "riff_id": 15, "text": "here i am wishing i paid more attention in music theory" },
    {id: 31, "user_id": 3, "riff_id": 1, "text": "maybe start the next phrase on an A and see where that takes you" },
    {id: 32, "user_id": 4, "riff_id": 2, "text": "definite 90s chicago" },
    {id: 33, "user_id": 2, "riff_id": 3, "text": "love the descent into the resolution" },
    {id: 34, "user_id": 3, "riff_id": 4, "text": "what capo are you on, cause i dig it" },
    {id: 35, "user_id": 4, "riff_id": 5, "text": "yeah i say play this before and the future" },
    {id: 36, "user_id": 2, "riff_id": 6, "text": "maybe this one goes with two part intro? to close it out? just spitballin" },
    {id: 37, "user_id": 4, "riff_id": 7, "text": "gnarly just gnarly" },
    {id: 38, "user_id": 1, "riff_id": 8, "text": "i say run this over and over into the ground" },
    {id: 39, "user_id": 3, "riff_id": 9, "text": "i feel like there's gotta be just a ton of noise after this" },
    {id: 40, "user_id": 4, "riff_id": 10, "text": "love the fast tempo, maybe make it faster tho?" },
    {id: 41, "user_id": 1, "riff_id": 11, "text": "more 9ths!!!" },
    {id: 42, "user_id": 2, "riff_id": 12, "text": "i like how patient it is" },
    {id: 43, "user_id": 3, "riff_id": 13, "text": "feels like i'm exploring the bottom of the ocean" },
    {id: 44, "user_id": 1, "riff_id": 14, "text": "makes me want to check out outer space" },
    {id: 45, "user_id": 2, "riff_id": 15, "text": "someone smarter than me would suggest a lot of chords with a lot of numbers after them" }
]

def seed_comments():
    seeder = [Comment.seed(comment) for comment in comments]
    db.session.add_all(seeder)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
