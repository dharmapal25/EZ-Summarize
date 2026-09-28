import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT : process.env.PORT,
    GOOGLE_API_KEY : process.env.GOOGLE_API_KEY,
    GOOGLE_MODEL : process.env.GOOGLE_MODEL,
}
