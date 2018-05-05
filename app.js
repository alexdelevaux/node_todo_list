const argv = require('./config/yargs').argv;

const colors = require('colors');

const por_hacer = require('./tareas/tareas');

console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = por_hacer.crear(argv.descripcion);
        console.log(tarea);
        
        break;
    case 'listar':

        let listado = por_hacer.getListado();

        for (const tarea of listado) {
            console.log('=====Por Hacer====='.green);
            console.log(tarea.descripcion);
            console.log(`Estado: ${tarea.completado}`);
            console.log('=============='.green);
        }

        console.log('Listar todas las tareas');
        break;
    case 'actualizar':
        let actualizado = por_hacer.actualizar(argv.descripcion, argv.completado);
        break;
    case 'borrar':
        let borrado = por_hacer.borrar(argv.descripcion);
        break;

    default:
        console.log('Comando no reconocido');        
        break;
}