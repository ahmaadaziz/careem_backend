import { objectType } from "nexus";

export const Rating = objectType({
  name: "Rating",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("rating");
    t.nonNull.field("ride", {
      type: "Ride",
    });
    t.nonNull.field("user", {
      type: "User",
    });
    t.nonNull.field("captain", {
      type: "Captain",
    });
  },
});
