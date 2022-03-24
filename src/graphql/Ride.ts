//@ts-nocheck
import { objectType, extendType, nonNull, stringArg, intArg } from "nexus";

export const Ride = objectType({
  name: "Ride",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("captainId");
    t.nonNull.int("userId");
    t.nonNull.int("ratingId");
    t.nonNull.int("vehicleId");
    t.nonNull.string("startAddress");
    t.nonNull.string("dropOffAddress");
    t.int("fare", {
      resolve(_root, _args, _ctx) {
        return 5;
      },
    });
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

export const RideMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRide", {
      type: "Ride",
      args: {
        startAddress: nonNull(stringArg()),
        dropOffAddress: nonNull(stringArg()),
        captainId: nonNull(intArg()),
        userId: nonNull(intArg()),
        vehicleId: nonNull(intArg()),
      },
      async resolve(
        _root,
        { startAddress, dropOffAddress, captainId, userId, vehicleId },
        ctx
      ) {
        const ride = await ctx.prisma.ride.create({
          data: {
            startAddress,
            dropOffAddress,
            fare: 5,
            captain: {
              connect: {
                id: captainId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
            vehicle: {
              connect: {
                id: vehicleId,
              },
            },
            rating: {
              create: {
                rating: 5,
                userId,
                captainId,
              },
            },
          },
          include: {
            captain: true,
            user: true,
            vehicle: true,
            rating: true,
          },
        });
        return ride;
      },
    });
  },
});
