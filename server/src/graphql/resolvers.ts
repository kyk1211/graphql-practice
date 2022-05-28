import { ApolloError } from "apollo-server";
import database from "../../database/mockdb";

interface AddUser {
  name: string;
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    users: () => database.users,
    currentUser: (parent: any, args: { email: string }) =>
      database.users.filter((user) => user.email === args.email && user.isLogIn)[0],
  },
  Mutation: {
    addUser: (parent: any, args: { input: AddUser }) => {
      const isExist = database.users.find((user) => user.email === args.input.email);
      if (isExist !== undefined) {
        throw new ApolloError("이미 존재하는 이메일입니다");
      }
      const newUser = {
        ...args.input,
        isLogIn: false,
      };
      database.users.push(newUser);
      return newUser;
    },
    login: (parent: any, args: { email: string; password: string }) => {
      const user = database.users
        .filter((user) => user.email === args.email && user.password === args.password && !user.isLogIn)
        .map((user) => {
          Object.assign(user, { ...args, isLogIn: true });
          return user;
        })[0];

      return user;
    },
    logout: (parent: any, args: { email: string }) => {
      const user = database.users
        .filter((user) => user.email === args.email && user.isLogIn)
        .map((user) => {
          Object.assign(user, { ...args, isLogIn: false });
          return user;
        })[0];
      return user;
    },
    changePassword: (parent: any, args: { input: AddUser; newPassword: string }) => {
      const user = database.users
        .filter((user) => user.email === args.input.email && user.password === args.input.password)
        .map((user) => {
          Object.assign(user, { ...user, password: args.newPassword, isLogIn: false });
          return user;
        })[0];
      return user;
    },
  },
};

export default resolvers;
