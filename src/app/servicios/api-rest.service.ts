import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../models/consulta';
@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) {}
  getDatosJson(url:string,condiciones:Consulta){
    let argumento = `?anioIni=${condiciones.anioIni}&anioFin=${condiciones.anioFin}&mesIni=${condiciones.mesIni}&mesFin=${condiciones.mesFin}&diaIni=${condiciones.diaIni}&diaFin=${condiciones.diaFin}&horaIni=${condiciones.horaIni}&horaFin=${condiciones.horaFin}&minutoIni=${condiciones.minutoIni}&minutoFin=${condiciones.minutoFin}`;
    console.log(argumento);
  	return this.http.get(url+argumento)
  }
}
