import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuário autenticado:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        throw error;
    }
};

export { loginUser };