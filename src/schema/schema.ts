import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
} from "graphql";

const books = [
  { title: "My book", id: "1", genre: "thriller", authorId: "1" },
  { title: "History of the World", id: "2", genre: "history", authorId: "1" },
  { title: "The book of stories", id: "3", genre: "fiction", authorId: "2" },
];
const authors = [
  { name: "Jack Jones", age: 55, rating: 5, id: "1" },
  { name: "Verna Frag", age: 60, rating: 5, id: "2" },
  { name: "Ron Tamara", age: 25, rating: 5, id: "3" },
  { name: "Ranji Imaan", age: 35, rating: 5, id: "4" },
];
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
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // parent.authorId;
        return authors.filter((a) => a.id === parent.authorId)[0];
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
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
        return books.filter((b) => b.id === args.id)[0];
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        ///where we do fetch from data
        return authors.filter((a) => a.id === args.id)[0];
      },
    },
  }),
});
export default new GraphQLSchema({
  query: RootQuery,
});
