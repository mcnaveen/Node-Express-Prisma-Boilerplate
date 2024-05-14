import request from "supertest";
import app from "./index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Declaration Controller", () => {
  beforeEach(async () => {
    // Clear the database before each test
    await prisma.declaration.deleteMany();
  });

  afterAll(async () => {
    // Disconnect Prisma client after all tests are done
    await prisma.$disconnect();
  });

  it("should create a new declaration", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }
    var weapon = await prisma.weapon.findFirst();
    if (!weapon) {
      weapon = await prisma.weapon.create({
        data: {
          image: "weapon-image-url",
          weaponId: "W123",
          type: "rifle",
          userId: user.id,
        },
      });
    }

    const res = await request(app).post("/declarations").send({
      image: "image-url",
      assignedTo: "John Doe",
      cnic: "12345",
      weaponId: weapon.id,
      beltNo: "B123",
      placement: "Front",
      declarationDate: new Date(),
      retrivalDate: new Date(),
      userId: user.id,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should get all declarations", async () => {
    const res = await request(app).get("/declarations");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a declaration by ID", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }
    var weapon = await prisma.weapon.findFirst();
    if (!weapon) {
      weapon = await prisma.weapon.create({
        data: {
          image: "weapon-image-url",
          weaponId: "W123",
          type: "rifle",
          userId: user.id,
        },
      });
    }

    const declaration = await prisma.declaration.create({
      data: {
        image: "image-url",
        assignedTo: "John Doe",
        cnic: "12345",
        weaponId: weapon.id,
        beltNo: "B123",
        placement: "Front",
        declarationDate: new Date(),
        retrivalDate: new Date(),
        userId: user.id,
      },
    });
    const res = await request(app).get(`/declarations/${declaration.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", declaration.id);
  });

  it("should update a declaration", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }
    var weapon = await prisma.weapon.findFirst();
    if (!weapon) {
      weapon = await prisma.weapon.create({
        data: {
          image: "weapon-image-url",
          weaponId: "W123",
          type: "rifle",
          userId: user.id,
        },
      });
    }
    const declaration = await prisma.declaration.create({
      data: {
        image: "image-url",
        assignedTo: "John Doe",
        cnic: "12345",
        weaponId: weapon.id,
        beltNo: "B123",
        placement: "Front",
        declarationDate: new Date(),
        retrivalDate: new Date(),
        userId: user.id,
      },
    });
    const updatedDeclaration = {
      assignedTo: "Jane Doe",
    };
    const res = await request(app)
      .put(`/declarations/${declaration.id}`)
      .send(updatedDeclaration);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "assignedTo",
      updatedDeclaration.assignedTo
    );
  });

  it("should delete a declaration", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }
    var weapon = await prisma.weapon.findFirst();
    if (!weapon) {
      weapon = await prisma.weapon.create({
        data: {
          image: "weapon-image-url",
          weaponId: "W123",
          type: "rifle",
          userId: user.id,
        },
      });
    }

    const declaration = await prisma.declaration.create({
      data: {
        image: "image-url",
        assignedTo: "John Doe",
        cnic: "12345",
        weaponId: weapon.id,
        beltNo: "B123",
        placement: "Front",
        declarationDate: new Date(),
        retrivalDate: new Date(),
        userId: user.id,
      },
    });
    const res = await request(app).delete(`/declarations/${declaration.id}`);
    expect(res.statusCode).toEqual(200);
    const deletedDeclaration = await prisma.declaration.findUnique({
      where: { id: declaration.id },
    });
    expect(deletedDeclaration).toBeNull();
  });
});

describe("Weapon Controller", () => {
  beforeEach(async () => {
    // Clear the database before each test
    await prisma.weapon.deleteMany();
  });

  afterAll(async () => {
    // Disconnect Prisma client after all tests are done
    await prisma.$disconnect();
  });

  it("should create a new weapon", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }

    const res = await request(app).post("/weapons").send({
      image: "weapon-image-url",
      weaponId: "W123",
      type: "rifle",
      userId: user.id,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should get all weapons", async () => {
    const res = await request(app).get("/weapons");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a weapon by ID", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }
    const weapon = await prisma.weapon.create({
      data: {
        image: "weapon-image-url",
        weaponId: "W123",
        type: "rifle",
        userId: user.id,
      },
    });
    const res = await request(app).get(`/weapons/${weapon.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", weapon.id);
  });

  it("should update a weapon", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }
    const weapon = await prisma.weapon.create({
      data: {
        image: "weapon-image-url",
        weaponId: "W123",
        type: "rifle",
        userId: user.id,
      },
    });
    const updatedWeapon = {
      type: "pistol",
    };
    const res = await request(app)
      .put(`/weapons/${weapon.id}`)
      .send(updatedWeapon);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("type", updatedWeapon.type);
  });

  it("should delete a weapon", async () => {
    var user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: "abc@test.com",
          status: "active",
        },
      });
    }
    const weapon = await prisma.weapon.create({
      data: {
        image: "weapon-image-url",
        weaponId: "W123",
        type: "rifle",
        userId: user.id,
      },
    });
    const res = await request(app).delete(`/weapons/${weapon.id}`);
    expect(res.statusCode).toEqual(200);
    const deletedWeapon = await prisma.weapon.findUnique({
      where: { id: weapon.id },
    });
    expect(deletedWeapon).toBeNull();
  });
});
