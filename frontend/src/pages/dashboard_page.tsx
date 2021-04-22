//packages ==================================================
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {reqAuthToken, getDocuments, logout, postDocument} from '../services/http_api_service';


export default function DashboardPage(props: any) {

    const [documents, setDocuments] = useState<Array<{doc_id: number, doc_name: string}>>([]);
    const [userInput, setUserInput] = useState<string>("");

    useEffect(() => {
        getDocuments(setDocuments);
    }, []);

    function createDocument(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const doc_name = userInput;
        setUserInput("");
        postDocument(doc_name, setDocuments);
    }

    return (
        <>
            <h1>Dashboard Page</h1>
            <button onClick={(e) => createDocument(e)}>Send</button>
            <input type="text" onChange={(e) => setUserInput(e.target.value)} value={userInput}/>
            <button onClick={(e) => logout(props.setAuthenticatedStatus)}>logout</button>
            {
                documents.map((doc) => (
                    <Link 
                        to={{
                            pathname: "/design",
                            state: {
                                doc_id: doc.doc_id
                            }
                        }} 
                        onClick={(e) => reqAuthToken(doc.doc_id, props.setAuthToken)}
                    >
                        {doc.doc_name}
                    </Link>
                ))
            }
        </>
    );
}