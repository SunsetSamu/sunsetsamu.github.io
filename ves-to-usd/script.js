document.getElementById('update-button').addEventListener('click', updateRates);
document.getElementById('calculator-form').addEventListener('submit', calculate);

const OFICIAL='https://ve.dolarapi.com/v1/dolares/oficial';
const PARALELO='https://ve.dolarapi.com/v1/dolares/paralelo';




// Script para desactivar el scroll horizontal 
$(function() {
    var $body = $(document);
    $body.bind('scroll', function() {
      // "Disable" the horizontal scroll.
      if ($body.scrollLeft() !== 0) {
        $body.scrollLeft(0);
      }
    });
  });
  

var tasaOficial = 0;
var tasaParalelo = 0;

function updateRates(event) {
    console.log('updateRates() called');
    fetch(OFICIAL)
    .then(response => response.json())
    .then(data => {
        console.log('data of OFICIAL API:', data);
        console.log('tasa of', data.promedio);

        tasaOficial = Number(data.promedio);
        console.log('tasa of', tasaOficial);
    });

    fetch(PARALELO)
    .then(response => response.json())
    .then(data => {
        console.log('data of PARALELO API:', data);
        console.log('tasa pa', data.promedio);

        tasaParalelo = Number(data.promedio);
        console.log('tasa pa', tasaParalelo);
    });

    
    document.getElementById('rates').innerHTML = `
        <p>
            Cargando...
        </p>
    `;
    setTimeout(() => {
        document.getElementById('rates').innerHTML = `
            <p>
                D&oacute;lar BCV: ${tasaOficial}
            </p>
            <p>
                D&oacute;lar Paralelo: ${tasaParalelo}
            </p>
        `;
    }, 2000);
}
function calculate(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const conversionType = document.getElementById('conversion-type').value;
    const rate_of = tasaOficial;
    const rate_pa = tasaParalelo;

    let result_of = 0, result_pa = 0;

    if (conversionType === 'ves-to-usd') {
        result_of = amount / rate_of;
        result_pa = amount / rate_pa;
    } else {
        result_of = amount * rate_of;
        result_pa = amount * rate_pa;
    }

    document.getElementById('result').innerHTML = `Resultado al Oficial: ${result_of.toFixed(2)} ${conversionType === 'ves-to-usd' ? 'USD' : 'VES'}<br>Resultado al Paralelo: ${result_pa.toFixed(2)} ${conversionType === 'ves-to-usd' ? 'USD' : 'VES'}`;
}


// Llamada inicial para cargar las tasas cuando se carga la página
updateRates();
