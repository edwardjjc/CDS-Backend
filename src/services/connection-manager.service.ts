/* eslint-disable prettier/prettier */

import { join } from "path";
import { Connection, createConnection } from "typeorm";
import { configService } from "../config/bdconfig";

export class ConnectionManager {

    private static instance: ConnectionManager;
    private connection: Connection;

    private async createCDSConnection(){
        //console.log(join(__dirname, '../**/*.entity{.ts,.js}'));
        
    }
}