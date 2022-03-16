import { objectType } from "nexus";

export const Captain = objectType({
  name: "Captain",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("rating");
    t.nonNull.field("profile", {
      type: "Profile",
    });
  },
});
