import { Usuario } from './../../auth/interfaces/auth.interfaces';

export interface Vaca {
    id?:                 number;
    codigoVaca:         string;
    pesoKgs:            number;
    idRaza:             number;
    fechaNac:           string | null;
    viva:               number;
    motivomuerte?:       null;
    razaName?:           string;
    ultimaInseminacion?: string;
    raza?:               Raza;
    prenada?: number | null;
}

export interface Raza {
    id:          number;
    descripcion: string;
}

export interface UltimaInseminacion {
    fecha: Date;
}
export interface Respuesta {
    resultado: boolean;
    msg:       any;
}


export interface Inseminacion {
    resultado:      boolean;
    inseminaciones: Inseminacione[];
}

export interface Inseminacione {
    id:        number;
    idVaca:    number;
    fecha?:     Date;
    resultado?: number;
}

export interface LecheXdias {
    result: Result[];
}

export interface Result {
    idVaca:      any;
    codigoVaca:  string;
    idRaza:      number;
    pesoKgs:     number;
    cantidadLts: number | null;
    idleche:     number | null;
    fecha:       Date | null;
    razaName : string ;
}


export interface Tarea {
    id:           number;
    idUsuario:    number;
    idSupervisor: number;
    estado:       number;
    descripcion:  string;
    created_at:   Date;
    updated_at:   string;
    estatus:      string;
    usuario:      Usuario;
    supervisor:   Usuario;
}



export interface Rol {
    id:          number;
    descripcion: string;
}