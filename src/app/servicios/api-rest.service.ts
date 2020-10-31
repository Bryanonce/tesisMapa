import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) {}
  getDatosJson(url:string){
  	return this.http.get(url)
  }
}
