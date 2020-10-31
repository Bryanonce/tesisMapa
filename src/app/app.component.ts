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
  public coorden = [];
  constructor(public datos: ApiRestService){
  	this.datos.getDatosJson(environment.Apirest).subscribe((res:any)=>{
  		res.usuarios.forEach((elemento)=>{
  			this.coorden.push([elemento.lat,elemento.long]);
  		})
  		console.log(res.usuarios);
  		console.log(this.coorden);
  		/*for(let i=0;i<res.length;i++){
  			this.coorden.push(res[i].lat,res[i].long);
  		}*/
	});
  }
  ngOnInit(){
	this.mapa = new mapboxgl.Map({ 
	accessToken: environment.claveMapbox,
	container: 'mapa-mapbox', // container id
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-80.096961, -0.712307], // starting position
	zoom: 15 // starting zoom
	})

	this.mapa.on('load', function () {
		this.mapa.addSource('some id', 
		{
			type: 'geojson',
			data: {
				"type": "FeatureCollection",
				"features": [{
					"type": "Feature",
					"properties": {},
					"geometry": {
						"type": "Point",
						"coordinates": this.coorden
					}
				}]
			}
		})
	

	})
	
  }



}
