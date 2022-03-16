import { objectType } from "nexus";

export const Vehicle = objectType({
  name: "Vehicle",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("make");
    t.nonNull.string("model");
    t.nonNull.string("color");
    t.nonNull.int("year");
    t.nonNull.int("plateNumber");
    t.nonNull.field("captain", {
      type: "Captain",
    });
  },
});
