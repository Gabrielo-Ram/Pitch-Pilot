/**
 * ./routes/deletePresentations.js
 *
 * A router that downloads the `.pptx` file from the `output` directory,
 * and then deletes it.
 */

import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "../../output");

const router = express.Router();

router.delete("/", async (req: Request, res: Response) => {
  try {
    // Use fs.promises for async/await
    const files = await fs.promises.readdir(OUTPUT_DIR);

    const unlinkPromises = files.map(async (file) => {
      try {
        await fs.promises.unlink(path.join(OUTPUT_DIR, file));
      } catch (err) {
        console.error(`Error deleting ${file}: ${err}`);
      }
    });

    await Promise.all(unlinkPromises);

    console.error("✓ Deleted files in 'output' folder");
    return res.json({ message: "All files deleted from output folder." });
  } catch (error) {
    console.error(`❌ Failed to delete files \n: ${error}`);
    return res
      .status(500)
      .json({ error: `Failed to delete files:\n ${error}` });
  }
});

export default router;
