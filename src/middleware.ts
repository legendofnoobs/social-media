import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
    matcher: [
        // Match everything except:
        // - _next (Next.js internals)
        // - files with an extension
        // - api/clerk, api/auth, api/webhooks
        '/((?!_next)(?!.*\\..*)(?!api/clerk)(?!api/auth)(?!api/webhooks).*)',
    ],
};
