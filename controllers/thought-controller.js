const { Thought } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    }
}

module.exports = thoughtController;