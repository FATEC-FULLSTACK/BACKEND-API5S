const axios = require('axios');

const api_url = `https://power.larc.nasa.gov/api/projection/daily/point?`;

/*
 DADOS TESTES PARA COORDENADAS E TEMPO
--------------------------------------



---------------------------------------

const start = "20241001";
const end = "20241101";
const latitude = -23.103170;
const longitude = -45.735627;
*/


const fetchTemp = async (start, end, lat, long) => {
    try {
        const response = await axios.get(
            `${api_url}start=${start}&end=${end}&latitude=${lat}&longitude=${long}&community=ag&parameters=T2M%2CPRECTOTCORR%2CRH2M&header=true&time-standard=utc&model=ensemble&scenario=ssp126`
        );

        console.log(response.data.properties); //TESTES PARA VER NO TERMINAL
        return response.data;
    } catch (error) {
        console.error("Erro na requisição dos dados: ", error.message || error);
        throw error;
    }
};

module.exports = {
    fetchTemp
};