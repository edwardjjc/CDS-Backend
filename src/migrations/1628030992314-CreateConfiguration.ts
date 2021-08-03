import { Configuraciones } from "src/entities";
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateConfiguration1628030992314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const confRepo = queryRunner.connection.getRepository(Configuraciones);
        await confRepo.insert([{
            createdBy: "admin",
            lastChangedBy: "admin",
            porcentajeMaxContenedores: 40,
            direccionPuntoDestino: "",
            gpsAltitudePuntoDestino: 0.00,
            gpsLatitudePuntoDestino: 0.00,
            direccionPuntoOrigen: "",
            gpsAltitudePuntoOrigen: 0.00,
            gpsLatitudePuntoOrigen: 0.00,
            fechaUltimaConstruccion: new Date()
        }]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE configuraciones CASCADE;`);
    }

}
