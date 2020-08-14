/*Inicializar las constantes correspondientes a los elementos del dom con que se va a gestionar las principales funcionalidades */
const form1 = document.getElementById('form1');
//button para enviar y actualizar las tareas
const button = document.getElementById('button'); 
//div que representa el color verde
const container_green = document.getElementById('green');
//div que representa el color yellow
const container_yellow = document.getElementById('yellow');
//div que representa el color red
const container_red = document.getElementById('red');
//div que contiene todas las tareas
const container_tasks = document.getElementById('tasks');

//Inicializo el objeto de validaccion del formulario
const formIsValid = {
    task: false,
    date: false,
    radio: false
}

//Funcion que se encarga de cargar los datos almacenados en el localStorage cada vez que se carga la web.
addEventListener('load', () => {
   //Bucle for para recorrer los item que se encuentran almacenados en localStorage
    for (let index = 0; index < localStorage.length; index++) {
        const clave = localStorage.key(index);
        const task = JSON.parse(localStorage.getItem(clave));
        //Llamar a la funcion que agrega las tareas a la Intefaz
        Agregar_Tasks(task);
    }
})

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
    //Asignar true al radio button
    document.getElementById('radio_green').checked = true;
    //Asignar true al objeto de validacion
    formIsValid.radio = true;
    Color_Selected(document.getElementById('green'));
   // console.log(document.getElementById('radio_green').value);
})
//Evento a la escucha del click, para poner el radio a true y seleccionar el div yellow a traves de un estilo CSS
container_yellow.addEventListener('click', () => {
    //Asignar true al radio button
    document.getElementById('radio_yellow').checked = true;
    //Asignar true al objeto de validacion
    formIsValid.radio = true;
    Color_Selected(document.getElementById('yellow'));
   // console.log(document.getElementById('radio_yellow').value);
})
//Evento a la escucha del click, para poner el radio a true y seleccionar el div rojo a traves de un estilo CSS
container_red.addEventListener('click', () => {
    //Asignar true al radio button
    document.getElementById('radio_red').checked = true;
    //Asignar true al objeto de validacion
    formIsValid.radio = true;
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
    let super_div = document.getElementById('tasks');
    //Creando un fragmet para contener todos los elementos
    let fragment = document.createDocumentFragment();
    //Asignando los valores correspondientes a las variables
    span_task.textContent = object.task;
    span_date.textContent = object.date;
    img_update.src = './images/Update.png';
    img_update.dataset.key = object.task;
    img_update.dataset.type = 'update';
    img_delete.src = './images/Delete.png';
    img_delete.dataset.key = object.task;
    img_delete.dataset.type = 'delete';
    div_html.id = object.task;
    div_html.classList.add(object.priority);
    div_html.classList.add('list_task');
    //Conformando el componente de visualizacion a traves de una etiqueta DIV
    fragment.appendChild(span_task);
    fragment.appendChild(span_date);
    fragment.appendChild(img_update);
    fragment.appendChild(img_delete);
    div_html.appendChild(fragment);
    super_div.appendChild(div_html);
}

//Evento a la escucha de change, para validar el input a traves del cual se introducen las tareas
document.getElementById('task').addEventListener('change', (e) => {
    if(e.target.value.trim().length > 0)
      formIsValid.task = true;
})
//Evento a la escucha de change, para validar el input a traves del cual se introducen la fecha.
document.getElementById('calendar').addEventListener('change', (e) => {
    if(e.target.value.trim().length > 0)
      formIsValid.date = true;
})

//Funcion que verifica si todos los campos del formulario estan en true.
const validateToAdd = () => {
    const formValues = Object.values(formIsValid);
    const valid = formValues.findIndex(value => value == false);
    if(valid == -1)
    return true;
    return false;
}

//Funcion que valida la actualizacion de tareas
const validateToUpdate = (color) => {
    if(document.getElementById('task').value.trim().length > 0)
      formIsValid.task = true;
    if(document.getElementById('calendar').value.trim().length > 0)
      formIsValid.date = true;
    if(document.getElementById('radio_'+color).checked == true)
      formIsValid.radio = true;
}

//Funcion que se encarga de reset el objeto validate
const Reset_IsValid = () => {
    formIsValid.task = false;
    formIsValid.date = false;
    formIsValid.radio = false;
}


//Funcion que se encarga de asignar una tarea al localStorage, agregar una tarea la interfaz de usuario, resetear el formulario, el objeto de validacion y de error. 
const add_Task = (object_task,task) => {
    //Guardar la informacion haciendo uso de Web Storage, especificamente de LocalStorage
    localStorage.setItem(task, JSON.stringify(object_task));
    //Llamar a la funcion agregar tareas
    Agregar_Tasks(object_task);
    //Llamar a la funcion que limpia el formulario.
    Reset_Form();
    //Llamar la funcion que reset el objeto validate
    Reset_IsValid()
    //En caso de que mensaje de error este acivo
    document.getElementById('error').textContent = '';
}
//Funcion que se encarga de consultar el localStorage con la key, retorna la tarea como un objeto, luego los asigna al formulario, y despues se actualiza el action y el textconten del boton principal
const get_Tasks = (key) => {
    //Asignar la tarea pasando como parametro la key 
    const object_task = JSON.parse(localStorage.getItem(key));
    //Asignar a los elementos correspondientes del formulario los valores obtenidos del localSotarage
     document.getElementById('task').value = object_task.task;
     document.getElementById('calendar').value = object_task.date;
     document.getElementById('radio_'+object_task.priority).checked = true;
     //Llamar a la funcion para seleccionar el color de la prioridad
     Color_Selected(document.getElementById(object_task.priority));

     //Asignar update al action del boton y cambiar el context de 'Add' por 'Update'
     document.getElementById('button').dataset.action = 'update';
     document.getElementById('button').textContent = 'Update Task';
     //Eliminar la tarea de la UI y el localStorage
     delete_Task(key);
}
//Funcion que se encarga de eliminar una tarea del localStorage y de la interfaz del usuario.
const delete_Task = (key) => {
    localStorage.removeItem(key);
    document.getElementById(key).remove();
}
//Evento que s encarga de determinar donde se ha producido el click sobre la lista de tareas
container_tasks.addEventListener('click', (e) => {
    if(e.target.dataset.type == 'update')
      get_Tasks(e.target.dataset.key);
    else if(e.target.dataset.type == 'delete')
      delete_Task(e.target.dataset.key);
})

//Evento a la escucha del submit, para insertar las tareas en la API LocalStorage y en la vista de la web en un div container.
form1.addEventListener('submit', (e) => {
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
    try{
        //Comprobar que el navegador soporta Web Storage
        if(typeof(Storage) !== 'undefined')
        {
         if(e.target.button.dataset.action == 'add')    
             {
               //Llamar la funcion que valida si el formulario se completo correctamente
               if(validateToAdd())
                {
                //Llamar a la funcion que encarga de agregar una tarea
                add_Task(object_task,task);
                }
               else 
                document.getElementById('error').textContent = 'Formulario Invalido';
             }
         else if(e.target.button.dataset.action == 'update')
            { 
                //Funcion que valida el update debido a que no se produce el evento onchange cuando se asignan los datos a traves de javascript
                validateToUpdate(object_task.priority); 
               //Llamar a la funcion que encarga de agregar una tarea
               add_Task(object_task,task);
               //Asignar update al action del boton y cambiar el context de 'Add' por 'Update'
                document.getElementById('button').dataset.action = 'add';
                document.getElementById('button').textContent = 'Add Task';
            } 
      } else 
      document.getElementById('error').textContent = 'El navegador no soporta Web Storage';
    }
    catch(error){
      console.error(error);
    }   
})


