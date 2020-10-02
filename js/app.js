// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Container for results
const result = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

const arrMarca = ['Audi','BMW','Mercedes Benz','Chevrolet','Ford','Dodge'];
const precioMin = 20000;
const precioMax = 90000;

// Generate an object with search
const dataSearch = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// Events
document.addEventListener('DOMContentLoaded', () => {
    showCars(autos);  
    fillSelectYear();
    fillSelectMarca();
    fillSelectPrecio();
})

// EventListener for search select
marca.addEventListener('change', (e)=> {
    dataSearch.marca = e.target.value;
    filterCar();
});

year.addEventListener('change', (e)=> {
    dataSearch.year = parseInt(e.target.value);
    filterCar();
});

minimo.addEventListener('change', (e)=> {
    dataSearch.minimo = parseInt(e.target.value);
    filterCar();
});

maximo.addEventListener('change', (e)=> {
    dataSearch.maximo = parseInt(e.target.value);
    filterCar();
});

puertas.addEventListener('change', (e)=> {
    dataSearch.puertas = parseInt(e.target.value);
    filterCar();
});

transmision.addEventListener('change', (e)=> {
    dataSearch.transmision = e.target.value;
    filterCar();
});

color.addEventListener('change', (e)=> {
    dataSearch.color = e.target.value;
    console.log(dataSearch);
    filterCar();
});



// Functions
function showCars(cars) {

    cleanHTML();

    cars.forEach( car => {
        const { marca, modelo, year, precio, puertas, color, transmision } = car;
        const carHTML = document.createElement('P');

        carHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        // Insert HTML
        result.appendChild(carHTML);
    })
}

function cleanHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

// Generate the years of select
function fillSelectYear() {
    for(let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function fillSelectMarca() {
    arrMarca.forEach( car => {
        const option = document.createElement('option');
        option.value = car;
        option.textContent = car;
        marca.appendChild(option);
    })
}

function fillSelectPrecio() {
    for(let i = precioMin; i <= precioMax; i++){
        
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = i;
        option1.textContent = i;

        option2.value = i;
        option2.textContent = i;

        minimo.appendChild(option1);
        maximo.appendChild(option2);

        i += 9999;
    }
}

// Function that filters based on search 
function filterCar(){
    const result = autos.filter(filterBrand).filter(filterYear).filter(filterMin).filter(filterMax).filter(filterDoors).filter(filterTransmission).filter(filterColor);
    // console.log(result); Debugger
    
    if(result.length){
        showCars(result);
    } else {
        noResult();
    }
}

function noResult() {

    cleanHTML();

    const noResult = document.createElement('div');
    noResult.classList.add('alerta', 'error');
    noResult.textContent = 'No hay resultados, Intenta con otros términos de búsqueda';

    result.appendChild(noResult);
}

function filterBrand(car) {
    const { marca } = dataSearch;
    if(marca){
        return car.marca === marca;
    }
    return car;
}

function filterYear(car){
    const { year } = dataSearch;
    // console.log(typeof year); Debugger
    // console.log(typeof car.year); Debugger
    if(year){
        return car.year === year;
    }
    return car;
}

function filterMin(car) {
    const { minimo } = dataSearch;
    // console.log(typeof minimo); Debugger
    // console.log(typeof car.precio); Debugger
    if(minimo){
        return car.precio >= minimo;
    }
    return car;
}

function filterMax(car) {
    const { maximo } = dataSearch;
    if(maximo){
        return car.precio <= maximo;
    }
    return car;
}

function filterDoors(car) {
    const { puertas } = dataSearch;
    if(puertas){
        return car.puertas === puertas;
    }
    return car;
}

function filterTransmission(car){
    const { transmision } = dataSearch;
    if(transmision){
        return car.transmision === transmision;
    }
    return car;
}

function filterColor(car){
    const { color } = dataSearch;
    if(color){
        return car.color === color;
    }
    return car;
}