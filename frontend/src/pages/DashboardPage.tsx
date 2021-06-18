//packages ==================================================
import {Link} from 'react-router-dom';

export const DashboardPage = (props: DashboardPageProps) => (
    <>
        <h1>Dashboard Page</h1>
        <button onClick={(e) => props.createDocument(e)}>Send</button>
        <input type="text" onChange={(e) => props.setUserInput(e.target.value)} value={props.userInput}/>
        <button onClick={(e) => props.logout(props.setAuthenticatedStatus)}>logout</button>
        {
            props.documents.map((doc: {doc_id: number, doc_name: string}) => (
                <Link
                    key={doc.doc_id}
                    to={{
                        pathname: "/design",
                        state: {
                            doc_id: doc.doc_id,
                            doc_name: doc.doc_name
                        }
                    }}
                >
                    {doc.doc_name}
                </Link>
            ))
        }
    </>
);

interface DashboardPageProps {
    documents: Array<{doc_id: number, doc_name: string}>,
    userInput: string,
    logout: (ok_fn: React.Dispatch<React.SetStateAction<boolean>>) => void,
    setUserInput: React.Dispatch<React.SetStateAction<string>>,
    setDocuments: React.Dispatch<React.SetStateAction<{doc_id: number, doc_name: string}[]>>,
    createDocument: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    setAuthenticatedStatus: React.Dispatch<React.SetStateAction<boolean>>,
    reqAuthToken: (doc_id: number, ok_fn: React.Dispatch<React.SetStateAction<string>>) => void
}