const descripcion = {
        alias: 'd',
        demand: true,
        desc: 'Descripción de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
                .command('crear','Crea una nueva tarea', {
                    descripcion
                })
                .command('actualizar', 'Actualiza el estado completado de una tarea' , {
                    descripcion,
                    completado
                })
                .command('borrar', 'Borrar una tarea según su descripción', {
                    descripcion
                })
                .help()
                .argv;


module.exports = {
    argv
}