document.getElementById('update-button').addEventListener('click', updateRates);
document.getElementById('calculator-form').addEventListener('submit', calculate);

let tasas = {};

function updateRates() {
    Promise.all([
        fetch("https://ve.dolarapi.com/v1/dolares/oficial").then(response => response.json()),
        fetch("https://ve.dolarapi.com/v1/dolares/paralelo").then(response => response.json())
    ])
    .then(([ofic, para]) => {
        const ratesContainer = document.getElementById('rates');
        ratesContainer.innerHTML = '';

        tasas = {
            'Dólar Oficial (BCV)': ofic.promedio,
            'Dólar Paralelo': para.promedio,
        };

        for (const [nombre, tasa] of Object.entries(tasas)) {
            const rateElement = document.createElement('div');
            rateElement.textContent = `${nombre}: ${tasa.toFixed(2)} VES`;
            ratesContainer.appendChild(rateElement);
        }
    })
    .catch(error => {
        console.error('Error al obtener las tasas:', error);
        document.getElementById('rates').textContent = 'Error al cargar las tasas. Intenta de nuevo más tarde.';
    });
};


function calculate(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const conversionType = document.getElementById('conversion-type').value;
    let result_of = 0;
    let result_pa = 0;

    // Utiliza la tasa del "Dólar oficial" para la conversión
    const rate_of = tasas['Dólar Oficial (BCV)'];

    if (conversionType === 'ves-to-usd') {
        // Convierte de VES a USD
        result_of = amount / rate_of;
    } else if (conversionType === 'usd-to-ves') {
        // Convierte de USD a VES
        result_of = amount * rate_of;
    }

    // Utiliza la tasa del "Dólar paralelo" para la conversión
    const rate_pa = tasas['Dólar Paralelo'];

    if (conversionType === 'ves-to-usd') {
        // Convierte de VES a USD
        result_pa = amount / rate_pa;
    } else if (conversionType === 'usd-to-ves') {
        // Convierte de USD a VES
        result_pa = amount * rate_pa;
    }

    // Muestra el resultado
    document.getElementById('result').innerHTML = `Resultado al Oficial: ${result_of.toFixed(2)} ${conversionType === 'ves-to-usd' ? 'USD' : 'VES'}<br>Resultado al Paralelo: ${result_pa.toFixed(2)} ${conversionType === 'ves-to-usd' ? 'USD' : 'VES'}`;

}

// Llamada inicial para cargar las tasas cuando se carga la página
updateRates();
