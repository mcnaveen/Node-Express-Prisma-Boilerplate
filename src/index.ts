// app.ts

import express from "express";
import { DeclarationController } from "./controllers/declarationController";
import { WeaponController } from "./controllers/weaponController";

const app = express();
const port = 4000;

app.use(express.json());

// Declaration routes
const declarationController = new DeclarationController();
app.post("/declarations", declarationController.create);
app.get("/declarations", declarationController.getAll);
app.get("/declarations/:id", declarationController.findById);
app.put("/declarations/:id", declarationController.update);
app.delete("/declarations/:id", declarationController.delete);

// Weapon routes
const weaponController = new WeaponController();
app.post("/weapons", weaponController.create);
app.get("/weapons", weaponController.getAll);
app.get("/weapons/:id", weaponController.findById);
app.put("/weapons/:id", weaponController.update);
app.delete("/weapons/:id", weaponController.delete);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
