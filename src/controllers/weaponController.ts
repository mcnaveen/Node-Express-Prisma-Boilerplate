import { Request, Response } from "express";
import { WeaponService } from "../services/weaponService";

export class WeaponController {
  private weaponService: WeaponService;

  constructor() {
    this.weaponService = new WeaponService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const weapons = await this.weaponService.getAll();
      res.json(weapons);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const weapon = await this.weaponService.create(req.body);
      res.json(weapon);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const weapon = await this.weaponService.findById(parseInt(req.params.id));
      res.json(weapon);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedWeapon = await this.weaponService.update(
        parseInt(req.params.id),
        req.body
      );
      res.json(updatedWeapon);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.weaponService.delete(parseInt(req.params.id));
      res.json({ message: "Weapon deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
