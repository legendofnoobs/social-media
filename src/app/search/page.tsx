"use client";

import { useState, useEffect } from "react";
import { searchUsersAndPosts } from "@/actions/search.action";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import PostCard from "@/components/PostCard"; // Import PostCard

interface SearchResult {
    users: {
        id: string;
        name: string | null;
        username: string;
        image: string | null;
    }[];
    posts: {
        id: string;
        content: string | null;
        author: {
            name: string | null;
            username: string;
            image: string | null;
        };
    }[];
}

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult>({ users: [], posts: [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleSearch = async () => {
            if (!searchTerm) {
                setSearchResults({ users: [], posts: [] });
                return;
            }

            setIsLoading(true);
            const results = await searchUsersAndPosts(searchTerm);
            setSearchResults(results);
            setIsLoading(false);
        };

        //Debounce search
        const timerId = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(timerId);
    }, [searchTerm]);

    return (
        <div>
            <div className="flex items-center space-x-2 mb-4">
                <Input
                    type="text"
                    placeholder="Search users and posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" disabled={isLoading}>
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search
                </Button>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {searchResults.users.length > 0 && (
                        <Card className="mb-4">
                            <CardContent>
                                <h2 className="text-lg font-semibold mb-2">Users</h2>
                                <ul>
                                    {searchResults.users.map((user) => (
                                        <li key={user.id} className="py-2 border-b">
                                            <Link href={`/profile/${user.username}`} className="flex items-center space-x-2">
                                                <Avatar>
                                                    <AvatarImage src={user.image || "/avatar.png"} />
                                                </Avatar>
                                                <span>{user.name || user.username}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {searchResults.posts.length > 0 && (
                        <div className="space-y-6"> {/* Changed Card to a div to apply spacing */}
                            <h2 className="text-lg font-semibold mb-2">Posts</h2>
                            {searchResults.posts.map((post) => (
                                <PostCard key={post.id} post={post} dbUserId={null} /> // Render PostCard
                            ))}
                        </div>
                    )}

                    {searchResults.users.length === 0 && searchResults.posts.length === 0 && searchTerm !== "" && (
                        <p>No results found.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default SearchPage;