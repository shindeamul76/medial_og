import "module-alias/register";
import { app } from "./app"
import dotenv from 'dotenv';
import { PORT } from "./config";

dotenv.config();



const start = async () => {
    try {
       
        app.listen(PORT, () => console.log(`server is running in port ${PORT}... `));
    } catch (error: any) {
        throw new Error(error.message)
    }
}


start();