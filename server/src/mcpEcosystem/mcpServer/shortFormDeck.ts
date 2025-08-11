/**
 * 'shortFormDeck.ts'
 *
 * This file contains logic that creates a short form pitch deck.
 * Creates a 7-slide pitch deck with the following slides:
 *  - Cover Slide
 *  - Company Intro
 *  - The Problem
 *  - The Solution
 *  - The Market
 *  - Traction
 *  - The Ask
 *
 * This presentation is meant to be presented in under 2 minutes.
 */

import {
  createPresentation,
  presentation,
} from "./createAndSavePresentation.js";
import { logoImage, backgroundImage, chartImage } from "./assets/imageLinks.js";
import { savePresentation } from "./createAndSavePresentation.js";
import path from "path";
import { fileURLToPath } from "url";
import { ShortFormDeckData } from "./types.js";

//Configures an absolute path to this directory.
//Used to have correct file paths no matter what the
//parent directory is.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profileImage = path.resolve(
  __dirname,
  "../../../src/mcpEcosystem/mcpServer/assets/Profile.png"
);

/**
 * Checks if a presentation was created at the global variable 'presentation'.
 * If a presentation has not been created, return an error.
 */
function doesPresentationExist(): boolean {
  if (!presentation) return false;
  return true;
}

/**
 * Creates the cover slide for the company
 *
 * @param {string} companyName - The company's name
 * @param {string} tagline - The company's one-liner, or tagline
 */
function addCoverSlide(companyName: string, tagline: string): void {
  let coverslide = presentation.addSlide();
  coverslide
    .addText(`${companyName}`, {
      fontSize: 46,
      bold: true,
      x: "20%",
      y: "23%",
      w: "30%",
      h: "50%",
      align: "left",
    })
    .addImage({
      path: logoImage,
      x: "55%",
      y: "23%",
      w: "30%",
      h: "50%",
      sizing: {
        type: "contain",
        w: "30%",
        h: "50%",
      },
    })
    .addText(`${tagline}`, {
      fontSize: 24,
      x: "23%",
      y: "85%",
      w: "53%",
      h: "10%",
    });
}

/**
 * Adds an 'Intro | Meet the Team slide
 *
 * @param {string} content - The body content of the intro slide
 */
function addIntro(content: string): void {
  let slide = presentation.addSlide();
  slide
    //Title
    .addText("Intro | Meet the Team", {
      fontSize: 32,
      bold: true,
      x: "5%",
      y: "5%",
      w: "50%",
      h: "9%",
    })
    //Body
    .addText(`${content}`, {
      x: "5%",
      y: "18%",
      w: "90%",
      h: "40%",
    })
    //Profile Image(s)
    .addImage({
      path: `${profileImage}`,
      x: "17%",
      y: "57%",
      w: "20%",
      h: "39%",
    })
    .addImage({
      path: `${profileImage}`,
      x: "39%",
      y: "57%",
      w: "20%",
      h: "39%",
    })
    .addImage({
      path: `${profileImage}`,
      x: "61%",
      y: "57%",
      w: "20%",
      h: "39%",
    });
}

/**
 * Adds the "Problem Slide". This slides addresses what problem this
 * startup is trying to solve.
 *
 * @param {string[]} content - An array of strings where each element is a seperate bullet point.
 */
function addProblem(content: string[]): void {
  let slide = presentation.addSlide();
  slide
    //Title
    .addText("The Problem: What pain point is being addressed?", {
      fontSize: 32,
      bold: true,
      x: "5%",
      y: "10%",
      w: "80%",
      h: "9%",
    })
    //Body
    .addText(
      [
        { text: `${content[0]}`, options: { bullet: true } },
        { text: `${content[1]}`, options: { bullet: true } },
        { text: `${content[2]}`, options: { bullet: true } },
        { text: `${content[3] ?? ""}`, options: { bullet: true } },
      ],
      {
        fontSize: 20,
        x: "5%",
        y: "22%",
        w: "85%",
        h: "50%",
      }
    );
}

/**
 * Adds the "Solution" slide.
 * - How does the product or tech solve the problem?
 *
 * @param {string[]} content - An array of strings where each element is a seperate bullet point.
 */
function addSolution(content: string[]): void {
  let slide = presentation.addSlide();
  slide
    //Title
    .addText("The Solution: How does your product or tech solve it?", {
      fontSize: 32,
      bold: true,
      x: "5%",
      y: "10%",
      w: "80%",
      h: "9%",
    })
    //Body
    .addText(
      [
        { text: `${content[0]}`, options: { bullet: true } },
        { text: `${content[1]}`, options: { bullet: true } },
        { text: `${content[2]}`, options: { bullet: true } },
        { text: `${content[3] ?? ""}`, options: { bullet: true } },
      ],
      {
        fontSize: 20,
        x: "5%",
        y: "22%",
        w: "85%",
        h: "50%",
      }
    );
}

/**
 * Adds the 'Market' slide. Answers the question:
 * - Who is the target audience and why do they need this?
 *
 * @param {string[]} content - An array of strings where each element is a seperate bullet point.
 */
function addMarket(content: string[]): void {
  let slide = presentation.addSlide();
  slide
    //Title
    .addText("Market: Who is the target audience and why do they need this?", {
      fontSize: 32,
      bold: true,
      x: "5%",
      y: "8%",
      w: "80%",
      h: "9%",
    })
    .addImage({
      path: `${profileImage}`,
      x: "5%",
      y: "28%",
      w: "25%",
      h: "50%",
    })
    .addText("[Insert customer profile]", {
      fontSize: 16,
      x: "5%",
      y: "76%",
      w: "24%",
      h: "5%",
    })
    //Body
    .addText(
      [
        { text: `${content[0]}`, options: { bullet: true } },
        { text: `${content[1]}`, options: { bullet: true } },
        { text: `${content[2]}`, options: { bullet: true } },
        { text: `${content[3] ?? ""}`, options: { bullet: true } },
      ],
      {
        fontSize: 20,
        x: "35%",
        y: "30%",
        w: "60%",
        h: "50%",
      }
    );
}

/**
 * Adds the 'Traction' slide. Answers the question:
 * - What proof is there that it's working?
 *
 * @param {string[]} content - An array of strings where each element is a seperate bullet point.
 */
function addTraction(content: string[]): void {
  let slide = presentation.addSlide();
  slide
    //Title
    .addText("Traction: What proof is there that it's working", {
      fontSize: 32,
      bold: true,
      x: "5%",
      y: "8%",
      w: "80%",
      h: "9%",
    })
    //Body
    .addText(
      [
        { text: `${content[0]}`, options: { bullet: true } },
        { text: `${content[1]}`, options: { bullet: true } },
        { text: `${content[2]}`, options: { bullet: true } },
        { text: `${content[3] ?? ""}`, options: { bullet: true } },
      ],
      {
        fontSize: 20,
        x: "5%",
        y: "32%",
        w: "60%",
        h: "50%",
      }
    )
    .addImage({
      path: chartImage,
      x: "68%",
      y: "25%",
      w: "25%",
      h: "50%",
    })
    .addText("[Insert relevant graph here]", {
      fontSize: 16,
      x: "70%",
      y: "74%",
      w: "24%",
      h: "5%",
    });
}

/**
 * Adds 'The Ask' slide. Addresses the question:
 * - Are they raising, hiring, or looking for something else?
 *
 * @param {string[]} content - An array of strings where each element is a seperate bullet point.
 */
function addAsk(content: string[]): void {
  let slide = presentation.addSlide();
  slide
    //Title
    .addText(
      "The Ask: Are you raising, hiring, or looking for something else?",
      {
        fontSize: 32,
        bold: true,
        x: "5%",
        y: "10%",
        w: "80%",
        h: "9%",
      }
    )
    //Body
    .addText(
      [
        { text: `${content[0]}`, options: { bullet: true } },
        { text: `${content[1]}`, options: { bullet: true } },
        { text: `${content[2]}`, options: { bullet: true } },
        { text: `${content[3] ?? ""}`, options: { bullet: true } },
      ],
      {
        fontSize: 20,
        x: "5%",
        y: "22%",
        w: "85%",
        h: "50%",
      }
    );
}

/**
 * Initiates the creation of a 'short-form pitch deck'. Creates
 * and styles a 7 slide presentation for a specific company
 * based on input 'data'.
 *
 * @param {ShortFormDeckData} data - Relevant data for a specific company
 */
export async function addSlides(data: ShortFormDeckData) {
  await createPresentation();

  //Extracts inputs from 'data'
  const { companyName, tagline } = data.coverSlideProps;
  const {
    introSlideProps,
    problemSlideProps,
    solutionSlideProps,
    marketSlideProps,
    tractionSlideProps,
    askSlideProps,
  } = data;

  //Add each individual slide
  await addCoverSlide(companyName, tagline);
  //addIntro(introSlideProps);
  await addProblem(problemSlideProps);
  await addSolution(solutionSlideProps);
  await addMarket(marketSlideProps);
  await addTraction(tractionSlideProps);
  await addAsk(askSlideProps);

  //Saves the presentation
  await savePresentation();
}

// addSlides().catch((error) => {
//   throw new Error(`Fatal error at main(): \n ${error}`);
// });
