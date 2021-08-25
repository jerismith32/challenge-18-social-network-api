const { User } = require('../models');

const userController = {
    // Gets All Users
    getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
    
      // Gets One User By Id
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
    
      // Creates a New User
      createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
    
      // Updates User by Id (just the username)
      updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    
      // Deletes User By Id
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

      // Adds a Friend to the User (from the database another user with an ID)
      addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $addToSet: { friends: params.friendsId } },
          { new: true }
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
      },

      // Removes a Friend from the User's Friend Count and Friend List
      removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendsId } },
          { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
      }

};

module.exports = userController;