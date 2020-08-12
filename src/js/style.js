/*Inicializar las constantes correspondientes a los elementos del dom con que se va a gestionar las principales funcionalidades */

//button para enviar y actualizar las tareas
const button = document.getElementById('button'); 
//div que representa el color verde
const container_green = document.getElementById('green');
//div que representa el color yellow
const container_yellow = document.getElementById('yellow');
//div que representa el color red
const container_red = document.getElementById('red');

//funcion que se encarga de remover y agregar un estilo CSS que muestra en pantalla el color seleccionado para una tarea
const Color_Selected = (div) => {
    const element = document.querySelectorAll('.container-color');
    //console.log(element);
    for (const item of element) {
        item.classList.remove('color_selected');
        //console.log(item);
    }
    div.classList.add('color_selected');
}

//Funcion que se encarga de reset el formulario y de llevar los cuadros de colores a un estado inicial
const Reset_Form = () => {
    //Limpiar los elementos del formulario
    document.getElementById('form1').reset();
    //Seleccionar todos los cuadros de color
    const element = document.querySelectorAll('.container-color');
    //Bucle for para remover la clase que muestra en la interfaaz como seleccionado
    for (const item of element) {
        item.classList.remove('color_selected');
    }
}

//Evento a la escucha del click, para poner el radio a true y seleccionar el div verde a traves de un estilo CSS
container_green.addEventListener('click', () => {
    document.getElementById('radio_green').checked = true;
    Color_Selected(document.getElementById('green'));
   // console.log(document.getElementById('radio_green').value);
})
//Evento a la escucha del click, para poner el radio a true y seleccionar el div yellow a traves de un estilo CSS
container_yellow.addEventListener('click', () => {
    document.getElementById('radio_yellow').checked = true;
    Color_Selected(document.getElementById('yellow'));
   // console.log(document.getElementById('radio_yellow').value);
})
//Evento a la escucha del click, para poner el radio a true y seleccionar el div rojo a traves de un estilo CSS
container_red.addEventListener('click', () => {
    document.getElementById('radio_red').checked = true;
    Color_Selected(document.getElementById('red'));
   // console.log(document.getElementById('radio_red').value);
})

const Agregar_Tasks = (object) => {
   //Creando los elementos HTML correspondientes al objeto tarea para su posteior visualizacion en la interfaz
    let span_task = document.createElement('SPAN');
    let span_date = document.createElement('SPAN');
    let img_update = document.createElement('IMG');
    let img_delete = document.createElement('IMG');
    let div_html = document.createElement('DIV');
    let super_div = document.getElementById('super-container');
    //Asignando los valores correspondientes a las variables
    span_task.textContent = object.task;
    span_date.textContent = object.date;
    img_update.src = './images/Update.png';
    img_update.alt = 'Update';
    img_delete.src = './images/Delete.png';
    img_delete.alt = 'Delete';
    div_html.classList.add(object.priority);
    div_html.classList.add('list_task');
    //Conformando el componente de visualizacion a traves de una etiqueta DIV
    div_html.appendChild(span_task);
    div_html.appendChild(span_date);
    div_html.appendChild(img_update);
    div_html.appendChild(img_delete);
    super_div.appendChild(div_html);
}


//Evento a la escucha del click, para insertar las tareas en la API LocalStorage y en la vista de la web en un div container.
button.addEventListener('click', (e) => {
    e.preventDefault();
    //Asignar a variables javascript, los datos introducidos en el formulario
    const task = document.getElementById('task').value;
    const date = document.getElementById('calendar').value;
    const radios = document.querySelectorAll('.radio');
    let color = null;
    //Bucle for para determinar cual es el input radio que esta seleccionado, tomar el valor
    for (let index = 0; index < radios.length; index++) { 
        if(radios[index].checked) 
           color = radios[index].value;
    }
    //Crear un objeto
    const object_task = {
        task: task,
        date: date,
        priority:color
    };
    //Guardar la informacion haciendo uso de Web Storage, especificamente de LocalStorage
    try{
        localStorage.setItem(task, JSON.stringify(object_task));
        //Llamar a la funcion agregar tareas
        Agregar_Tasks(object_task);
        //Llamar a la funcion que limpia el formulario.
        Reset_Form();
    }
    catch(error){
      console.error(error);
    }   
})

