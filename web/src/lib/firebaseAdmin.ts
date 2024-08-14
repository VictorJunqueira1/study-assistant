import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as path from 'path';
import * as admin from 'firebase-admin';

const serviceAccountPath = path.resolve(__dirname, './serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);

initializeApp({
    credential: cert(serviceAccount)
});

const auth = getAuth();

const getUserUID = async (email: string) => {
    try {
        const userRecord = await auth.getUserByEmail(email);
        console.log("UID do usuário:", userRecord.uid);
        return userRecord.uid;
    } catch (error) {
        console.error("Erro ao obter o usuário:", error);
        throw error;
    }
};

export { getUserUID };