//@ts-nocheck
import { objectType, extendType, intArg, stringArg, nonNull } from "nexus";

export const Vehicle = objectType({
  name: "Vehicle",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("captainId");
    t.nonNull.string("make");
    t.nonNull.string("model");
    t.nonNull.string("color");
    t.nonNull.string("plateNumber");
    t.nonNull.int("year");
    t.nonNull.field("captain", {
      type: "Captain",
    });
  },
});

export const VehicleQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getVehicle", {
      type: "Vehicle",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        return await ctx.prisma.vehicle.findUnique({
          where: {
            id: args.id,
          },
          include: {
            captain: true,
          },
        });
      },
    });
  },
});

export const VehicleMutaion = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createVehicle", {
      type: "Vehicle",
      args: {
        make: nonNull(stringArg()),
        model: nonNull(stringArg()),
        color: nonNull(stringArg()),
        plateNumber: nonNull(stringArg()),
        year: nonNull(intArg()),
        captainId: nonNull(intArg()),
      },
      //@ts-ignore
      async resolve(
        _root,
        { make, model, color, plateNumber, year, captainId },
        ctx
      ) {
        const vehicle = await ctx.prisma.vehicle.create({
          data: {
            make,
            model,
            color,
            plateNumber,
            year,
            captain: {
              connect: {
                id: captainId,
              },
            },
          },
          include: {
            captain: true,
          },
        });
        return vehicle;
      },
    });
  },
});
