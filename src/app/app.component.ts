//Servicios
import { ApiRestService } from './servicios/api-rest.service';

import { Component,OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import * as mapboxgl from 'mapbox-gl';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proyectoTesis';
  mapa: mapboxgl.Map;
  constructor(public datos: ApiRestService){
  	this.datos.getDatosJson(environment.Apirest).subscribe((res:any)=>{
  	//this.datos.getDatosJson('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>{
  		console.log(res)
	})
  }
  ngOnInit(){
	this.mapa = new mapboxgl.Map({ 
	accessToken: environment.claveMapbox,
	container: 'mapa-mapbox', // container id
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-80.096961, -0.712307], // starting position
	zoom: 15 // starting zoom
	});
  }

}
