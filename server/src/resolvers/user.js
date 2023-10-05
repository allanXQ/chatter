const user = {
  Query: {
    users: async (parent, args, { models }) => {
      //   return await models.User.find({});
    },
    user: async (parent, { id }, { models }) => {
      //   return await models.User.findById(id);
    },
    me: async (parent, args, { models, user }) => {
      //   return await models.User.findById(user.id);
    },
    Mutation: {
      signUp: async (parent, { username, email, password }, { models }) => {
        // const user = await models.User.create({
        //   username,
        //   email,
        //   password,
        // });
        // return { token: createToken(user, process.env.SECRET, "30m") };
      },
    },
  },
};

module.exports = user;
