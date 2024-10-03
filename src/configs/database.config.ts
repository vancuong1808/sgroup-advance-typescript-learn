import mysql, { Pool, PoolConnection, PoolOptions } from 'mysql2/promise'
import { envDataBase } from '../env'

const options : PoolOptions = {
    host: envDataBase.HOST,
    port : envDataBase.PORT,
    user: envDataBase.USER,
    password: envDataBase.PASSWORD,
    database: envDataBase.DATABASE
}

const db : Pool = mysql.createPool(options);

( async() => {
    try {
        const connection : PoolConnection = await db.getConnection();
        if ( connection ) {
            console.log( 'Database connected' );
        } else {
            console.log( 'Database not connected' );
        }
        connection.release();
    } catch( error : unknown ) {
        console.log( error );
    }
})

export default db;