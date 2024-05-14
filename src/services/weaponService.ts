import { PrismaClient, Weapon } from "@prisma/client";

const prisma = new PrismaClient();

export class WeaponService {
  async create(data: Partial<Weapon>): Promise<Weapon> {
    return await prisma.weapon.create({ data: await this.validate(data) });
  }
  async validate(data: Partial<Weapon>): Promise<Weapon> {
    if (!data.weaponId) {
      throw new Error("Name is required");
    }

    if (!data.type) {
      throw new Error("Type is required");
    }

    return data as Weapon;
  }

  async getAll(): Promise<Weapon[]> {
    return await prisma.weapon.findMany();
  }

  async findById(id: number): Promise<Weapon | null> {
    return await prisma.weapon.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Weapon>): Promise<Weapon | null> {
    return await prisma.weapon.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.weapon.delete({ where: { id } });
  }
}
