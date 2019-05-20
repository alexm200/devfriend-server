import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User";
import Card from "./Card";
import MenuItem from "./MenuItem";

const resolvers = [User, Card, MenuItem];

export default mergeResolvers(resolvers);