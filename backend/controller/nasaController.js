const {fetchTemp, fetchHum, fetchPrec} = require('../services/nasa_api');


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month (0-indexed)
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

// =============================================================== //
// ============== FUNÇÕES TEMPERATURA ============== //
exports.getTempData = async (req, res) => {
    const {lat, long} = req.body;
    const start = DateTime.Now;
    const end = DateTime.Now+7;

    try {
        const data = await fetchTemp(start, end, lat, long);
        
        res.json(data.properties.parameter.T2M);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }

}

exports.getWkTempData = async (req, res) => {
    const { lat, long } = req.body;
    
    const today = new Date();
    const start = formatDate(today);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const end = formatDate(nextWeek);
    
    /*
       ================= TESTES DE VARIÁVEIS ==================
    
       console.log(req.body);
       console.log(lat, long);
       console.log(start);
       console.log(end);

       ================= TESTES DE VARIÁVEIS ==================
    */
    try {
        const data = await fetchTemp(start, end, lat, long);

        const temperatures = data?.properties?.parameter?.T2M || [];
        if (temperatures.length === 0) {
            return res.status(404).json({ error: 'No temperature data available' });
        }

        const tempValues = Object.values(temperatures);
        const maxima = Math.max(...tempValues);
        const minima = Math.min(...tempValues);

        console.log('TEMPERATURA =>   Max: ',maxima," | Min: ",minima);
        res.json({
            maxima: maxima.toFixed(2),
            minima: minima.toFixed(2)

        });
    } catch (error) {
        console.error("Error fetching temperature data:", error.message || error);
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};

// =============================================================== //
// ============== FUNÇÕES HUMIDADE ============== //

exports.getHumData = async (req, res) => {
    const {lat, long} = req.body;
    const start = DateTime.Now;
    const end = DateTime.Now+7;

    try {
        const data = await fetchHum(start, end, lat, long);
        
        res.json(data.properties.parameter.RH2M);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }

}


exports.getWkHumData = async (req, res) => {
    const { lat, long } = req.body;
    const today = new Date();
    const start = formatDate(today);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const end = formatDate(nextWeek);
    
    /*
       ================= TESTES DE VARIÁVEIS ==================
    
       console.log(req.body);
       console.log(lat, long);
       console.log(start);
       console.log(end);

       ================= TESTES DE VARIÁVEIS ==================
    */

    console.log(req.body);
    console.log(lat, long);


    try {
        // Call the NASA API and wait for the response
        const data = await fetchHum(start, end, lat, long);
        
        // Extract the temperature data (T2M) from the response
        const humidade = data.properties.parameter.RH2M;

        // Get all the temperature values
        const Values = Object.values(humidade);

        // Calculate the highest and lowest temperature
        const maxima = Math.max(...Values);
        const minima = Math.min(...Values);

        console.log('HUMIDADE =>   Max: ',maxima," | Min: ",minima);

        // Send the highest and lowest temperatures as a response
        res.json({
            maxima: maxima.toFixed(2),
            minima: minima.toFixed(2)
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};

// =============================================================== //
// ============== FUNÇÕES PRECIPITAÇÃO ============== //

exports.getPrecData = async (req, res) => {
    const {lat, long} = req.body;
    const start = DateTime.Now;
    const end = DateTime.Now+7;

    try {
        const data = await fetchPrec(start, end, lat, long);
        
        res.json(data.properties.parameter.PRECTOTCORR);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }

}


exports.getWkPrecData = async (req, res) => {
    const { lat, long } = req.body;
    
    const today = new Date();
    const start = formatDate(today);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const end = formatDate(nextWeek);

    try {
        // Call the NASA API and wait for the response
        const data = await fetchPrec(start, end, lat, long);
        
        // Extract the temperature data (T2M) from the response
        const precipitacao = data.properties.parameter.PRECTOTCORR;

        // Get all the values
        const Values = Object.values(precipitacao);

        // Calculate the highest and lowest
        const maxima = Math.max(...Values);
        const minima = Math.min(...Values);

        // Send the highest and lowest as a response
        res.json({
            maxima: maxima.toFixed(2),
            minima: minima.toFixed(2)
        });
    } catch (error) {
        // Handle any errors and send a 500 response to the client
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
};


exports.getAvgPrecData = async (req, res) => {
    const { lat, long } = req.body;
    
    const today = new Date();
    const start = formatDate(today);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const end = formatDate(nextWeek);

    try {
        // Call the NASA API and wait for the response
        const data = await fetchPrec(start, end, lat, long);
        
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
// ============== FUNÇÕES TUDÃO ============== //

exports.getWkData = async (req, res) => {

};



