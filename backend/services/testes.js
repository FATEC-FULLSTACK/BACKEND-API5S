const {fetchTemp} = require('./nasa_api')

/*
 DADOS TESTES PARA COORDENADAS E TEMPO
 --------------------------------------
 
 
 ---------------------------------------
 */

 
const start = "20241001";
const end = "20241101";
const latitude = -23.103170;
const longitude = -45.735627;

fetchTemp(start,end,latitude,longitude);