import React from "react";

type userParams = {
    id: string
}

export default async function UserPage({ params }: { params: Promise<userParams> }) {
    const { id } = await params;
    return <h1>User ID: {id}</h1>;
}