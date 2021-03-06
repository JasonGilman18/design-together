type ApiResponse<Type> = {status: string, status_code: number, message: string, data: Type};
const url = "http://localhost:3000/api";

function getAPI<Type>(route: string): Promise<ApiResponse<Type>> {
    return fetch(url + route, {method: "GET"}).then(res => {
        if(!res.ok)
            throw new Error(res.statusText);
        else
            return res.json();
    });
}

function postAPI<Type>(route: string, body: any): Promise<ApiResponse<Type>> {
    return fetch(url + route, {method: "POST", body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}}).then(res => {
            if(!res.ok)
                throw new Error(res.statusText);
            else
                return res.json();
    });
}

export function getAuthenticated(ok_fn: React.Dispatch<React.SetStateAction<boolean>>): void {
    getAPI<{authenticated: boolean}>("/authenticated").then(res => {
        ok_fn(res.data.authenticated);
    });
}

export function logout(ok_fn: React.Dispatch<React.SetStateAction<boolean>>): void {
    getAPI<{authenticated: boolean}>("/logout").then(res => {
        ok_fn(res.data.authenticated);
    });
}

export function login(token_id: string, ok_fn: React.Dispatch<React.SetStateAction<boolean>>): void {
    postAPI<{authenticated: boolean}>("/login", {token_id: token_id}).then(res => {
        ok_fn(res.data.authenticated);
    });
}

export function getDocuments(ok_fn: React.Dispatch<React.SetStateAction<{doc_id: number, doc_name: string}[]>>): void {
    getAPI<{documents: Array<{doc_id: number, doc_name: string}>}>("/dashboard/get").then(res => {
        ok_fn(res.data.documents);
    });
}

export function postDocument(doc_name: string, ok_fn: React.Dispatch<React.SetStateAction<{doc_id: number, doc_name: string}[]>>): void {
    postAPI<null>("/dashboard/new", {name: doc_name}).then(res => {
        if(res.status === "ok") {
            getDocuments(ok_fn);
        }
    });
}

export function reqAuthToken(doc_id: number, ok_fn: React.Dispatch<React.SetStateAction<string>>): void {
    postAPI<{authToken: string}>('/token', {doc_id: doc_id}).then(res => {
        ok_fn(res.data.authToken);
    });
}