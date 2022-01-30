import { storeAccessToken } from "../utils/api";

async function AccessTokenDB(access_token: string, item_id: string, signal): Promise<void> {
    
    try {
        // console.log(item_id)
        await storeAccessToken(access_token, item_id, signal)
    } catch (error) {
        console.error(error);
    }
}

export default AccessTokenDB;