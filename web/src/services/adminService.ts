import * as admin from 'firebase-admin';
import serviceAccount from '../services/config/serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: 'https://study-assistant-2bf95-default-rtdb.firebaseio.com'
});

const db = admin.database();

const getUserUID = async (email: string): Promise<string> => {
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        console.log('UID do usuário:', userRecord.uid);
        return userRecord.uid;
    } catch (error) {
        console.error('Erro ao obter o usuário:', error);
        throw error;
    }
};

export { getUserUID };