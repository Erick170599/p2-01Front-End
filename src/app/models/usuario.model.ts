export class Usuario {
  constructor(
    public email: string,
    public password: string,
    public nombre?: string,
    public idUsuario?: number,
    public activo?: boolean,
    public facebook?: boolean,
    public nativo?: boolean,
    public imagen?: string
  ) {}
}
