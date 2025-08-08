/**
 * 'createPresentation.ts'
 *
 * Contains logic for creating and editing presentations
 * using the 'PptxGenJS' npm package. Presentations
 * are exported as .pptx files
 */

import * as PptxGen from "pptxgenjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Global presentation variable and setter function
export let presentation: any = null;
function setPresentation(newPresentation: any) {
  console.error("✓ Set global presentation instance");
  presentation = newPresentation;
}

/**
 * Creates a new presentation instance
 *
 * @param {string} filename - The name of the `.pptx` file
 * @return void
 */
export async function createPresentation(filename = "PitchPilotDeck.pptx") {
  try {
    //Creates the presentation instance
    const presentation = await new (PptxGen.default as any)();
    presentation.layout = "LAYOUT_16x9";

    setPresentation(presentation);

    console.error("✓ Successfully created a new presentation");
  } catch (error) {
    console.error(`❌ Failed to create a new presentation: \n ${error}`);
    throw new Error(`❌ Failed to create a new presentation: \n ${error}`);
  }
}

/**
 * TODO:
 * How do we serve the file back to the user upon creation?
 *
 * Saves the presentation by writing into a filename.
 * @param {string} fileName - The name of the presentation file
 */
export async function savePresentation(fileName = "PitchPilotDeck.pptx") {
  try {
    const outputDir = path.resolve(__dirname, "../../../output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, fileName);

    await presentation.writeFile({ fileName: outputPath });

    console.error(
      `✅ Deck was saved successfully under filename: 'PitchPilotDeck.pptx`
    );
  } catch (error) {
    console.error(`❌ Failed to save presentation: \n ${error}`);
  }
}
