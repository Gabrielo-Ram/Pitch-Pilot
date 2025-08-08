/**
 * [ mcpClient Entry File ]
 * 'mcpClient.ts'
 */
import { GoogleGenAI, Content, mcpToTool, CallableTool } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import dotenv from "dotenv";
import path from "path";
import readline from "readline/promises";
import { fileURLToPath } from "url";

//Dotenv Configuration. Does not look for a '.env' file if in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
}

//Extracts Gemini key from '.env'
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not set");
}

//Logic for the MCP Client
export class MCPClient {
  private ai: GoogleGenAI; //An instance of Google Gemini, the LLM integrated into this MCP Client
  private clients: Client; //The MCP Client instance
  private transports?: StdioClientTransport; //The Transport instance
  private tools: CallableTool[] = []; //An array of tools registered from the MCP Server
  private messages: Content[] = []; //The Gemini 'chat history'

  constructor() {
    //Creates instance of LLM: Gemini
    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    this.clients = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  /**
   * Connects this MCP Client to the MCP Server by providing a path to the
   * MCP Server's entry file.
   *
   * @param {string} serverScriptPath The file path to the MCP Server entry file
   */
  async connectToServer(serverScriptPath: string) {
    try {
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }

      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;

      //Initiates the stdio transport connection between the server and the client.
      const transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      await this.clients.connect(transport);
      this.transports = transport;

      //Converts MCP client to a Gemini-compatible tool
      const tool = mcpToTool(this.clients);
      this.tools.push(tool);

      console.error(`✔ Connected to MCP Server with tools...\n`);
    } catch (error) {
      console.error("Failed to connect to MCP server: ", error);
      throw new Error(`❌ Failed to connect to MCP Server: \n${error}`);
    }
  }

  /**
   * Process the user's queries and sends the query to the Gemini
   * @param {string} query The user query
   * @return Gemini's response to the query in a string.
   */
  async processQuery(query: string) {
    try {
      //Push user's message to chat history
      this.messages.push({
        role: "user",
        parts: [{ text: query }],
      });

      //Send Gemini the user's query
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: this.messages,
        config: {
          tools: this.tools,
        },
      });

      //Silences a Gemini SDK warning
      const { text } = response;
      //Saves Gemini's response to the query in a buffer
      const reply = text ?? "";

      //Validate the model's response
      if (typeof reply !== "string" || reply.trim() == "") {
        console.error(
          `\nSorry, the LLM returned an empty or invalid reply. Please try again.\n`
        );
        //If LLM response invalid, remove user query that caused error from message history and return.
        this.messages.pop();
        return;
      }

      //Push Gemini's response to chat history
      this.messages.push({
        role: "model",
        parts: [{ text: reply }],
      });

      return reply;
    } catch (error) {
      console.error("Error in processQuery()", error);

      this.messages.push({
        role: "model",
        parts: [
          {
            text: `There was an error processing your request:\n${error}`,
          },
        ],
      });

      return `We're sorry, there was an error processing your request. Please try again.`;
    }
  }

  /**
   * A method to manually call an MCP Server tool from the MCP Client
   *
   * @param {string} nameTool The exact name of the tool you want to call
   * @param {Record<string, any>} args An object of arguments to the tool
   */
  async manualToolCall(nameTool: string, args: Record<string, any>) {
    try {
      const result = await this.clients.callTool({
        name: nameTool,
        arguments: args,
      });
    } catch (error) {
      throw new Error(`Error making a manual tool call: ${error}`);
    }
  }

  /**
   * Closes all client sessions
   */
  async cleanup() {
    this.clients.close();
  }

  /**
   * [Deprecated]
   * USED FOR TESTING:
   *
   * This function creates a CLI interface that allows the user to
   * keep a conversing with the LLM.
   */
  async chatLoop() {
    //Initiates std chat connection
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    //Create the CLI interface
    try {
      console.log("MCP Client Started!");

      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }

        const response = await this.processQuery(message);
        console.log("\n" + response);
      }
    } finally {
      rl.close();
    }
  }
}

/**
 *
 * The Main function that starts the MCP Client and connects it to
 * the MCP Server.
 *
 * @return An instance of this MCP Client.
 */
export async function engageMCPEcosystem() {
  //Path to Google Slides MPC Server entry file
  const mcpServerPath = path.resolve(
    __dirname,
    "../../../build/mcpEcosystem/mcpServer/index.js"
  ); //TODO: Aliases in Vite? '@/[Path to index]' this happens in Nextjs.

  //Initiate the MCP Clients
  const mcpClient = new MCPClient();
  try {
    //Connects the client to MCP Server
    await mcpClient.connectToServer(mcpServerPath);
    //await mcpClient.chatLoop();

    console.error("✅ Successfully engaged MCP Ecosystem");

    //Returns an instance of the MCP Client
    return mcpClient;
  } catch (error) {
    await mcpClient.cleanup();
    throw new Error(
      `Fatal error when engaging MCP Ecosystem in 'mcpClient.js': \n${error}`
    );
  }
  process.exit(0);
}

//TESTING: Boots up MCPClient on run.
// connectToMCP().catch((error) => {
//   console.error("Could not engage server", error);
//   process.exit(0);
// });
