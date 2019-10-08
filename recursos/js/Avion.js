class Avion{
    constructor(nombre, imagen, vTurbo, vNormal, vProblema,
                limitTurbo, limitNormal, lineaCarrera){

        this.nombre = nombre;
        this.imagen = imagen;
        this.posicionActual = 0;
        this.posicionInicio = 0;
        this.vTurbo = vTurbo;
        this.vNormal = vNormal;
        this.vProblema = vProblema;
        this.limitTurbo = limitTurbo;
        this.limitNormal = limitNormal;
        this.lineaCarrera = lineaCarrera;
    }

    colocarInicio(){
        this.lineaCarrera.cells[0].innerHTML = '<img src="'+ this.imagen + '" alt="imagen avion">';
    }

    nuevoMov(probabilidad){
        if (this.posicionActual < this.lineaCarrera.cells.length){
            if (probabilidad <= this.limitTurbo)
                (this.posicionActual + this.vTurbo >= 250) ? this.posicionActual = 250 : this.posicionActual += this.vTurbo;
            else if (probabilidad <= this.limitNormal)
                (this.posicionActual + this.vNormal >= 250) ? this.posicionActual = 250 : this.posicionActual += this.vNormal;
            else if (this.posicionActual + this.vProblema > 0)
                if(this.posicionActual != 250)
                    this.posicionActual += this.vProblema;
        }                  
    }    

    colocarCasilla(){
        if(this.posicionActual < this.lineaCarrera.cells.length)
            this.lineaCarrera.cells[this.posicionActual].innerHTML = '<img src="'+ this.imagen + '" alt="imagen avion">';
        else
            this.lineaCarrera.cells[this.lineaCarrera.cells.length-1].innerHTML = '<img src="'+ this.imagen + '" alt="imagen avion">';
    }

    reset(){
        this.posicionActual = 0;
    }
}