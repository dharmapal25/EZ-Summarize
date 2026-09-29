import "dotenv/config";
// dotenv.config();

const env = {
    PORT : process.env.PORT,
    GOOGLE_API_KEY : process.env.GOOGLE_API_KEY,
    GOOGLE_MODEL : process.env.GOOGLE_MODEL,
    GROQ_API_KEY : process.env.GROQ_API_KEY,
    GROQ_MODEL : process.env.GROQ_MODEL,
}

// console.log(env)
export default env