import { Agent, openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const summarizer = createAgent({
      name: "summarizer",
      system:
        "You are an expert summarizer.  YYou summarize in 2 words.",
      model: openai({ model: "gpt-4o" }),
    });
    const { output } = await summarizer.run(`Summarize the following text: ${event.data.value}`);

    return { output }
  }
);
