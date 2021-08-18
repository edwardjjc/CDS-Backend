import { Solucion } from "./solucion.worker";

import { solveTsp } from 'node-tspsolver';

export class Kopt {

    private cantCiudades: number = 0;
    private mapa: any[];

    constructor(mapa: any[]) {
        this.cantCiudades = mapa.length;
        this.mapa = mapa;
    }

    async solve(){
        return solveTsp(this.mapa, false);
    }

    opt2_swap(ind: any[], i: number, j: number) {
        return [...ind.slice(0,i+1),...(ind.slice(i+1,j+1).reverse()),...ind.slice(j+1)];
    }

    opt2(s: Solucion){
        let mapa=this.mapa;
        let CIUDADES=this.cantCiudades;
        let ind=s.individuo;
        let mejora={ valor: 0, individuo: []};
        let valor=s.valor;  
        do {
            mejora.valor=valor;
            mejora.individuo=ind;
            for (let i=0;i<CIUDADES-2;i++){
                for (let j=i+2;j<CIUDADES;j++){
                    let aux=((j+1)<CIUDADES)?j+1:0;
                    let d0=(mapa[ind[i]][ind[i+1]] + mapa[ind[j]][ind[aux]]);
                    let d1=(mapa[ind[i]][ind[j]] + mapa[ind[i+1]][ind[aux]]);
                    if ( d0 > d1 ) {
                        ind=this.opt2_swap(ind,i,j);
                        valor-= d0 - d1;
                    }    
                }
            }
        }while(valor<mejora.valor);
        s.individuo=mejora.individuo;
        s.valor=mejora.valor;
        return s;
    }
}