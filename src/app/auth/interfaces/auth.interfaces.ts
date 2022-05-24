export interface Usuario {
    id?:               number;
    nombre:           string;
    apellido_paterno: string;
    apellido_materno: string;
    codigoEmpleado:   string;
    password:         string;
    idRol:            number;
    rolName?:          string;
    rol:              Rol;
}

export interface Rol {
    id:          number;
    descripcion: string;
}