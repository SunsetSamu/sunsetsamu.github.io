document.getElementById('update-button').addEventListener('click', updateRates);
document.getElementById('calculator-form').addEventListener('submit', calculate);

let tasas = {};

function updateRates() {
    fetch("https://ve.dolarapi.com/v1/dolares/oficial")
        .then(response => response.json())
        .then(data => {
            const ratesContainer = document.getElementById('rates');
            ratesContainer.innerHTML = '';

            tasas = {
                'Dólar Oficial (BCV)': data.promedio,
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
}

function calculate(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const conversionType = document.getElementById('conversion-type').value;
    let result = 0;

    // Utiliza la tasa del "Dólar Paralelo" para la conversión
    const rate = tasas['Dólar Oficial (BCV)'];

    if (conversionType === 'ves-to-usd') {
        // Convierte de VES a USD
        result = amount / rate;
    } else if (conversionType === 'usd-to-ves') {
        // Convierte de USD a VES
        result = amount * rate;
    }

    // Muestra el resultado
    document.getElementById('result').textContent = `Resultado: ${result.toFixed(2)} ${conversionType === 'ves-to-usd' ? 'USD' : 'VES'}`;
}

// Llamada inicial para cargar las tasas cuando se carga la página
updateRates();
