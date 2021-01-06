// Constructor 1 --> Cotización 
// Constructor 2 --> Interfaz

// CONTRUCTORS
function Insurance(brand, year, insuranceType) {
    this.brand = brand;
    this.year = year;
    this.insuranceType = insuranceType;
};

// Here a function is used insted of an arrow funcion because of this.
Insurance.prototype.calculateInsurance = function() {
    let amount;
    const base = 2000;

    // 1. based on the brand
    switch (this.brand) {
        case '1':
            amount = base * 1.15;
            break;
        case '2':
            amount = base * 1.05;
            break;
        case '3':
            amount = base * 1.35;
            break;
        default:
            break;
    };

    // 2. based on the year, for each year rest  3%,
    const yearDifference = new Date().getFullYear() - this.year;
    amount -= ((yearDifference * 3) * amount) / 100;

    // 3. based on the type of insurance
    // basic insurace +30%
    // basic insurace +50%

    console.log(this.insuranceType);
    if (this.insuranceType === 'basico') {
        amount *= 1.30;
    } else {
        amount *= 1.50;
    }

    // console.log(amount);
    return amount
};


function UI() {};

// Fill year options in year select
// It is used an arrow function because  this method willnot refer to any property of the UI constructor
UI.prototype.fillOptions = () => {
    const max = new Date().getFullYear(), // 2020
        min = max - 21; // 2000
    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    };
};

// Show alerts on screen
UI.prototype.showMessage = (message, type) => {
    const form = document.querySelector('#cotizar-seguro');
    const div = document.createElement('div');

    if (type === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    };

    div.classList.add('mensaje', 'mt-10');
    div.textContent = message;
    form.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 3000);
};

UI.prototype.showResult = (insurance, total) => {
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Total: ${total}</p>
  `;

    const result = document.querySelector('#resultado');


    // Show spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 3000)

};

// UI Intanciation
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.fillOptions();
});

const getCarData = (e) => {
    e.preventDefault();
    // Read and Validate the form 
    const brand = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const insuranceType = document.querySelector('input[name="tipo"]:checked').value;
    // console.log(brand, year, insuranceType);

    if (brand === '' || year === '' || insuranceType === '') {
        ui.showMessage('Todos los campos son obligatorios', 'error');
        return;
    };
    ui.showMessage('Cotizando', 'exito');

    const results = document.querySelector('#resultado div');
    if (results !== null) {
        results.remove()
    }
    console.log('Cotizando....');

    // Calculate the Insurance
    const insurance = new Insurance(brand, year, insuranceType);

    // console.log(insurance);
    const totalCalculation = insurance.calculateInsurance();

    ui.showResult(insurance, totalCalculation)
};

eventListeners();

function eventListeners() {
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', getCarData);
};