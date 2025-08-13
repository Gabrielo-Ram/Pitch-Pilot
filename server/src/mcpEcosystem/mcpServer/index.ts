/**
 * [ mcpServer Entry File ]
 * 'index.ts'
 *
 * This is the entry file for the MCP Server. This file registers server
 * tools that the MCP Client will recognize and use.
 *
 * TODO: Register server tools once you have presentation logic set up
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  createPresentation,
  savePresentation,
} from "./createAndSavePresentation.js";
import { addSlides } from "./shortFormDeck.js";
import { makeOnePagerDeck } from "./onePagerDeck.js";
import {
  addShortFormDeckToolDescription,
  addOnePagerDeckToolDescription,
} from "../prompts.js";
import { ShortFormDeckData, OnePagerDeckData } from "./types.js";

// Create server instance
const server = new McpServer({
  name: "Create User's Presentation MCP Server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "create-short-form-deck",
  addShortFormDeckToolDescription,
  {
    coverSlideProps: z.object({
      companyName: z.string().describe("The company's name"),
      tagline: z
        .string()
        .describe("The company's marketing one-liner, or tagline"),
    }),
    introSlideProps: z
      .string()
      .describe("A 3-4 sentence introduction to the company's goals and team."),
    problemSlideProps: z
      .array(z.string())
      .min(3)
      .max(4)
      .describe(
        "A 3-4 element string array where each element is a seperate sentence. The array should answer the question: 'What pain point is being addressed?'. Be as detailed as you can, but stay within the 4-sentence limit."
      ),
    solutionSlideProps: z
      .array(z.string())
      .min(3)
      .max(4)
      .describe(
        "A 3-4 element string array where each element is a seperate sentence. The array should answer the question: 'How does the product or tech solve it?'. Be as detailed as you can, but stay within the 4-sentence limit."
      ),
    marketSlideProps: z
      .array(z.string())
      .min(3)
      .max(4)
      .describe(
        "A 3-4 element string array where each element is a seperate sentence. The array should answer the question: 'Who is the target audience and why do they need this?'. Be as detailed as you can, but stay within the 4-sentence limit."
      ),
    tractionSlideProps: z
      .array(z.string())
      .min(3)
      .max(4)
      .describe(
        "A 3-4 element string array where each element is a seperate sentence. The array should answer the question: 'What proof is there that it's working?'. Be as detailed as you can, but stay within the 4-sentence limit."
      ),
    askSlideProps: z
      .array(z.string())
      .min(3)
      .max(4)
      .describe(
        "A 3-4 element string array where each element is a seperate sentence. The array should answer the question: 'Are they raising, hiring, or looking for something else?'. Be as detailed as you can, but stay within the 4-sentence limit."
      ),
  },
  async ({
    coverSlideProps,
    introSlideProps,
    problemSlideProps,
    solutionSlideProps,
    marketSlideProps,
    tractionSlideProps,
    askSlideProps,
  }) => {
    try {
      //Formats tool input
      const data: ShortFormDeckData = {
        coverSlideProps,
        introSlideProps,
        problemSlideProps,
        solutionSlideProps,
        marketSlideProps,
        tractionSlideProps,
        askSlideProps,
      };

      //Adds one-pager slides
      await addSlides(data);

      return {
        content: [
          {
            type: "text",
            text: "Successfully added slides for a short-form pitch deck",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to create short-form pitch deck.",
          },
        ],
      };
    }
  }
);

//create-one-pager tool
server.tool(
  "create-one-pager-deck",
  addOnePagerDeckToolDescription,
  {
    companies: z
      .array(
        z.object({
          companyName: z.string().describe("The name of the company"),
          content: z.string().describe("The one-pager paragraph content"),
        })
      )
      .describe(
        "An array of objects where each element contains one-pager content for an individual startup company."
      ),
  },
  async ({ companies }) => {
    try {
      await makeOnePagerDeck({ companies });

      return {
        content: [
          {
            type: "text",
            text: "Successfully created a one-pager deck.",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to create one-pager deck.",
          },
        ],
      };
    }
  }
);

//Main function used to connect to an MCP Client.
export async function engageServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✓ Opened a connection at new Stdio Transport...");
}

engageServer().catch((error) => {
  console.error("Fatal error in main(): ", error);
});
