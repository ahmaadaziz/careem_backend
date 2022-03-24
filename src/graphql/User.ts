//@ts-nocheck
import { objectType, extendType, intArg, stringArg, nonNull } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("profileId");
    t.nonNull.field("profile", {
      type: "Profile",
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getUser", {
      type: User,
      args: {
        id: nonNull(intArg()),
      },
      //@ts-ignore
      async resolve(_root, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: args.id,
          },
          include: {
            profile: true,
          },
        });
        return user;
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        gender: nonNull(stringArg()),
        address: nonNull(stringArg()),
        phone: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(_root, args, ctx) {
        const user = await ctx.prisma.user.create({
          data: {
            profile: {
              create: { ...args },
            },
          },
          include: {
            profile: true,
          },
        });
        return user;
      },
    });
  },
});
