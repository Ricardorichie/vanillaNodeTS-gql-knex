import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from "graphql";

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
        return authors.filter((a) => a.id === parent.authorId)[0];
      },
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
        return books.filter((b) => b.authorId === parent.id);
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
