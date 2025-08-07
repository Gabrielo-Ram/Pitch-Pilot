/**
 * 'sendContext.ts'
 *
 * An Express router mounted at the '/mcp/sendContext' endpoint.
 * Sends the MCP Server the system prompt.
 */
import express from "express";
import { Request, Response } from "express";
import { mcpClient } from "../server.js";
import systemPrompt from "../mcpEcosystem/prompts.js";

//MCP Client instance
const client = mcpClient || null;

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    //Validates the MCP Client exists
    if (!client) {
      res.status(400).json({
        error: "Failed passing MCP CLient to '/sendContext' router",
      });
      return;
    }

    //Send the prompt to Gemini and save its response
    const reply = await client.processQuery(systemPrompt);

    res.json({ role: "model", message: reply });
  } catch (error) {
    console.error(`❌ Failed to send system context to MCP: \n ${error}`);
    res.status(500).json({ error: "Failed to send system prompt to MCP" });
  }
});

export default router;
