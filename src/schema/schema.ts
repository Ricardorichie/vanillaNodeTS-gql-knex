import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";

const books = [
  { title: "My book", id: "1", genre: "thriller", authorId: "1" },
  { title: "History of the World", id: "2", genre: "history", authorId: "1" },
  { title: "The book of stories", id: "3", genre: "fiction", authorId: "2" },
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
  }),
});
export default new GraphQLSchema({
  query: RootQuery,
});
