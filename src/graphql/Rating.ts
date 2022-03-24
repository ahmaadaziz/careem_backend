//@ts-nocheck
import { objectType, extendType, nonNull, stringArg, intArg } from "nexus";

export const Rating = objectType({
  name: "Rating",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("rating");
    t.nonNull.int("userId");
    t.nonNull.int("captainId");
    t.nonNull.field("user", {
      type: "User",
    });
    t.nonNull.field("captain", {
      type: "Captain",
    });
  },
});

export const RatingQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getRating", {
      type: "Rating",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, { id }, ctx) {
        return await ctx.prisma.rating.findUnique({
          where: {
            id,
          },
          include: {
            user: true,
            captain: true,
          },
        });
      },
    });
  },
});

// export const RatingMutation = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("createRating", {
//       type: "Rating",
//       args: {
//         captainId: nonNull(intArg()),
//         userId: nonNull(intArg()),
//       },
//       async resolve(_root, { captainId, userId}, ctx) {
//         const rating = await ctx.prisma.rating.create({
//           data: {
//             rating: 5,
//             captain: {
//               connect: {
//                 id: captainId,
//               },
//             },
//             user: {
//               connect: {
//                 id: userId,
//               },
//             },
//             ride: {
//               connect: {
//                 id: rideId,
//               },
//             },
//           },
//         });
//         return rating;
//       },
//     });
//   },
// });
