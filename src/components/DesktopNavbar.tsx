"use client";

import {
    BellIcon,
    HomeIcon,
    Search,
    UserCheck,
    UserCheck2,
    UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";

function DesktopNavbar() {
    const { user, isSignedIn } = useUser();

    return (
        <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/">
                    <HomeIcon className="w-4 h-4" />
                </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/search">
                    <Search className="w-4 h-4" />
                </Link>
            </Button>

            {isSignedIn && user ? (
                <>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href="/notifications">
                            <BellIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href={`/profile/${user.username ?? user.primaryEmailAddress?.emailAddress.split("@")[0]}/followers`}>
                            <UserCheck2 className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href={`/profile/${user.username ?? user.primaryEmailAddress?.emailAddress.split("@")[0]}/following`}>
                            <UserCheck className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link
                            href={`/profile/${user.username ?? user.primaryEmailAddress?.emailAddress.split("@")[0]}`}
                        >
                            <UserIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                    <UserButton />
                </>
            ) : (
                <SignInButton mode="modal">
                    <Button variant="default">Sign In</Button>
                </SignInButton>
            )}
            <ModeToggle />
        </div>
    );
}

export default DesktopNavbar;
