"""create likes table

Revision ID: 8efaba6caa30
Revises: b97f3d2b86b5
Create Date: 2022-07-13 14:50:57.595434

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8efaba6caa30'
down_revision = 'b97f3d2b86b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('likes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('riff_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['riff_id'], ['riffs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'riff_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    # ### end Alembic commands ###
