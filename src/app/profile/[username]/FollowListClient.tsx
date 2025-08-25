"use client";

import React from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import FollowButton from "@/components/FollowButton";

interface FollowListClientProps {
    users: {
        id: string;
        username: string;
        name?: string | null;
        image?: string | null;
    }[];
}

function FollowListClient({ users }: FollowListClientProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between py-2 border-b border-border"
                        >
                            <div className="flex items-center space-x-4">
                                <Link href={`/profile/${user.username}`}>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.image || "/default-profile.png"} alt={user.username} />
                                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link
                                        href={`/profile/${user.username}`}
                                        className="font-medium hover:underline"
                                    >
                                        {user.name || user.username}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                                </div>
                            </div>
                            <FollowButton userId={user.id} />
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default FollowListClient;