/**
 * 'onePagerDeck.ts'
 *
 * This file contains logic for creating a presentation of one-pagers for a
 * compilation of startup companies
 */

import {
  presentation,
  createPresentation,
  savePresentation,
} from "./createAndSavePresentation.js";
import { logoImage, backgroundImage, chartImage } from "./assets/imageLinks.js";
import path from "path";
import { fileURLToPath } from "url";
import { OnePagerDeckData } from "./types.js";

//Configures an absolute path to this directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profileImage = path.resolve(
  __dirname,
  "../../../src/mcpEcosystem/mcpServer/assets/Profile.png"
);

/**
 * Checks if a 'presentation' exists
 */
function doesPresentationExist(): boolean {
  if (!presentation) return false;
  return true;
}

/**
 * Creates and styles a 'one-pager' slide for an individual company
 * @param {string} companyName - The name of the company
 * @param {string} content - The body content of the slide
 */
function createOnePager(companyName: string, content: string): void {
  let slide = presentation.addSlide();
  slide
    //Title
    .addText(`${companyName}`, {
      fontSize: 32,
      x: "5%",
      y: "10%",
      w: "80%",
      h: "10%",
    })
    //Body Content
    .addText(`${content}`, {
      x: "5%",
      y: "20%",
      w: "68%",
      h: "60%",
    })
    //Product Image
    .addImage({
      path: "https://pnghq.com/wp-content/uploads/insert-here-hq-png-image.png",
      x: "71%",
      y: "40%",
      w: "22%",
      h: "25%",
    })
    //Company Logo
    .addImage({
      path: logoImage,
      x: "5%",
      y: "83%",
      w: "15%",
      h: "16%",
      sizing: {
        type: "contain",
        w: "15%",
        h: "14%",
      },
    })
    //SOSV Logo
    .addImage({
      path: "https://sosv.com/wp-content/uploads/2022/06/positive-1.png",
      x: "87%",
      y: "85%",
      w: "8%",
      h: "5%",
      sizing: {
        type: "contain",
        w: "8%",
        h: "5%",
      },
    })
    //SOSV Disclaimer
    .addText("SOSV Confidential. For Internal Distribution Only.", {
      fontSize: 6,
      x: "78%",
      y: "89%",
      w: "19%",
      h: "7%",
      align: "right",
    });
}

/**
 * Iterates through a compilation of companies and creates a one-pager for each
 * in a presentation
 * @param {OnePagerDeckData} data - Company data
 */
export async function makeOnePagerDeck(data: OnePagerDeckData) {
  try {
    await createPresentation();

    //Iterate through each company
    for (const company of data.companies) {
      createOnePager(company.companyName, company.content);
    }

    await savePresentation();

    console.error("✓ Successfully added all companies in one-pager deck.");
  } catch (error) {
    console.error(
      `❌ There was a fatal error in makeOnePagerDeck(): \n ${error}`
    );
  }
}
