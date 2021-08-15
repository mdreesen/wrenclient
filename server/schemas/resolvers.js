const { User, Admin, Feeling } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// NOTES
// resolvers is an object with a query nested inside that holds a series of methods
// these methods get the same name of the query or mutation they are resolvers
// Parent - This is if we used nested resolvers to handle more complicated actions, as it would hold the reference to the resolver that executed the nested resolver function
// args - This is an object of all the values passed into a query or mutation request as parameters. We destructured the "email" parameter our to be used
// context - If we were to need the same data to be accessible by all resolvers, such as a logged-in user's status or API access token, this data will come through this contect parameter as an object.
// info - This will contain extra information about an operations current state. This isnt used as frequent, but it can be implemented for more advanced uses.

const resolvers = {
  Query: {
    // Test Query for "Hello World"
    helloWorld: () => {
      return 'Hello World';
    },

    // Logged in user information
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('feelings')
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    // -=- User Resolvers -=- //
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('feelings')
    },

    // Getting user by email
    user: async (parent, { email }) => {
      return User.findOne({ email })
        .select('-__v -password')
        .populate('feelings')
    },

    // Getting user be username
    userTwo: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('feelings')
    },

    // getting all feelings
    feelings: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Feeling.find(params).sort({ createdAt: -1 });
    },

    // get one feeling
    feeling: async (parent, { email }) => {
      return Feeling.findOne({ email });
    },

    // -=- Birthworker Resolvers -=- //
    // Logged in birthworker information
    viewAdmin: async (parent, args, context) => {
      if (context.admin) {
        const adminData = await Admin.findOne({ _id: context.admin._id })
          .select('-__v -password')
        return adminData;
      }
      throw new AuthenticationError('Not logged in');
    },

    // Logged in user information
    // worker: async (parent, args, context) => {
    //   if (context.user) {
    //     const userData = await User.findOne({ _id: context.birthworker._id })
    //       .select('-__v -password')
    //     return userData;
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },

    // Getting birthworker by email
    admin: async (parent, { email }) => {
      return Admin.findOne({ email })
        .select('-__v -password')
    },

    admins: async () => {
      return Admin.find()
        .select('-__v -password')
    },
  },

  Mutation: {
    // -=- User Mutations -=-
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    userLogin: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addFeeling: async (parent, args, context) => {
      if (context.user) {
        const feeling = await Feeling.create({ ...args, email: context.user.email });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { feelings: feeling._id } },
          { new: true }
        );
        return feeling;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // -=- BirthWorker Mutations -=-
    addAdmin: async (parent, args) => {
      const admin = await Admin.create(args);
      const token = signToken(admin);
      return { token, admin };
    },

    adminLogin: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const correctPw = await admin.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const token = signToken(admin);
      return { token, admin };
    },
  }
};

module.exports = resolvers;