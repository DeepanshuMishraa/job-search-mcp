import { FastMCP } from "fastmcp";
import { registerTools } from "./tools.js";

const server = new FastMCP({
  name: "job-board-mcp",
  version: "1.0.0"
});

registerTools(server);

server.start({
  transportType: "httpStream",
  httpStream: {
    port: 8080
  }
})
