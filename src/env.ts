import dotenv from 'dotenv'
dotenv.config();

export const envServer : {
    PORT: string | number,
    SECRET_KEY: string
}= {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || ""
}

export const envDataBase : {
    HOST: string,
    PORT: number,
    USER: string,
    PASSWORD: string,
    DATABASE: string
} = {
    HOST: process.env.DB_HOST || "",
    PORT: Number.parseInt( process.env.DB_PORT || "3306" ) || 3306,
    USER: process.env.DB_USER || "",
    PASSWORD: process.env.DB_PASSWORD || "",
    DATABASE: process.env.DB_NAME || ""
}

