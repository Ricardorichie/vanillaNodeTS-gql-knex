import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import { expressjwt } from "express-jwt";
import * as jsonwebtoken from "jsonwebtoken";

const app = express();

app.use(
  "/protected",
  //@ts-ignore
  expressjwt({
    secret: "very long json web token pass phrase (){}/=12",
    algorithms: ["HS256"],
  }),
  (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("headers", token);
    if (token) {
      jsonwebtoken.verify(
        token,
        "very long json web token pass phrase (){}/=12",
        (err, decoded) => {
          if (err) {
            res.status(401);
            throw new Error("User is not authorized");
          }
          return res.send(`Welcome, ${JSON.stringify(decoded)} `);
        }
      );
    }
    // console.log("req", res);
    // // if (req?.) return res.send(`Welcome, ${JSON.stringify(req?.auth)} `);
  }
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listening on port 4000");
});
//for dev environment
// app.listen(process.env.PORT, () => {
//   console.log("Now listening on port ", process.env.PORT);
// });
