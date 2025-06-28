import { z } from "zod";
import {baseProcedure, createTRPCRouter} from "@/trpc/init";

export const appRouter = createTRPCRouter({
    hello: baseProcedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .query((opts) => {
            return {
                greeting: `Hello ${opts.input.text}`,
            }
        })
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;