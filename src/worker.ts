import { EdgeFastMCP } from "fastmcp/edge";
import { registerTools } from "./tools.js";

const server = new EdgeFastMCP({
  name: "job-board-mcp",
  version: "1.0.0"
});

registerTools(server);

export default server;
