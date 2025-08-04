/**
 * 'readPptx.js'
 *
 * This file will handle parsing a presentation from a .pptx file
 */
import { Automizer } from "pptx-automizer";
import modifyElement from "pptx-automizer";
import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//TESTING: Absolute paths to your template and output
const inputPath = path.resolve(
  __dirname,
  "../../uploads/Tensorfield_HaxDemoDay_draft_00.pptx"
);
const outputPath = path.resolve(__dirname, "../../outputs/slide.pptx");

//TESTING:
console.error("Runtime __dirname", __dirname);
console.error("Resolved input path: ", inputPath);
console.error("File Exists? ", fs.existsSync(inputPath));

/**
 * Creates a new 'Automizer' instance, and modifies the slide by
 * only adding the 1rst slide.
 */
async function run(inputPath: string, outputPath: string) {
  const automizer = new Automizer({
    templateDir: path.dirname(inputPath),
    outputDir: path.dirname(outputPath),
    verbosity: 1,
  });

  //TESTING:
  console.error("Input into .loadRoot: ", path.basename(inputPath));

  const result = await automizer
    .loadRoot(path.basename(inputPath))
    .addSlide(path.basename(inputPath), 1)
    .write(path.basename(outputPath));

  console.error(`✓ Modifed presentation saved to: ${outputPath}`);
}

run(inputPath, outputPath).catch((error) => {
  throw new Error(`❌ Fatal error in main: \n ${error}`);
});
