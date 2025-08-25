import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
    matcher: [
        // Run middleware on all routes EXCEPT:
        // - Next.js internals
        // - Static assets
        // - Clerk/Next API routes
        '/((?!_next|.*\\..*|api/(clerk|auth|webhooks)).*)',
    ],
};
