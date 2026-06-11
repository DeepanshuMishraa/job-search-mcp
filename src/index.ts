import { FastMCP } from "fastmcp";

export const server = new FastMCP({
  name: "job-board-mcp",
  version: "1.0.0"
});


server.start({
  transportType: "httpStream",
  httpStream: {
    port: 8080
  }
})
