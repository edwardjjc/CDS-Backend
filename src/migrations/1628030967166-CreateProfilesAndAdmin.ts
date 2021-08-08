import { hash } from "bcrypt";
import { Perfiles, Usuarios } from "src/entities";
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProfilesAndAdmin1628030967166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const perfRepo = queryRunner.connection.getRepository(Perfiles);
        const usuRepo = queryRunner.connection.getRepository(Usuarios);

        await perfRepo.insert([
            {
                createdBy: "admin",
                lastChangedBy: "admin",
                descripcion: "Administrator"
            },
            {
                createdBy: "admin",
                lastChangedBy: "admin",
                descripcion: "Seguridad"
            },
            {
                createdBy: "admin",
                lastChangedBy: "admin",
                descripcion: "Operador"
            },
            {
                createdBy: "admin",
                lastChangedBy: "admin",
                descripcion: "Sensor"
            }
        ]);

        const perfil = await perfRepo.findOne({ where: { descripcion: "Administrator"} });

        await usuRepo.insert([
            {
                createdBy: "admin",
                lastChangedBy: "admin",
                username: "admin",
                password: await hash("admin", 10),
                email: "admin@cds.com.do",
                perfil: perfil
            },

            {
                createdBy: "admin",
                lastChangedBy: "admin",
                username: "sensor",
                password: await hash("Di$pos1tiv0IoT", 10),
                email: "admin@cds.com.do",
                perfil: perfil
            }
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE perfiles CASCADE;`);
        await queryRunner.query(`TRUNCATE TABLE usuarios CASCADE;`);
    }

}
