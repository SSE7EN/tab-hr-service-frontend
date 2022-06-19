import React from 'react';
import pubsub from '../../pubsub';
import { Navigate } from 'react-router-dom';

export default function Logout() {
    forgetInfo();
    pubsub.publish('login_change', false);
    return (
        <Navigate to="/" />
    );
}

function forgetInfo() {
    localStorage.removeItem("myToken");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserRole");
}
