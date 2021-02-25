import React from "react";

export const backendService = {
    getRequestsList,
    getPipelines
};

export const BackendContext = React.createContext(backendService);

const BACKEND_URL = 'http://localhost:3500/api';


function getRequestsList() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BACKEND_URL}/list`, requestOptions)
        .then(response => response.json());
}


function getPipelines() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BACKEND_URL}/pipelines`, requestOptions)
        .then(response => response.json());
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}