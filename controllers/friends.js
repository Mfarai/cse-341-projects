const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('friends').find();
  const friends = await result.toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(friends);
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('friends').find({ _id: userId });
    const friends = await result.toArray();
    if (friends.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(friends[0]);
    } else {
      res.status(404).json({ message: 'Friend not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching friend', error });
  }
};

const createFriend = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      color: req.body.color,
      city: req.body.city,
      ipaddress: req.body.ipaddress,
    };

    const response = await mongodb.getDatabase().db().collection('friends').insertOne(user);
    if (response.acknowledged) {
      res.status(201).send();
    } else {
      res.status(500).json({ message: 'Error while creating friend', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while creating friend', error });
  }
};

const updateFriend = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      color: req.body.color,
      city: req.body.city,
      ipaddress: req.body.ipaddress,
    };

    const response = await mongodb.getDatabase().db().collection('friends').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error while updating friend', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while updating friend', error });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('friends').deleteOne({ _id: userId });
    if (response.deleteCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error while deleting friend', error: response.error || 'Unknown error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting friend', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createFriend,
  updateFriend,
  deleteFriend,
};