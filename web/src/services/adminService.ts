import { initializeApp, cert } from "firebase/app";
import { getAuth } from "firebase/auth";

initializeApp({
    credential: cert({
        projectId: "1:653540759289:web:db616a1ddd767e185bb428",
        privateKey: "-----BEGIN PRIVATE KEY-----\n...",
        clientEmail: "firebase-adminsdk-xxxxx@seu-projeto-id.iam.gserviceaccount.com",
    }),
});

const getUserUID = async (email: string) => {
    try {
        const userRecord = await getAuth().getUserByEmail(email);
        console.log("UID do usuário:", userRecord.uid);
        return userRecord.uid;
    } catch (error) {
        console.error("Erro ao obter o usuário:", error);
        throw error;
    }
};

export { getUserUID };