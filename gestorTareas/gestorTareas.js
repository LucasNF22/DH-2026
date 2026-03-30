const prompt = require("prompt-sync")({ sigint: true });

// Array para almacenar tareas
let tareas = [
  {
    indice: 0,
    nombre: 'comprar comida',
    fechaLimite: null,
    completada: true,
    categoria: 1
  },
  {
    indice: 0,
    nombre: 'comprar regalos',
    fechaLimite: null,
    completada: false,
    categoria: 1
  },
  {
    indice: 1,
    nombre: 'ver pelicula',
    fechaLimite: null,
    completada: false,
    categoria: 2
  },
  {
    indice: 2,
    nombre: 'pagar proveedores',
    fechaLimite: "10/03/2026",
    completada: false,
    categoria: 0
  }
];

let categoriasNombres = [
    "Trabajo", 
    "Personal",
    "Varios",
  ];

// Funcion que muestras todas las categorias disponibles

function mostrarCategorias(){
  console.log("Categorias disponibles: ");
  categoriasNombres.forEach((categoria, indice) => {
    console.log(indice + ". " + categoria);
  });
}

// Funciont para agregar categorias 
function agregarCategoriaPorUsuario(nombreCategoria){
  categoriasNombres.push(nombreCategoria);
  console.log("Categoria " + nombreCategoria + " agregada correctamente");
}

// Funcion para agregar tareas al array

function agregarTareas(nombreIN, fechaLimiteIN = null) {

  mostrarCategorias();

  let numeroCategoria = parseInt(prompt("Ingrese el numero de la categoria a la que desea asignar la tarea: "));

  if(numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length){
    tareas.push({
      
      indice: tareas.length, // asigna el indice basado en la longitud actual del array
      nombre: nombreIN,
      fechaLimite: fechaLimiteIN,
      completada: false,
      categoria : numeroCategoria
      
    })

    console.log("Tarea agregada correctamente");

  
  } else {
    console.log("Numero de categoria invalido");
  }
}

// Funcion para eliminar una tarea

function eliminarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1); // elimina una posicion desde el indice dado
    console.log("Tarea eliminada");
  } else {
    console.log("Indice de tarea inexistente.");
  }
}

// funcion marcar tarea como completada.

function completarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].completada = true;
    console.log("Tarea completada");
  } else {
    console.log("Indice de tarea inexistente.");
  }
}

// Funcion para modificar tarea especifica

function modificarTarea(indice, nuevoNombre, nuevaFecha = null, nuevoNumeroCategoria) {
  
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].nombre = nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre;
    tareas[indice].fechaLimite = nuevaFecha !== null ? nuevaFecha : tareas[indice].fechaLimite;
    tareas[indice].categoria = nuevoNumeroCategoria !== undefined ? nuevoNumeroCategoria : tareas[indice].categoria;
    console.log("Tarea modificada correctamente");

    
  } else {
    console.log("Indice de tarea inexistente.");
  }
}


// Funcion para filtrar tareas por categorias 

function filtrarTareasPorCategoria(numeroCategoria) {

  let tareasFiltradas = tareas.filter( tarea =>  tarea.categoria === numeroCategoria );

  return tareasFiltradas;
}

// Funcion que muestras tareas completadas

function tareasCompletdasPorcategoria(numeroCategoria) {

  let tereasCategoria = filtrarTareasPorCategoria(numeroCategoria);
  let tareasCompletadas = tereasCategoria.reduce((contador, tarea) => {
    return tarea.completada ? contador + 1 : contador;
  }, 0);

  let tereasEnTotal = tereasCategoria.length;

  console.log("Tareas completadas en la categoria " + categoriasNombres[numeroCategoria] + ": " + tareasCompletadas + " de " + tereasEnTotal);
}

// Funcion apra ver tareas pendientes

function tareasPendientes(){

  console.log("Tareas pendientes")

  let contador = 0;

  tareas.forEach( tarea => {
    if(!tarea.completada){
      contador++
      console.log( contador + "- Nombre: " + tarea.nombre + " | Categoria: " + categoriasNombres[tarea.categoria] + " | Fecha limite: " + (tarea.fechaLimite ? tarea.fechaLimite : "No tiene fecha limite") );
      
    } 
  })

}

// Funcion para mostrar el menu de opciones

function mostrarMenu() {

  console.log("              ");
  console.log("--- Menu ---");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar tarea");
  console.log("3. Marcar tarea como completada");
  console.log("4. Modificar una tarea");
  console.log("5. Mostrar todas la tareas");
  console.log("6. Ver todas las categorias");
  console.log("7. Agrega una nueva categoria"); 
  console.log("8. Filtrar tareas por categoria");
  console.log("9. Ver tareas completadas por categoria");
  console.log("10. Ver tareas pendientes");
  
  console.log("0. Salir");
  console.log("              ");
}

// Funcion para interactuar con el usuario
function interactuarConUsuario() {
  let opcion = 1;

  while (opcion != 0) {
    mostrarMenu();
    opcion = parseInt(prompt("Ingrese la opcion deseada: "));

    switch (opcion) {
      case 1:
        let nombreNuevaTarea = prompt("Ingrese el nombre de la nueva tarea: ");
        agregarTareas(nombreNuevaTarea);
        break;

      case 2:
        let indiceAEliminar = parseInt(
          prompt("Ingrese el indice de la tarea que desea eliminar: "),
        );
        eliminarTarea(indiceAEliminar);
        break;

      case 3:
        let tareaParaCompletar = parseInt(
          prompt("Ingrese el indice de la tarea que desea completar: "),
        );

        completarTarea(tareaParaCompletar);

        break;

      case 4:
        let indice = parseInt(
          prompt("Ingrese el indice de la tarea que desea modificar: "),
        );
        if(indice>=0 && indice < tareas.length){

          let opcion = parseInt(prompt("Que campo decea modificar? 1 .Nombre, 2. Fecha límite, 3. Número de categoría.  "));
          
          switch (opcion) {
            case 1:
              let nuevoNombre = prompt("Ingrese el nuevo nombre de la tarea: ");
              modificarTarea(indice, nuevoNombre);
              
              break;  

            case 2:
              let nuevaFecha = prompt("Ingrese la nueva fecha límite de la tarea: ");
              modificarTarea(indice, undefined, nuevaFecha);
              
              break;  
              
            case 3:
              mostrarCategorias
              let nuevoNumeroCategoria = parseInt(prompt("Ingrese el nuevo numero de categoria de la tarea: "));
              
              if(nuevoNumeroCategoria >= 0 && nuevoNumeroCategoria < categoriasNombres.length){
                modificarTarea(indice, undefined, undefined, nuevoNumeroCategoria);
              }
              
              break;
          }
          
         
        } else{
          console.log("Indice de tarea inexistente.");
        }

        break;

      case 5:
        console.log("--- Lista de tareas ---");
        console.log(tareas);

        break;

      case 6:
        mostrarCategorias();

        break;

      case 7:
        let nuevaCategoria = prompt("Ingrese la nueva categoria: ");
        agregarCategoriaPorUsuario(nuevaCategoria);

        break;

      case 8:
        mostrarCategorias();
        let numeroCategoria = parseInt(prompt("Ingrese el numero de categoria por la que desea filtrar: "));
        let tareasFiltradas = filtrarTareasPorCategoria(numeroCategoria);
       
        if(tareasFiltradas.length > 0){
          console.log(" Tareas en la categoria " + categoriasNombres[numeroCategoria] + ": ( " + tareasFiltradas.length + " )" );
          console.log(tareasFiltradas);
        } else {  
          console.log("No hay tareas para esa categoria");
        }
        break;

      case 9:
        mostrarCategorias();
        let numeroCategoriaCompletadas = parseInt(prompt("Ingrese el numero de categoria para ver las tareas completadas: "));
        
        if(numeroCategoriaCompletadas >= 0 && numeroCategoriaCompletadas < categoriasNombres.length){
          tareasCompletdasPorcategoria(numeroCategoriaCompletadas);
        } else {
          console.log("Numero de categoria invalido");
        }
        
        break;

      case 10:
        tareasPendientes();
        
        break;

      case 0:
        opcion = 0;
        console.log("usted ha salido");
        

        break;

      default:
        "Opción no válida";
        break;
    }
  }
}

interactuarConUsuario();
