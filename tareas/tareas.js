

const fs = require('fs');
const colors = require('colors');

let listado_tareas = [];

// Guardar en la 'DB' (archivo JSON) una tarea

const guardarDB = () => {

    let data = JSON.stringify(listado_tareas);
    fs.writeFile('db/data.json', data, (err) => {

        if (err) throw err;
        
        console.log('El archivo ha sido guardado!');
    });

}

// Agregar a la variable listado_tareas el archivo con la "DB" (el JSON)
const cargarDB = () => {

    //Esto se hace por si el JSON está vacío (que no me de error)  

    try {
        listado_tareas = require('../db/data.json');
    } catch (error) {
        listado_tareas = [];
    }

}


// Crea una nueva tarea
const crear = (descripcion) => {

    cargarDB();

    //Crea la tarea
    let por_hacer = {
        descripcion,
        completado: false
    };

    //Agregarlo al arreglo de tareas
    listado_tareas.push(por_hacer);

    guardarDB(); //Actualiza el JSON

    return por_hacer;
}

// Retornar el listado
const getListado = () => {
    cargarDB();
    return listado_tareas;
}


//Actualizar el estado de una tarea

const actualizar = (descripcion, completado = true) => {
    
    cargarDB();


    // El método findIndex tiene como parametro un callback, el cual
    // me devuelve la posicion de la "tarea" si la tarea.descripcion
    // coincide con la descripcion que yo le pasé 
    let index = listado_tareas.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    })

    //Si no está esa descripción, devuelve -1, etnonces:
    if (index >= 0) {
        listado_tareas[index].completado = completado;           
        guardarDB();
        return true;
    }
    else {
        return false;
    }

}


const borrar = (descripcion) => {

    cargarDB();

    // Creo un nuevo array con el método filter, el cual
    // Devolverá un array que NO contenga a la tarea con 
    // la descripcion que pasamos arriba como parámetro
    let nuevoListado = listado_tareas.filter( tarea => {
        return tarea.descripcion !== descripcion;
    })

    // Si el listado viejo (listado_tareas) y el nuevoListado
    //Tienen el mismo tamaño, no se borró nada
    if (listado_tareas.length === nuevoListado.length) {
        return false;
    }
    //Sino, si se borró, y debo decir que ahora el listado_tareas
    // ES EL NUEVO LISTADO. 
    else {
        listado_tareas = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear, getListado, actualizar, borrar
}