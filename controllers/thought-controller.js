const { Thought } = require('../models');

const thoughtController = {
    // Gets All Thoughts
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    // Creates a New Thought
    createThought({ body }, res) {
        Thought.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
    },

    // Get Thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
}

module.exports = thoughtController;