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
            await this.fillDistances();
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

    private async fillDistances() {
        try {
            let ultimaConstruccion = await this._repo.findOne({ order: { createDateTime: "DESC" } });
            let ultimaAcutalizacionCont = await this._repoContenedores.findOne({ order: { lastChangedDateTime: "DESC" } });
            let fechaUltimaConstruccion = ultimaConstruccion ? ultimaConstruccion.createDateTime : new Date(1900, 1, 1);
            let fechaUltimaActualizacionCont = ultimaAcutalizacionCont ? ultimaAcutalizacionCont.createDateTime : new Date();
            
            if (fechaUltimaConstruccion >= fechaUltimaActualizacionCont){
                return;
            }

            let configuraciones = await this._repoConfiguraciones.findOne();
            let contenedoresDB = await this._repoContenedores.find({});
            let distanciasContenedores: DistanciasContenedores[] = [];
            
            let contenedores: Contenedores[] = [];
            contenedores.push({ id: randomUUID(), tipoContenedor: undefined, dispositivosIoT: undefined, rutasContenedores: undefined, distanciasContenedoresOrigen: undefined, distanciasContenedoresDestino: undefined, descripcion: "", direccion: "", gpsLatitude: configuraciones.gpsLatitudePuntoOrigen, gpsAltitude: configuraciones.gpsAltitudePuntoOrigen, pendienteRecoleccion: false, isActive: false, isArchived: false, createDateTime: new Date(), createdBy: "", lastChangedDateTime: new Date(), lastChangedBy: "", internalComment: "" });
            contenedores.push(...contenedoresDB);
            contenedores.push({ id: randomUUID(), tipoContenedor: undefined, dispositivosIoT: undefined, rutasContenedores: undefined, distanciasContenedoresOrigen: undefined, distanciasContenedoresDestino: undefined, descripcion: "", direccion: "", gpsLatitude: configuraciones.gpsLatitudePuntoDestino, gpsAltitude: configuraciones.gpsAltitudePuntoDestino, pendienteRecoleccion: false, isActive: false, isArchived: false, createDateTime: new Date(), createdBy: "", lastChangedDateTime: new Date(), lastChangedBy: "", internalComment: "" });

            for (let i = 0; i < contenedores.length; i++) {
                let contenedorOrigen = contenedores[i];
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

            let distancias: AddDistanciaContenedor[] = await this.getGoogleDistanceMatrix(distanciasContenedores, contenedores);

            for(let i = 0; i < contenedores.length; i++){
                let contenedor: Contenedores = contenedores[i];
                let distanciasF: AddDistanciaContenedor[] = distancias.filter(f => f.contenedorOrigen.id == contenedor.id);
                for(let f = 0; f < distanciasF.length; f++){
                    let distancia: AddDistanciaContenedor = distanciasF[f];

                    let distanciaContenedor: DistanciasContenedores = new DistanciasContenedores();
                    Object.assign(distanciaContenedor, distancia);

                    if(distancia.contenedorOrigen.createdBy == ""){
                        distanciaContenedor.contenedorOrigen = undefined;
                    }
                    if(distancia.contenedorDestino.createdBy == ""){
                        distanciaContenedor.contenedorDestino = undefined;
                    }
                    
                    await this._repo.save(distanciaContenedor);
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getGoogleDistanceMatrix(distanciasContenedores: DistanciasContenedores[], contenedores: Contenedores[]): Promise<AddDistanciaContenedor[]>{
        try {
            let result: AddDistanciaContenedor[] = [];
            const cantLocations: number = 10;
            let googleApi: GoogleApi = configService.getGoogleApiConfig();
            let ciclos = Math.floor(contenedores.length / cantLocations);
            let residuo = contenedores.length % cantLocations;
            if (residuo > 0) {
                ciclos = ciclos + 1;
            }

            for (let cicloO = 0; cicloO < ciclos; cicloO++) {
                let contenedoresOrigen: Contenedores[] = [];
                let locationsO: string = "";
                if (cicloO == (ciclos - 1) && residuo > 0){
                    contenedoresOrigen = contenedores.slice(cicloO * cantLocations, (cicloO * cantLocations) + residuo);
                } else {
                    contenedoresOrigen = contenedores.slice(cicloO * cantLocations, (cicloO + 1) * cantLocations);
                }

                for (let lo = 0; lo < contenedoresOrigen.length; lo++){
                    locationsO += "" + contenedoresOrigen[lo].gpsLatitude.toString() + "%2C" + contenedoresOrigen[lo].gpsAltitude.toString() + "%7C";
                } 
                locationsO = locationsO.substring(0, locationsO.length -3);

                for (let cicloD = 0; cicloD < ciclos; cicloD++) {
                    let locationsD: string = "";
                    let contenedoresDestino: Contenedores[] = [];
                    if (cicloD == (ciclos - 1) && residuo > 0){
                        contenedoresDestino = contenedores.slice(cicloD * cantLocations, (cicloD * cantLocations) + residuo);
                    } else {
                        contenedoresDestino = contenedores.slice(cicloD * cantLocations, (cicloD + 1) * cantLocations);
                    }

                    for (let ld = 0; ld < contenedoresDestino.length; ld++){
                        locationsD += "" + contenedoresDestino[ld].gpsLatitude.toString() + "%2C" + contenedoresDestino[ld].gpsAltitude.toString() + "%7C";
                    } 
                    locationsD = locationsD.substring(0, locationsD.length -3);
                    let googleDistanceApi: string = googleApi.distanceApi.replace(":LOCATIONSO", locationsO).replace(":LOCATIONSD", locationsD).replace(":API_KEY", googleApi.apiKey);
                    let response = await this.httpService.get(googleDistanceApi).toPromise();
                    let googleDistanceResponse: GoogleDistanceApiResponse = new GoogleDistanceApiResponse();
        
                    if (response.status == 200 && response.data.status == "OK") {
                        googleDistanceResponse = response.data;
                        for (let c = 0; c < contenedoresOrigen.length; c++) {
                            let contenedorO = contenedoresOrigen[c];
                            let rows = googleDistanceResponse.rows[c];
                            
                            for (let d = 0; d < contenedoresDestino.length; d++) {
                                let contenedorD = contenedoresDestino[d];
                                let distancias = distanciasContenedores.filter(contenedores => contenedores.contenedorOrigen.id == contenedorO.id && contenedores.contenedorDestino.id == contenedorD.id);
                                let contenedorOrigen = distancias[0].contenedorOrigen;
                                let contenedorDestino = distancias[0].contenedorDestino;
        
                                let distanciaContenedorDTO: AddDistanciaContenedor = new AddDistanciaContenedor();
                                distanciaContenedorDTO.createdBy = "admin";
                                distanciaContenedorDTO.lastChangedBy= "admin";
                                distanciaContenedorDTO.contenedorOrigen = contenedorOrigen;
                                distanciaContenedorDTO.contenedorDestino = contenedorDestino;
                                distanciaContenedorDTO.distancia = rows.elements[d].distance.value;
                                distanciaContenedorDTO.distanciaStr = rows.elements[d].distance.text;
                                distanciaContenedorDTO.duracion = rows.elements[d].duration.value;
                                distanciaContenedorDTO.duracionStr = rows.elements[d].duration.text
                                
                                result.push(distanciaContenedorDTO);
                            }
                        }
                    }
                }
            }
            return result;
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