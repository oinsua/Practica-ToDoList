const form1 = document.getElementById('form1');
const button = document.getElementById('button');
const botton = document.getElementById('botton');
//Inicializo el objeto de validaccion del formulario
const formIsValid = {
    task: false,
    date: false,
    priority: false
}

form1.addEventListener('submit', (e) => {
    e.preventDefault();
})
//Evitando que se muestren fechas anteriores en el input date
form1.date.setAttribute('min', new Date().toLocaleDateString('fr-CA'));