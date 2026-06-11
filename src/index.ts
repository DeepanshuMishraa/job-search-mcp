import { EdgeFastMCP } from "fastmcp/edge";

export const server = new EdgeFastMCP({
  name: "job-board-mcp",
  version: "1.0.0"
});

export default server;
