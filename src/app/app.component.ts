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
  //mapa: mapboxgl.Map;
  public coorden = [];
  constructor(public datos: ApiRestService){
	this.datos.getDatosJson(environment.Apirest).subscribe((res:any)=>{
		res.usuarios.forEach((elemento)=>{
		this.coorden.push(
			{
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "Point",
					"coordinates": [elemento.long,elemento.lat]
				}
			}
		);
		})
	});
  }
  ngOnInit(){	
	console.log(this.coorden);
	var map = new mapboxgl.Map({ 
		accessToken: environment.claveMapbox,
		container: 'mapa-mapbox', // container id
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [-80.096961, -0.712307], // starting position
		zoom: 15 // starting zoom
	})
	console.log("Mapa cargando .....")
	map.on('load',()=>{
		console.log(this.coorden);
		map.addSource('earthquakes', {
			type: 'geojson',
			data: {
				"type": "FeatureCollection",
				"features": this.coorden
			}
		});
		map.addLayer({
			id: 'trees-point',
			type: 'heatmap',
			source: 'earthquakes',
			paint: {
				'heatmap-color': ['interpolate',['linear'],['heatmap-density'],
					0,
					'rgba(33,102,172,0)',
					0.2,
					'rgb(103,169,207)',
					0.4,
					'rgb(209,229,240)',
					0.6,
					'rgb(253,219,199)',
					0.8,
					'rgb(239,138,98)',
					1,
					'rgb(178,24,43)'
					]
			}
		})
		
	})
  }
}