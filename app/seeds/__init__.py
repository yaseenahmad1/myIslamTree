from flask.cli import AppGroup
from .users import seed_users, undo_users
from .galleries import seed_galleries, undo_galleries
from .journals import seed_journals, undo_journals
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .follows import seed_follow, undo_follow

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_galleries()
        undo_journals()
        undo_comments()
        undo_likes()
        undo_follow()
    seed_users()
    seed_galleries()
    seed_journals()
    seed_comments()
    seed_likes()
    seed_follow()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_galleries()
    undo_journals()
    undo_comments()
    undo_likes()
    undo_follow()
    # Add other undo functions here
