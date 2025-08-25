import { BellIcon, HomeIcon, Search, UserCheck, UserCheck2, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
    const user = await currentUser();

    return (
        <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/">
                    <HomeIcon className="w-4 h-4" />
                    {/* <span className="hidden lg:inline">Home</span> */}
                </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/search">
                    <Search className="w-4 h-4" />
                </Link>
            </Button>

            {user ? (
                <>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href="/notifications">
                            <BellIcon className="w-4 h-4" />
                            {/* <span className="hidden lg:inline">Notifications</span> */}
                        </Link>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}/followers`}>
                            <UserCheck2 className="w-4 h-4" />
                            {/* <span className="hidden lg:inline">
                                Followers
                            </span> */}
                        </Link>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}/following`}>
                            <UserCheck className="w-4 h-4" />
                            {/* <span className="hidden lg:inline">
                                Following
                            </span> */}
                        </Link>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link
                            href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
                                }`}
                        >
                            <UserIcon className="w-4 h-4" />
                            {/* <span className="hidden lg:inline">Profile</span> */}
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