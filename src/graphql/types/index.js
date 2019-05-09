import { mergeTypes } from "merge-graphql-schemas";

import User from "./User";
import Card from "./Card";

const typeDefs = [User, Card];

export default mergeTypes(typeDefs, { all: true });