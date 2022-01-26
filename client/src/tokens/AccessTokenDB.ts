import { storeAccessToken } from "../utils/api";

async function AccessTokenDB(access_token: string, item_id: string, signal): Promise<void> {
    try {
        await storeAccessToken(access_token, item_id, signal)
    } catch (error) {
        console.error(error);
    }
}

export default AccessTokenDB;