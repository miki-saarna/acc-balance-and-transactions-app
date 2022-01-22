import { storeAccessToken } from "../utils/api";

async function AccessTokenDB(access_token: string, item_id: string): Promise<void> {
    await storeAccessToken(access_token, item_id)
}

export default AccessTokenDB;