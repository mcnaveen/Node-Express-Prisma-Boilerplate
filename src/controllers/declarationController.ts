import { Request, Response } from "express";
import { DeclarationService } from "../services/declarationService";

export class DeclarationController {
  private declarationService: DeclarationService;

  constructor() {
    this.declarationService = new DeclarationService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const declarations = await this.declarationService.getAll();
      res.json(declarations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const declaration = await this.declarationService.create(req.body);
      res.json(declaration);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const declaration = await this.declarationService.findById(
        parseInt(req.params.id)
      );
      res.json(declaration);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedDeclaration = await this.declarationService.update(
        parseInt(req.params.id),
        req.body
      );
      res.json(updatedDeclaration);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.declarationService.delete(parseInt(req.params.id));
      res.json({ message: "Declaration deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
