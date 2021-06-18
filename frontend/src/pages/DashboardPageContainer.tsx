//packages ===================================================
import { useEffect, useState } from "react";
//services ===================================================
import {reqAuthToken, getDocuments, logout, postDocument} from '../services/http_api_service';
//pages ======================================================
import {DashboardPage} from "./DashboardPage";

export default function DashboardPageContainer(props: DashboardPageContainerProps) {

    const [documents, setDocuments] = useState<Array<{doc_id: number, doc_name: string}>>([]);
    const [userInput, setUserInput] = useState<string>("");

    useEffect(() => {
        getDocuments(setDocuments);
    }, []);

    function createDocument(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const doc_name = userInput;
        setUserInput("");
        postDocument(doc_name, setDocuments);
    }

    return (
        <DashboardPage
            documents={documents}
            userInput={userInput}
            logout={logout}
            setUserInput={setUserInput}
            setDocuments={setDocuments}
            createDocument={createDocument}
            setAuthenticatedStatus={props.setAuthenticated}
            reqAuthToken={reqAuthToken}
        />
    );   
}

interface DashboardPageContainerProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}