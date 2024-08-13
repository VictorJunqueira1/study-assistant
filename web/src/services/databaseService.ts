import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";

const fetchData = async (path: string) => {
    const dbRef = ref(database, path);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            console.log("Dados:", snapshot.val());
            return snapshot.val();
        } else {
            console.log("Nenhum dado encontrado");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
};

export { fetchData };