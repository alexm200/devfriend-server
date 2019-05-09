import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User";
import Card from "./Card";

const resolvers = [User, Card];

export default mergeResolvers(resolvers);