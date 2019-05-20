import { mergeTypes } from "merge-graphql-schemas";

import User from "./User";
import Card from "./Card";
import MenuItem from "./MenuItem";

const typeDefs = [User, Card, MenuItem];

export default mergeTypes(typeDefs, { all: true });