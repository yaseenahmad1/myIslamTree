"""add first_name and last_name to users

Revision ID: 5617266c604a
Revises: e7670b7459ef
Create Date: 2025-08-15 17:58:45.926838

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5617266c604a'
down_revision = 'e7670b7459ef'
branch_labels = None
depends_on = None


def upgrade():
    # Add first_name and last_name columns to users table
    op.add_column('users', sa.Column('first_name', sa.String(length=40), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(length=40), nullable=False))


def downgrade():
    # Remove first_name and last_name columns if rolling back
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
