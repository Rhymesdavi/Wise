import { z } from "zod";
import {baseProcedure, createTRPCRouter} from "@/trpc/init";
import {inngest} from "@/inngest/client";

export const appRouter = createTRPCRouter({
    invoke: baseProcedure
        .input(
            z.object({
                value: z.string()
            })
        )
        .mutation(async ({ input }) => {
            await inngest.send({
                name: "test/hello.world",
                data: {
                    value: input.value
                }
            })

            return { ok: "Success"}
        }),
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