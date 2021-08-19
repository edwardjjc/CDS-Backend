import { Configuraciones } from "src/entities";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConfiguration1628030992314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const confRepo = queryRunner.connection.getRepository(Configuraciones);
        await confRepo.insert([{
            createdBy: "admin",
            lastChangedBy: "admin",
            porcentajeMaxContenedores: 40,
            direccionPuntoDestino: "",
            gpsAltitudePuntoDestino: -69.967782,
            gpsLatitudePuntoDestino: 18.567446,
            direccionPuntoOrigen: "",
            gpsAltitudePuntoOrigen: -69.927426,
            gpsLatitudePuntoOrigen: 18.44814,
            fechaUltimaConstruccion: new Date()
        }]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE configuraciones CASCADE;`);
    }

}
