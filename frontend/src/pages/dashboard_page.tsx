//packages ==================================================
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {getDocuments, logout, postDocument} from '../services/http_api_service';


export default function DashboardPage(props: any) {

    const [documents, setDocuments] = useState<Array<string>>([]);
    const [userInput, setUserInput] = useState<string>("");

    useEffect(() => {
        getDocuments(setDocuments);
    }, []);

    /*
    async function getDocuments() {
        const response = await fetch("http://localhost:3000/api/dashboard/get", {method: "GET"}).then(res => res.json());
        setDocuments(response.documents);
    }
    */

    function createDocument(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const doc_name = userInput;
        setUserInput("");
        postDocument(doc_name, getDocuments(setDocuments));
        //const backend_response = await fetch("http://localhost:3000/api/dashboard/new", {method: "POST", body: JSON.stringify({name: doc_name}), headers: {"Content-Type": "application/json"}});
    }

    return (
        <>
            <h1>Dashboard Page</h1>
            <button onClick={(e) => createDocument(e)}>Send</button>
            <input type="text" onChange={(e) => setUserInput(e.target.value)} value={userInput}/>
            <button onClick={(e) => logout(props.setAuthenticatedStatus)}>logout</button>
            {
                documents.map((name) => (
                    <Link to="/design" onClick={(e) => props.setOpenDesignName(name)}>{name}</Link>
                ))
            }
        </>
    );
}