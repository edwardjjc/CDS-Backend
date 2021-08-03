import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contenedores, DistanciasContenedores } from "src/entities";
import { Repository } from "typeorm";
import { AddDistanciaContenedor } from "./dto/add-distancia-contenedor.request";
import { GoogleDistanceApiResponse } from './dto/google-distance-api.response';
import { GoogleApi } from 'src/models/config/google-api.request';
import { configService } from 'src/config/app.config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DistanciaContenedoresServices {
    
    constructor(@InjectRepository(DistanciasContenedores) private readonly _repo: Repository<DistanciasContenedores>,
                @InjectRepository(Contenedores) private readonly _repoContenedores: Repository<Contenedores>,
                private httpService: HttpService) {}

    async getAll(): Promise<DistanciasContenedores[]> {
        try {
            return this._repo.find({ relations: ["contenedorOrigen", "contenedorDestino"], order: { contenedorOrigen: "ASC", contenedorDestino: "ASC" } });
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
    
    async getDistanceMatrix(): Promise<any[]> {
        try {
            let result: any[] = [];
            let row: any[] = [];
            let distanciasContenedores = await this.getAll();
            let origenActual: string = "";
            for (let i = 0; i < distanciasContenedores.length; i++) {
                let distanciaContenedor = distanciasContenedores[i];
                if (origenActual != distanciaContenedor.contenedorOrigen.id){
                    if (origenActual != ""){
                        result.push(row);
                    }
                    row = [];
                    origenActual = distanciaContenedor.contenedorOrigen.id;
                }
                row.push(distanciaContenedor.duracion);
                if(i == distanciasContenedores.length -1){
                    result.push(row);
                }
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async fill() {
        try {
            let contenedores = await this._repoContenedores.find({});
            let distanciasContenedores: DistanciasContenedores[] = [];
            let googleApi: GoogleApi = configService.getGoogleApiConfig();
            let locations: string = "";

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
                        distancias[d].distancia = rows.elements[d].distance.value;
                        distancias[d].distanciaStr = rows.elements[d].distance.text;
                        distancias[d].duracion = rows.elements[d].duration.value;
                        distancias[d].duracionStr = rows.elements[d].duration.text
                    }
                }

                this._repo.insert(distanciasContenedores);
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