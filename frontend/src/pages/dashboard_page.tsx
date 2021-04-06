import React from 'react';

export default function DashboardPage(props: any) {

    async function send(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const backend_response = await fetch("http://localhost:3000/api/dashboard", {method: "GET"});
    }

    async function logout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const backend_response = await fetch("http://localhost:3000/api/logout", {method: "GET"});
        props.setAuthenticatedStatus(backend_response.status != 200)
    }

    return (
        <>
            <h1>Dashboard Page</h1>
            <button onClick={(e) => send(e)}>Send</button>
            <button onClick={(e) => logout(e)}>logout</button>
        </>
    );
}