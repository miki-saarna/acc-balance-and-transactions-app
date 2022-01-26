import { storeAccessToken } from "../utils/api";

async function AccessTokenDB(access_token: string, item_id: string, signal): Promise<void> {
    await storeAccessToken(access_token, item_id, signal)
}

export default AccessTokenDB;