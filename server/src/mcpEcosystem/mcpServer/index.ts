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
import { addShortFormDeckToolDescription } from "../prompts.js";
import { ShortFormDeckData } from "./types.js";

// Create server instance
const server = new McpServer({
  name: "Create User's Presentation MCP Server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

/**
 * [ SAMPLE ]
 * This is an example of how to register a server tool in this MCP Server.
 * Before we registers any server tools, we need to write the pptxGenjs logic.
 */
server.tool(
  "set-access-token",
  "This tool stores the user's access Token for future use",
  {
    accessToken: z
      .string()
      .describe("The user's access Token for Google oAuth"),
  },
  async ({ accessToken }) => {
    if (!accessToken || accessToken.length < 1) {
      return {
        content: [
          {
            type: "text",
            text: "Access Token is empty or invalid. Please pass in a valid access Token",
          },
        ],
      };
    }

    //storeAccessToken(accessToken);

    return {
      content: [
        {
          type: "text",
          text: "Succesfully retrieved the user's access Token",
        },
      ],
    };
  }
);

//`create-presentation` tool
server.tool(
  "create-presentation",
  "Creates a new presentation for either a one-pager or a short-form deck. You must call this tool before attempting to add slides.",
  {
    fileName: z
      .string()
      .describe(
        "The name of the file to be generated. This file should only be shortFormDeck.pptx, or onePagers.pptx"
      ),
  },
  async ({ fileName }) => {
    try {
      await createPresentation(fileName);

      return {
        content: [
          {
            type: "text",
            text: "Successfully instantiated a new presentation.",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to instantiate a new presentation: \n ${error}`,
          },
        ],
      };
    }
  }
);

//'save-presentation' tool
server.tool(
  "save-presentation",
  "Saves the presentation by writing a .pptx file. The input for this tool should be the same input you sent into the 'create-presentation' tool. ",
  {
    fileName: z
      .string()
      .describe(
        "The name of the saved file. This file should only be shortFormDeck.pptx, or onePagers.pptx."
      ),
  },
  async ({ fileName }) => {
    try {
      await savePresentation(fileName);
      return {
        content: [
          {
            type: "text",
            text: "Successfully saved the presentation",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to save presentation: \n ${error}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "add-short-form-deck",
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
      addSlides(data);

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
            text: `Failed to add slides for a short-form pitch deck: \n ${error}`,
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
