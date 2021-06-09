/* eslint-disable prettier/prettier */

import { Connection, createConnection } from "typeorm";

export class ConnectionManager {

    private static instance: ConnectionManager;
    private connection: Connection;

    private async createCDSConnection(){
        await createConnection().then((value) => {
            this.connection = value;
            console.log("Database connection Open!!!");
        }).catch((error) => {
            console.log(error);
            
        });
    }

    public static async getInstance(): Promise<ConnectionManager>{
        if (!ConnectionManager.instance){
            ConnectionManager.instance = new ConnectionManager();
            await ConnectionManager.instance.createCDSConnection().then(() => {
                return ConnectionManager.instance;
            })
        } else {
            return ConnectionManager.instance;
        }
    }

    public getConnection(): Connection {
        console.log(this.connection);
        return this.connection;
    }
}