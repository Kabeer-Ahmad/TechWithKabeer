---
title: "MCP Became the Default Way to Plug Tools into AI Agents. Here's How I Use It."
excerpt: "The Model Context Protocol went from an Anthropic proposal to the industry's shared plug for agents. A practical look at why it won, and a tiny server you can build in 20 lines."
tags: ["MCP", "AI Agents", "Agentic AI", "TypeScript", "LLM", "Automation"]
---

A year ago, every agent framework had its own idea of what a "tool" was. Moving an integration from one assistant to another meant rewriting it. In 2026 that has mostly stopped being true, and the reason is the **Model Context Protocol (MCP)**.

## A quick recap

MCP is an open protocol for connecting AI applications to external tools and data. You write a **server** once — "here are my tools, here are their input schemas, here's how to call them" — and any MCP-capable **client** (a chat app, an IDE agent, your own backend) can discover and use them.

The useful mental model is the one everyone uses: **USB-C for agents**. One plug shape, many devices.

## Why it won

A few things happened over the past year:

- **Neutral governance.** MCP moved from being an Anthropic project to being stewarded under the Agentic AI Foundation, with other major AI companies involved. That removed the "will my competitor's client ever support this?" hesitation.
- **Everyone shipped clients.** Once the big assistants, coding agents and IDEs could all speak MCP, writing a server became the obvious way to expose a capability.
- **Usage followed.** Anthropic reported the MCP SDKs passing roughly 97 million monthly downloads in spring 2026, and enterprise surveys started showing a large share of teams running MCP servers in production.

Exact numbers vary depending on who's counting, but the direction is clear: for new integrations, MCP is the default.

## A tiny server

Here's a minimal TypeScript MCP server exposing one tool — the kind of thing I build for clients who want an assistant that can look up their own data:

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "orders", version: "1.0.0" });

server.registerTool(
    "get_order_status",
    {
        description: "Look up the status of a customer order by its ID",
        inputSchema: { orderId: z.string().describe("The order ID, e.g. ORD-1042") },
    },
    async ({ orderId }) => {
        const order = await db.orders.findById(orderId); // your data layer
        if (!order) return { content: [{ type: "text", text: `No order ${orderId}` }] };
        return { content: [{ type: "text", text: `${orderId}: ${order.status}, ETA ${order.eta}` }] };
    }
);

await server.connect(new StdioServerTransport());
```

That's it. Point an MCP client at it and the model can now answer "where's order ORD-1042?" with real data.

## What I've learned shipping MCP servers

**1. Design tools like a public API, because they are one.**
The model reads your tool names and descriptions to decide what to call. `get_order_status` with a clear description beats `query` every time. Keep inputs small and explicit.

**2. Return less.**
Dumping a 400-line JSON record into the context wastes tokens and confuses the model. Return the few fields that answer the question, and offer a second tool for details.

**3. Read-only first.**
Start with tools that *read*. Add tools that *write* (refunds, emails, bookings) only with confirmation steps and tight scopes. An agent that can only look things up can't do much damage.

**4. Treat tool output as untrusted input.**
If a tool returns text from a web page, an email or a customer message, that text can contain instructions aimed at the model. Never let tool output silently grant new permissions.

**5. Log every call.**
When an agent does something surprising, the tool-call log is the only way to understand why. Log inputs, outputs and latency from day one.

## Where this is heading

The interesting work is moving up a layer. With the plumbing standardised, the hard problems are now **permissions, auditing and evaluation**: which agent may call which tool, on whose behalf, and how do you know it did the right thing?

If you're building anything with agents this year, my advice is simple: wrap your capabilities as MCP servers, keep them small and well-described, and spend the time you saved on guardrails.
