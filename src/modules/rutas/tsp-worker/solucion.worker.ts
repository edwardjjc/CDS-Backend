import { Contenedores } from 'src/entities';
import { Kopt } from './k-opt.worker';

export class Solucion {

    public mapa: any[];
    public individuo: number[];
    public valor: number;
    public contenedores: any[] = [];
    public next: number[];
    public previous: number[];
    public lookup: number[];

    constructor(mapa: any[],s,noEvaluar: boolean=true){
        this.mapa=mapa;
        if (s==null){
            this.individuo=this.crearIndividuo(mapa);
            //this.evaluar();        
        } else if (Array.isArray(s)){
            this.individuo=s;
            if (noEvaluar) //por default evalua
                this.evaluar();
        } else {
            this.individuo=s.individuo;
            this.valor=s.valor;
        }
    }

    clonar(){
        return new Solucion(this.mapa,{"individuo":this.individuo.slice(),"valor":this.valor});
    }


    evaluar=(contenedores?: Contenedores[])=>{
        let suma=0,ind=this.individuo;
        console.log(this.individuo)
        console.log(contenedores)
        let anterior=ind[ind.length-1];
        ind.forEach(actual => {
            let contenedor = contenedores[actual];
            console.log(contenedor)
            let contenedorOrd = { 
                id: contenedor.id, 
                gpsLatitude: contenedor.gpsLatitude,
                descripcion: contenedor.descripcion,
                gpsAltitude: contenedor.gpsAltitude,
                orden: actual + 1 
            }
            suma+=parseInt(this.mapa[anterior][actual]); // ir desde hasta
            anterior=actual;
            this.contenedores.push(contenedorOrd);
        });
        this.valor=suma;
        return suma;
    }

    formatear=(sufix="")=>{
        return `(${this.valor})[${this.individuo.toString()}]${sufix}`;
    }

    save(filename){
        var fs = require('fs');
        fs.appendFile(filename,JSON.stringify({"individuo":this.individuo,"valor":this.valor})+"\n",(err)=>{
            if (err) console.log ("ERROR");
         });           
    }
 
    print(sufix=""){
        console.log (this.formatear(sufix));
    }

    // mutacion_swap_3opt(){
    //     let kopt=new Kopt(this.mapa);
    //     let n=this.individuo.length;
    //     let i=parseInt((Math.random()*(n-4)).toString());
    //     let j=parseInt((Math.random()*(n-4-i)).toString())+(i+2);
    //     let k=parseInt((Math.random()*(n-2-j)).toString())+(j+2);
    //     let mov=parseInt((Math.random()*8).toString());
    //     return new Solucion(this.mapa,kopt.opt3_swap(this.individuo,i,j,k,mov));
    // }

    // mutacion_move_3opt(){ //modifica solucion interna
    //     let kopt=new Kopt(this.mapa);
    //     let n=this.individuo.length;
    //     let i=parseInt(Math.random()*(n-4));
    //     let j=parseInt(Math.random()*(n-4-i))+(i+2);
    //     let k=parseInt(Math.random()*(n-2-j))+(j+2);
    //     kopt.opt3_move(this,i,j,k);
    //     return this;
    // }

    mutacion_swap(evaluar=true){ //no crea sol nueva
        let i=parseInt((Math.random()*(this.individuo.length-1)).toString())+1;
        let j=parseInt((Math.random()*(this.individuo.length-1)).toString())+1;
        //console.log (i,j);
        this.swap(i,j,this.individuo);
        if (evaluar)this.evaluar();
        return this;
    }

    mutacion_swap_opt2(){ //no crea sol nueva
        let k=new Kopt(this.mapa);
        this.mutacion_swap();
        k.opt2(this);
        return this;
    }

    mutacion_reversa(){
        this.individuo=[0,...this.individuo.slice(1).reverse()];
        return this;
    }

    mutacion_insercion(){
        let a=this.individuo.splice(parseInt((Math.random()*(this.individuo.length-1)).toString())+1,1);
        this.individuo.splice(parseInt((Math.random()*(this.individuo.length-1)).toString())+1,0,a.pop());
        this.evaluar();
        return this;
    }

    normalizar=()=>{
        let ind=this.individuo;
        let cero=ind.indexOf(0);
        ind=[...ind.slice(cero),...ind.slice(0,cero)];
        this.individuo=ind;
    }    

    nextNodo(){
        let largo=this.individuo.length;
        let next=[];
        let previous=[]
        for (let i=0;i<largo;i++){
            next[this.individuo[i]]=this.individuo[(i+1)%largo];
            previous[this.individuo[(i+1)%largo]]=this.individuo[i];
        }
        this.next=next;
        this.previous=previous;
    }

    check(){
        if (this.mapa.length!=this.individuo.length){
            console.log ("por largo");
            return false;
        }

        let ind=this.individuo;
        for (let i=0;i<ind.length-1;i++){
            for (let j=i+1;j<ind.length;j++){
                if (ind[i]==ind[j]){
                    console.log("repetidas",i,j);
                    return false;
                }
                    
            }
        }
        if (this.valor!=this.evaluar()){
            console.log ("por valor");
            return false;
        }
        console.log ("all test passed ....");   
        return true;
    }

    dividir=(desde,hasta)=>{
        if (hasta-desde<=0) return null;
        let cont=0;
        let lookup=[];
        let nuevoMapa=[];
        for (let i=desde;i<hasta;i++){
            lookup[cont]=this.individuo[i];
            nuevoMapa[cont++]=[];
        }
        for (let i=0;i<lookup.length;i++){
            for (let j=0;j<lookup.length;j++){
                nuevoMapa[i][j]=this.mapa[lookup[i]][lookup[j]];
            }
        }
        let s=new Solucion(nuevoMapa,[...Array(lookup.length).keys()]);
        s.lookup=lookup;
        return s;
    }   

    reunir=(soluciones)=>{
        let reunir_2=(ind1,ind2,lookup1,lookup2)=>{
            if (lookup1==null){
                lookup1=new Array(ind1.length);
                for (let n of ind1.values()){
                    lookup1[n]=n;
                }
            }
            let ind=[];
            let sol=[-Infinity];
            for(let i=0;i<ind1.length;i++){
                let j=(i+1)%ind1.length;
                for (let k=0;k<ind2.length;k++){
                    let l=(k+1)%ind2.length;
                    let vi=lookup1[ind1[i]];
                    let vj=lookup1[ind1[j]];
                    let vk=lookup2[ind2[k]];
                    let vl=lookup2[ind2[l]];
                    let base=this.mapa[vi][vj]+this.mapa[vk][vl];
                    let g0=base-this.mapa[vi][vk]-this.mapa[vj][vl];
                    let g1=base-this.mapa[vi][vl]-this.mapa[vj][vk];
                    if (g0>sol[0]) sol=[g0,i,j,k,l,0];
                    if (g1>sol[0]) sol=[g1,i,j,k,l,1];
                }
            }
            let nodo=sol[2];
            let adn=ind1;
            let lookup=lookup1;
            let sentido=0;
            do {
                ind.push(lookup[adn[nodo]]);
                if (adn==ind1 && nodo==sol[1]){
                    adn=ind2;
                    lookup=lookup2;
                    sentido=sol[5];
                    nodo=(sentido==0)?sol[3]:sol[4];
                } else if (sentido==0) { 
                    nodo++;
                    if (nodo>=adn.length)nodo=0;
                } else {
                    nodo--;
                    if (nodo<0)nodo=adn.length-1;
                }
            } while(ind.length<ind1.length+ind2.length);
            return ind;
        }

        if (soluciones.length>1){
            let eses=soluciones[0].individuo;
            let l1=soluciones[0].lookup;
            for (let i=1;i<soluciones.length;i++){
                eses=reunir_2(eses,soluciones[i].individuo,l1,soluciones[i].lookup);
                l1=null;
            }
            //console.log(JSON.stringify(eses));
            let ns= new Solucion(this.mapa,eses);
            ns.normalizar();
            return ns;
        } else {
            return null;
        }
    }

    crearIndividuo=(mapa)=>{
        let perm=[...Array(mapa.length).keys()];
        let max=mapa.length-1;
        for(let i=max;i>0;i--){//swapea desde la max hasta 1
            this.swap(i,parseInt((Math.random()*max).toString())+1,perm);
        }
        return perm;
    }
    
    swap=(i,j,A)=>{
        let aux=A[i];
        A[i]=A[j];
        A[j]=aux;
    } 

}
