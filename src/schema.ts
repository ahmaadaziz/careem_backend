import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql/index";

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), "schmea.graphql"),
    typegen: join(process.cwd(), "nexus-typegen.ts"),
  },
  contextType: {
    module: join(process.cwd(), "./src/context.ts"),
    export: "Context",
  },
});
