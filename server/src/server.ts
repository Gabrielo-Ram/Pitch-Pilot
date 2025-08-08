/**
 * [ Global Entry File ]
 * 'server.ts'
 *
 * This file handles the following:
 * - Starting MCP Ecosystem (connecting the MCP Client to the MCP Server)
 * - Sends user queries from the frontend to the MCP Ecosystem and returns the
 *   LLM response back to the frontend
 * -
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  engageMCPEcosystem,
  MCPClient,
} from "./mcpEcosystem/mcpClient/index.js";

//Dotenv configuration. Doesn't read '.env' if in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const frontendURL = process.env.FRONTEND_URL;
if (!frontendURL) {
  throw new Error("Could not retrieve frontendURL from environment");
}

const port = 3031;
const app = express();

//CORS configuration
app.use(
  cors({
    origin: frontendURL,
  })
);

//Lets express trust the Render proxy
app.set("trust proxy", 1);
app.use(express.json());

//A reference to our MCP Client
export let mcpClient: MCPClient | null = null;

/**
 * Starts the MCP Ecosystem
 * Purpose:
 *  - Starts the MCP Server and MCP Client (Gemini)
 *  - Connects them together via Stdio Transport
 *  - Mounts helper subroutes
 */
const mcpRouter = express.Router();
app.use("/mcp", mcpRouter);

let isMCPInitalizing = false;
mcpRouter.post("/", async (req, res, next) => {
  try {
    if (mcpClient) {
      return res.json({ message: "MCP already initialized." });
    }

    if (isMCPInitalizing) {
      return res
        .status(202)
        .json({ message: "MCP is currently initializing... " });
    }

    isMCPInitalizing = true;

    //Starts and connects the MCP Client and MCP Server
    mcpClient = await engageMCPEcosystem();

    //Set up subroutes
    const processQueryRouter = (await import("./routes/processQuery.js"))
      .default;
    const processPDFRouter = (await import("./routes/processPDF.js")).default;
    const sendContextRouter = (await import("./routes/sendContext.js")).default;

    //Mount routes to endpoints
    mcpRouter.use(
      "/processPDF",
      express.raw({ type: "application/pdf", limit: "50mb" }),
      processPDFRouter
    );

    mcpRouter.use("/processQuery", processQueryRouter);

    mcpRouter.use("/sendContext", sendContextRouter);

    console.error("✓ Succesfully engaged MCP Ecosystem");
    isMCPInitalizing = false;

    return res
      .status(200)
      .json({ message: "MCP initialized and routes mounted." });
  } catch (err) {
    console.error("❌ Error initializing MCP:", err);
    return res
      .status(500)
      .json({ error: "Failed to initialize MCP ecosystem." });
  }
});

//A route that serves .pptx files in the outputs folder
app.use("/downloads", express.static(path.resolve("output")));

//Starts the Express Server
app.listen(port, () => {
  console.error(`\n✓ Server started at port: ${port}`);
});
