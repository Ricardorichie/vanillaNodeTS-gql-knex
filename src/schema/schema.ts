import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import db from "../database/db";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcryptjs";
import generateToken from "../helpers/generateToken";
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    // 1:1 relationship
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // parent.authorId;
        return db()
          .select("*")
          .from("authors")
          .where("id", parent.authorId)
          .first();
        // .filter((a) => a.id === parent.authorId)[0];
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  }),
});
const AuthPayloadType = new GraphQLObjectType({
  name: "AuthpayLoad",
  fields: () => ({
    token: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
    },
  }),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    rating: {
      type: GraphQLInt,
    },
    //1:M relationship with query list
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return db().select("*").from("books").where("authorId", parent.id);
        // .first();
        // return books.filter((b) => b.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        ///where we do fetch from data
        return db().select().from("books").where("id", args.id).first();
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        ///where we do fetch from data
        return db().select().from("authors").where("id", args.id).first();
        // return authors.filter((a) => a.id === args.id)[0];
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    registerUser: {
      type: AuthPayloadType,
      args: {
        username: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const { username, email, password } = args;
        const id = uuid();
        await db("users").insert({
          id,
          username,
          email,
          password: await bcrypt.hash(password, 10),
        });
        const token = generateToken(id, email);
        return {
          token,
          user: {
            id,
            username,
            email,
          },
          message: "User registered correctly",
        };
      },
    },
  }),
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
