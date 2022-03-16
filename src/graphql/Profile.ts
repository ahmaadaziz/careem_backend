import { objectType } from "nexus";

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("gender");
    t.nonNull.string("address");
    t.nonNull.string("phone");
  },
});
