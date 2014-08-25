""" This contains a list of all models used by Multiverse Miner"""

from mm import db
from flask import jsonify
import datetime


class Player(db.Model):
    """ Player object represents an individual user"""
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    oauth_id = db.Column(db.String(120), primary_key=True)
    inventory = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    lastLogin = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    # associated with player so the player can't create
    # multiple chars and have them all running at the same time.
    lastmine = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    lastscavenge = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    lastgather = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    characters = db.relationship("Character", backref='player')

    def update_collection(self, collectiontype):
        """ This method will verify the collectiontype is valid,
            then see if it's been long enough to update."""
        curtime = datetime.datetime.utcnow()
        waittime = datetime.timedelta(0, 5)  # 5 seconds
        if 'last'+collectiontype in self.__dict__:
            oldtime = getattr(self, 'last'+collectiontype)
            if oldtime + waittime < curtime:
                oldtime = curtime
                setattr(self, 'last'+collectiontype, oldtime)
            return jsonify(collectiontype=collectiontype,
                           lastrun=oldtime, result='success')
        else:
            return jsonify(collectiontype=collectiontype, result='failure',
                           message="invalid collection type")


class Character(db.Model):

    name = db.Column(db.String(64), primary_key=True)
    player_id = db.Column(db.ForeignKey('player.oauth_id'))

    # primary
    constitution = db.Column(db.Integer)
    dexterity = db.Column(db.Integer)
    luck = db.Column(db.Integer)
    perception = db.Column(db.Integer)
    strength = db.Column(db.Integer)

    # secondary
    accuracy = db.Column(db.Integer)
    attackSpeed = db.Column(db.Integer)
    counter = db.Column(db.Integer)
    critChance = db.Column(db.Integer)
    critPercentage = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    evasion = db.Column(db.Integer)
    health = db.Column(db.Integer)
    lootLuck = db.Column(db.Integer)
    miningLuck = db.Column(db.Integer)
    parry = db.Column(db.Integer)
    regeneration = db.Column(db.Integer)
    resillience = db.Column(db.Integer)
    scavengeLuck = db.Column(db.Integer)
    shipSpeed = db.Column(db.Integer)

    # experience
    characterExperience = db.Column(db.Integer)
    craftingExperience = db.Column(db.Integer)
    lootExperience = db.Column(db.Integer)
    miningExperience = db.Column(db.Integer)
    scavengingExperience = db.Column(db.Integer)

    # tbd
    # inventory
    # skills
    # gear
    # weapon
    def __repr__(self):
        return '<Player %r>' % (self.username)


class Category(db.Model):
    id = db.Column(db.String(64), primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    parent_id = db.Column(db.ForeignKey('category.id'))
    parent = db.relationship("Category")

    def __repr__(self):
        return '<Category %r>' % (self.name)


class Ingredient(db.Model):
    __tablename__ = 'ingredient'

    recipe_id = db.Column(db.ForeignKey('item.id'), primary_key=True)
    item_id = db.Column(db.ForeignKey('item.id'), primary_key=True)
    amount = db.Column(db.Integer)

    recipe = db.relationship("Item", backref='ingredients',
                             foreign_keys=[recipe_id])
    item = db.relationship("Item", backref='usedIn', foreign_keys=[item_id])

    db.PrimaryKeyConstraint('recipe_id', 'item_id', name='ingredient_pk')


class Item(db.Model):
    id = db.Column(db.String(64), primary_key=True)
    name = db.Column(db.String(64), unique=True)
    category_id = db.Column(db.ForeignKey('category.id'))

    accuracy = db.Column(db.Float)
    attack = db.Column(db.Float)
    attackSpeed = db.Column(db.Float)
    autoGather = db.Column(db.Float)
    autoMine = db.Column(db.Float)
    autoProduce = db.Column(db.ForeignKey('item.id'))
    autoRefine = db.Column(db.Float)
    autoScavenge = db.Column(db.Float)
    defense = db.Column(db.Float)
    description = db.Column(db.Text)
    droprate = db.Column(db.Float)
    evasion = db.Column(db.Float)
    experience = db.Column(db.Integer)
    gearType = db.Column(db.String(64))
    health = db.Column(db.Float)
    lootLuck = db.Column(db.Float)
    minimumMiningLevel = db.Column(db.Integer)
    miningLuck = db.Column(db.Float)
    perception = db.Column(db.Float)
    planetLimit = db.Column(db.Float)
    regeneration = db.Column(db.Float)
    resilience = db.Column(db.Float)
    scavengeLuck = db.Column(db.Float)
    shipSpeed = db.Column(db.Float)
    storagelimit = db.Column(db.Integer)
    strength = db.Column(db.Float)
    value = db.Column(db.Integer)

    category = db.relationship('Category', backref='items')

    def __repr__(self):
        return '<Item %r>' % (self.name)