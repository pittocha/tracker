import { useState, useEffect } from "react";
import { getAuthentificatedUser } from "./common";

export function useUser() {
    const [connectedUser, setConnectedUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        async function getUserDetails() {
            const { authentificated, user } = await getAuthentificatedUser();
            setConnectedUser(user);
            setAuth(authentificated);
            setUserLoading(false);
        }
        getUserDetails();
    }, []);
    return { connectedUser, auth, userLoading };
}