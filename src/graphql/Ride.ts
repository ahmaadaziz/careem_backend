import { objectType } from "nexus";

export const Ride = objectType({
  name: "Ride",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("startAddress");
    t.nonNull.string("dropOffAddress");
    t.nonNull.int("fare");
    t.nonNull.field("captain", {
      type: "Captain",
    });
    t.nonNull.field("vehicle", {
      type: "Vehicle",
    });
    t.nonNull.field("user", {
      type: "User",
    });
    t.nonNull.field("rating", {
      type: "Rating",
    });
  },
});
