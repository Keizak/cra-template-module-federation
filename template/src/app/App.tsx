import React from 'react';

export type AppPropsType = {
    baseUrl?: string
}

export function App(props: AppPropsType) {
    return (
        <div>Local app</div>
    );
}