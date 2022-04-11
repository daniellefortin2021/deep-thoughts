const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
    // find one user 
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    //get al thoughts
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // find one thought
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  }
};

module.exports = resolvers;