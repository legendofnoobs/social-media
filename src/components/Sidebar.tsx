"use client";

import { useEffect, useState } from "react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { getUserByClerkId } from "@/actions/user.action";

export default function Sidebar() {
    const { user: authUser, isLoaded } = useUser();
    const [dbUser, setDbUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authUser) {
            (async () => {
                setLoading(true);
                const user = await getUserByClerkId(authUser.id);
                setDbUser(user);
                setLoading(false);
            })();
        } else {
            setDbUser(null);
            setLoading(false);
        }
    }, [authUser]);

    if (!isLoaded || loading) {
        return (
            <div className="sticky top-20">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-sm text-muted-foreground">Loading...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!authUser || !dbUser) return <UnAuthenticatedSidebar />;

    return (
        <div className="sticky top-20">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                        <Link
                            href={`/profile/${dbUser.username}`}
                            className="flex flex-col items-center justify-center"
                        >
                            <Avatar className="w-20 h-20 border-2 ">
                                <AvatarImage
                                    src={authUser.imageUrl || "/avatar.png"}
                                    alt={dbUser.name}
                                />
                            </Avatar>

                            <div className="mt-4 space-y-1">
                                <h3 className="font-semibold">{dbUser.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {dbUser.username}
                                </p>
                            </div>
                        </Link>

                        {dbUser.bio && (
                            <p className="mt-3 text-sm text-muted-foreground">
                                {dbUser.bio}
                            </p>
                        )}

                        <div className="w-full">
                            <Separator className="my-4" />
                            <div className="flex justify-around">
                                <div>
                                    <p className="font-medium">{dbUser._count.following}</p>
                                    <p className="text-xs text-muted-foreground">Following</p>
                                </div>
                                <Separator orientation="vertical" />
                                <div>
                                    <p className="font-medium">{dbUser._count.followers}</p>
                                    <p className="text-xs text-muted-foreground">Followers</p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                        </div>

                        <div className="w-full space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                                <MapPinIcon className="w-4 h-4 mr-2" />
                                {dbUser.location || "No location"}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                {dbUser.website && (
                                    <div className="flex items-center">
                                        <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                                        <a
                                            href={`${dbUser.website}`}
                                            className="hover:underline truncate"
                                            target="_blank"
                                        >
                                            {dbUser.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const UnAuthenticatedSidebar = () => (
    <div className="sticky top-20">
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground mb-4">
                    Login to access your profile and connect with others.
                </p>
                <SignInButton mode="modal">
                    <Button className="w-full" variant="outline">
                        Login
                    </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button className="w-full mt-2" variant="default">
                        Sign Up
                    </Button>
                </SignUpButton>
            </CardContent>
        </Card>
    </div>
);
