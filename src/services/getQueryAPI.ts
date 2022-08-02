import axios from "axios";
import { selector } from "recoil";

const searchQuery = selector({
    key: "Text",
    get: async () => {
        try {
            const response = await axios("https://jsonplaceholder.typicode.com/posts");
            return response.data || [];
        } catch (error) {
            console.log(`Erro: ${error}`);
            return []
        }
    }
});

export default searchQuery;