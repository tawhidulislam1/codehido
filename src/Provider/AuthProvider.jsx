/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { app } from "../Firebase/Firebase.init";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app);
const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        return signOut(auth);
    };
    const updateUser = (name, PhotoUrl) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: PhotoUrl,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    const { data } = await axiosPublic.post("/jwt", { email: currentUser.email });
                    if (data?.token) {
                        localStorage.setItem("access-token", data.token);
                    } else {
                        console.error("JWT refresh failed: no token returned", data);
                        localStorage.removeItem("access-token");
                    }
                } catch (error) {
                    console.error("JWT refresh failed:", error.response?.data || error.message);
                    localStorage.removeItem("access-token");
                }
            } else {
                localStorage.removeItem("access-token");
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const AuthInfo = {
        user,
        loading,
        setLoading,
        createUser,
        logIn,
        logOut,
        updateUser
    };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;