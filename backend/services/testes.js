const {fetchTemp, fetchHum, fetchPrec} = require('./nasa_api')

/*
 DADOS TESTES PARA COORDENADAS E TEMPO
 --------------------------------------
 ---------------------------------------
 */


// =============================================================== //
// ============== TESTES TEMPERATURA ============== //

 exports.getTempData = async (req, res) => {
     const start = "20241001";
     const end = "20241101";
     const latitude = -23.103170;
     const longitude = -45.735627;
 
     try {
         // Call the NASA API and wait for the response
         const data = await fetchTemp(start, end, latitude, longitude);
         
         // Send the data as a JSON response to the client
         res.json(data.properties.parameter.T2M);
     } catch (error) {
         // Handle any errors and send a 500 response to the client
         res.status(500).json({ error: 'Failed to fetch data from NASA API' });
     }
 };

 exports.getWkTempData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchTemp(start, end, latitude, longitude);
        
        // Extract the temperature data (T2M) from the response
        const temperatures = data.properties.parameter.T2M;

        // Get all the temperature values
        const tempValues = Object.values(temperatures);

        // Calculate the highest and lowest temperature
        const maxima = Math.max(...tempValues);
        const minima = Math.min(...tempValues);

        // Send the highest and lowest temperatures as a response
        res.json({
            maxima: maxima,
            minima: minima
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }

 };


 exports.getAvgTempData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchTemp(start, end, latitude, longitude);
        
        // Extract the temperature data (T2M) from the response
        const temperatures = data.properties.parameter.T2M;

        // Get all the temperature values
        const tempValues = Object.values(temperatures);

        // Calculate the sum of all temperature values
        const sumTemp = tempValues.reduce((sum, temp) => sum + temp, 0);

        // Calculate the average temperature
        const avgTemp = sumTemp / tempValues.length;

        // Send the average temperature as a response
        res.json({
            media: avgTemp.toFixed(2) // Rounded to 2 decimal places
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};
// =============================================================== //
// ============== TESTES HUMIDADE ============== //

 exports.getHumData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchHum(start, end, latitude, longitude);
        
        // Send the data as a JSON response to the client
        res.json(data.properties.parameter.RH2M);
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};

exports.getWkHumData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchHum(start, end, latitude, longitude);
        
        const humidade = data.properties.parameter.RH2M;

        const valorHum = Object.values(humidade);

        const maxima = Math.max(...valorHum);
        const minima = Math.min(...valorHum);

        res.json({
            maxima: maxima,
            minima: minima
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }

 };


 exports.getAvgHumData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchHum(start, end, latitude, longitude);
        
        // Extract the temperature data (T2M) from the response
        const humidade = data.properties.parameter.RH2M;

        // Get all the temperature values
        const humValues = Object.values(humidade);

        // Calculate the sum of all temperature values
        const sumHum = humValues.reduce((sum, temp) => sum + temp, 0);

        // Calculate the average temperature
        const avgHum = sumHum / humValues.length;

        // Send the average temperature as a response
        res.json({
            media: avgHum.toFixed(2) // Rounded to 2 decimal places
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};


// =============================================================== //
// ============== TESTES PRECIPITAÇÃO ============== //

exports.getPrecData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchPrec(start, end, latitude, longitude);
        
        // Send the data as a JSON response to the client
        res.json(data.properties.parameter.PRECTOTCORR);
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};


exports.getWkPrecData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchPrec(start, end, latitude, longitude);
        
        const precipitacao = data.properties.parameter.PRECTOTCORR;

        const valorPrec = Object.values(precipitacao);

        const maiorPrec = Math.max(...valorPrec);
        const menorPrec = Math.min(...valorPrec);

        res.json({
            maxima: maiorPrec,
            minima: menorPrec
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }

 };


 exports.getAvgPrecData = async (req, res) => {
    const start = "20241001";
    const end = "20241101";
    const latitude = -23.103170;
    const longitude = -45.735627;

    try {
        // Call the NASA API and wait for the response
        const data = await fetchPrec(start, end, latitude, longitude);
        
        // Extract the temperature data (T2M) from the response
        const precipitacao = data.properties.parameter.PRECTOTCORR;

        // Get all the temperature values
        const valorPrec = Object.values(precipitacao);

        // Calculate the sum of all temperature values
        const sumPrec = valorPrec.reduce((sum, temp) => sum + temp, 0);

        // Calculate the average temperature
        const avgPrec = sumPrec / valorPrec.length;

        // Send the average temperature as a response
        res.json({
            media: avgPrec.toFixed(2) // Rounded to 2 decimal places
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};


// =============================================================== //
