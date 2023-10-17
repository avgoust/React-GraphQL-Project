import User from "./models/user.js";
const resolvers = {
    Query: {
        users: async () => {
            const users = User.find();
            return users;
        }
    },
    Mutation: {
        async createUser(_, userInput) {
            const { first_name, last_name, username, email_address } = userInput.input;
            const newUser = new User({
                first_name: first_name,
                last_name: last_name,
                email_address: email_address,
                username: username
            });
            const res = await newUser.save();
            return res;
        },
        async deleteUser(_, args) {
            const successfullyDeleted = (await User.deleteOne({ _id: args.id }))
                .deletedCount;
            if (successfullyDeleted) {
                return args.id;
            }
            return "DeleteFailed";
        },
        async updateUser(_, args) {
            const { first_name, last_name, username, email_address } = args.input;
            const newUser = await User.updateOne({ _id: args.id }, {
                first_name: first_name,
                last_name: last_name,
                email_address: email_address,
                username: username,
            });
            if (newUser.modifiedCount == 1) {
                return await User.findOne({ _id: args.id });
            }
        }
    }
};
export default resolvers;
