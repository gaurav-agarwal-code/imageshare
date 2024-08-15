import { useAuth } from "../store/auth";


export function Contact(props) {
    const { user } = useAuth();

    console.log("User in Contact:", user);

    return (
        <>
            {user ? <p>{user.username}</p> : <p>Loading user data...</p>}
        </>
    );
}

