import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
    matcher: [
        // Protect everything except:
        // - Next.js internals (_next, static files)
        // - Clerk API routes (/api/clerk/*)
        // - Webhooks (/api/webhooks/*)
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/(?:clerk|webhooks)).*)',
    ],
};
