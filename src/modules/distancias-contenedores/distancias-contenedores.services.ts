import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Configuraciones, Contenedores, DistanciasContenedores } from "src/entities";
import { Repository } from "typeorm";
import { AddDistanciaContenedor } from "./dto/add-distancia-contenedor.request";
import { GoogleDistanceApiResponse } from './dto/google-distance-api.response';
import { GoogleApi } from 'src/models/config/google-api.request';
import { configService } from 'src/config/app.config';
import { HttpService } from '@nestjs/axios';
import { randomUUID } from "crypto";
import { Distancias } from "./dto/distancias.response";

@Injectable()
export class DistanciaContenedoresServices {
    
    constructor(@InjectRepository(DistanciasContenedores) private readonly _repo: Repository<DistanciasContenedores>,
                @InjectRepository(Contenedores) private readonly _repoContenedores: Repository<Contenedores>,
                @InjectRepository(Configuraciones) private readonly _repoConfiguraciones: Repository<Configuraciones>,
                private httpService: HttpService) {}

    async getAll(): Promise<DistanciasContenedores[]> {
        try {
            return this._repo.find({ relations: ["contenedorOrigen", "contenedorDestino"], order: { createDateTime: "ASC" } });
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
    
    async getDistanceMatrix(): Promise<Distancias> {
        try {
            let distancias: Distancias = new Distancias();
            let contenedoresDB = await this._repoContenedores.find({ where: { pendienteRecoleccion: true } });
            let configuraciones = await this._repoConfiguraciones.findOne();

            let contenedores: Contenedores[] = [];
            contenedores.push({ id: randomUUID(), tipoContenedor: undefined, dispositivosIoT: undefined, rutasContenedores: undefined, distanciasContenedoresOrigen: undefined, distanciasContenedoresDestino: undefined, descripcion: "Punto Origen", direccion: "", gpsLatitude: configuraciones.gpsLatitudePuntoOrigen, gpsAltitude: configuraciones.gpsAltitudePuntoOrigen, pendienteRecoleccion: false, isActive: false, isArchived: false, createDateTime: new Date(), createdBy: "", lastChangedDateTime: new Date(), lastChangedBy: "", internalComment: "" });
            contenedores.push(...contenedoresDB);
            contenedores.push({ id: randomUUID(), tipoContenedor: undefined, dispositivosIoT: undefined, rutasContenedores: undefined, distanciasContenedoresOrigen: undefined, distanciasContenedoresDestino: undefined, descripcion: "Punto Destino", direccion: "", gpsLatitude: configuraciones.gpsLatitudePuntoDestino, gpsAltitude: configuraciones.gpsAltitudePuntoDestino, pendienteRecoleccion: false, isActive: false, isArchived: false, createDateTime: new Date(), createdBy: "", lastChangedDateTime: new Date(), lastChangedBy: "", internalComment: "" });

            distancias.contenedores = contenedores;

            let result: number[][] = [];
            let row: number[] = [];
            let distanciasContenedores = await this.getAll();
            let origenActual: string = "";
            for (let i = 0; i < distanciasContenedores.length; i++) {
                let distanciaContenedor = distanciasContenedores[i];
                let contenedorId = distanciaContenedor.contenedorOrigen ? distanciaContenedor.contenedorOrigen.id : "ID";
                if (origenActual != contenedorId){
                    if (origenActual != ""){
                        result.push(row);
                    }
                    let clean: number[] = []
                    row = clean;
                    origenActual = contenedorId;
                }
                row.push(Number.parseInt(distanciaContenedor.duracion.toString()));
                if(i == distanciasContenedores.length -1){
                    result.push(row);
                }
            }

            distancias.matrix = result;
            return distancias;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async fill() {
        try {
            let configuraciones = await this._repoConfiguraciones.findOne();
            let ultimaAcutalizacionCont = await this._repoContenedores.findOne({ order: { lastChangedDateTime: "DESC" } });

            if (configuraciones.fechaUltimaConstruccion > ultimaAcutalizacionCont.lastChangedDateTime){
                return;
            }

            console.log("error")

            let contenedoresDB = await this._repoContenedores.find({});
            let distanciasContenedores: DistanciasContenedores[] = [];
            let googleApi: GoogleApi = configService.getGoogleApiConfig();
            let locations: string = "";

            let contenedores: Contenedores[] = [];
            contenedores.push({ id: randomUUID(), tipoContenedor: undefined, dispositivosIoT: undefined, rutasContenedores: undefined, distanciasContenedoresOrigen: undefined, distanciasContenedoresDestino: undefined, descripcion: "", direccion: "", gpsLatitude: configuraciones.gpsLatitudePuntoOrigen, gpsAltitude: configuraciones.gpsAltitudePuntoOrigen, pendienteRecoleccion: false, isActive: false, isArchived: false, createDateTime: new Date(), createdBy: "", lastChangedDateTime: new Date(), lastChangedBy: "", internalComment: "" });
            contenedores.push(...contenedoresDB);
            contenedores.push({ id: randomUUID(), tipoContenedor: undefined, dispositivosIoT: undefined, rutasContenedores: undefined, distanciasContenedoresOrigen: undefined, distanciasContenedoresDestino: undefined, descripcion: "", direccion: "", gpsLatitude: configuraciones.gpsLatitudePuntoDestino, gpsAltitude: configuraciones.gpsAltitudePuntoDestino, pendienteRecoleccion: false, isActive: false, isArchived: false, createDateTime: new Date(), createdBy: "", lastChangedDateTime: new Date(), lastChangedBy: "", internalComment: "" });

            for (let i = 0; i < contenedores.length; i++) {
                let contenedorOrigen = contenedores[i];
                locations += "" + contenedorOrigen.gpsLatitude.toString() + "%2C" + contenedorOrigen.gpsAltitude.toString() + "%7C";
                for (let j = 0; j < contenedores.length; j++) {
                    let contenedorDestino = contenedores[j];
                    let distanciaContenedorDTO: AddDistanciaContenedor = new AddDistanciaContenedor();
                    distanciaContenedorDTO.createdBy = "admin";
                    distanciaContenedorDTO.lastChangedBy= "admin";
                    distanciaContenedorDTO.contenedorOrigen = contenedorOrigen;
                    distanciaContenedorDTO.contenedorDestino = contenedorDestino;

                    let distanciaContenedor: DistanciasContenedores = new DistanciasContenedores();
                    Object.assign(distanciaContenedor, distanciaContenedorDTO)

                    distanciasContenedores.push(distanciaContenedor);
                }
            }
            
            locations = locations.substring(0, locations.length -3);
            let googleDistanceApi: string = googleApi.distanceApi.replace(":LOCATIONSO", locations).replace(":LOCATIONSD", locations).replace(":API_KEY", googleApi.apiKey);
            let response = await this.httpService.get(googleDistanceApi).toPromise();
            let googleDistanceResponse: GoogleDistanceApiResponse = new GoogleDistanceApiResponse();
            
            if (response.status == 200) {
                googleDistanceResponse = response.data;
                
                for (let c = 0; c < contenedores.length; c++) {
                    let contenedor = contenedores[c];
                    let distancias = distanciasContenedores.filter(contenedores => contenedores.contenedorOrigen.id == contenedor.id);
                    let rows = googleDistanceResponse.rows[c];
                    
                    for (let d = 0; d < distancias.length; d++) {

                        let contenedorOrigen = distancias[d].contenedorOrigen;
                        let contenedorDestino = distancias[d].contenedorDestino;

                        if (c == 0 || c == contenedores.length - 1) {
                            contenedorOrigen = null;
                        }
                        if (d == 0 || d == distancias.length - 1) {
                            contenedorDestino = null;
                        }

                        let distanciaContenedorDTO: AddDistanciaContenedor = new AddDistanciaContenedor();
                        distanciaContenedorDTO.createdBy = "admin";
                        distanciaContenedorDTO.lastChangedBy= "admin";
                        distanciaContenedorDTO.contenedorOrigen = contenedorOrigen;
                        distanciaContenedorDTO.contenedorDestino = contenedorDestino;
                        distanciaContenedorDTO.distancia = rows.elements[d].distance.value;
                        distanciaContenedorDTO.distanciaStr = rows.elements[d].distance.text;
                        distanciaContenedorDTO.duracion = rows.elements[d].duration.value;
                        distanciaContenedorDTO.duracionStr = rows.elements[d].duration.text
                        

                        let distanciaContenedor: DistanciasContenedores = new DistanciasContenedores();
                        Object.assign(distanciaContenedor, distanciaContenedorDTO)

                        await this._repo.save(distanciaContenedor);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeAll() {
        try {
            let actualDistanceMatrix = await this.getAll();
            if (actualDistanceMatrix.length > 0) {
                await this._repo.remove(actualDistanceMatrix);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}