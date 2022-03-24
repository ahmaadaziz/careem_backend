//@ts-nocheck
import { objectType, extendType, nonNull, intArg, stringArg } from "nexus";

export const Captain = objectType({
  name: "Captain",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("profileId");
    t.int("rating");
    t.nonNull.field("profile", {
      type: "Profile",
    });
  },
});

export const CaptainQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getCaptain", {
      type: "Captain",
      args: {
        id: nonNull(intArg()),
      },
      //@ts-ignore
      async resolve(_root, args, ctx) {
        const captain = await ctx.prisma.captain.findUnique({
          where: {
            id: args.id,
          },
          include: {
            profile: true,
          },
        });
        return captain;
      },
    });
  },
});

export const CaptainMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCaptain", {
      type: "Captain",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        gender: nonNull(stringArg()),
        address: nonNull(stringArg()),
        phone: nonNull(stringArg()),
        rating: intArg(),
      },
      //@ts-ignore
      async resolve(_root, args, ctx) {
        const captain = await ctx.prisma.captain.create({
          data: {
            rating: 0,
            profile: {
              create: { ...args },
            },
          },
          include: {
            profile: true,
          },
        });
        return captain;
      },
    });
  },
});
