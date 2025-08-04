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

//Main function used to connect to an MCP Client.
export async function engageServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✓ Opened a connection at new Stdio Transport...");
}

engageServer().catch((error) => {
  console.error("Fatal error in main(): ", error);
});
