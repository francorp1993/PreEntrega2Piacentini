const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const carroCuenta = document.querySelector('#carroCuenta');
const carroSeleccion = document.querySelector('#carroSeleccion');
const inputBusqueda = document.querySelector('#inputBusqueda');
const listaLanzamientos = document.querySelector('#listaLanzamientos');
const selectGenero = document.querySelector('#selectGenero');
const modalDiscos = document.querySelector('#modalDiscos');
const btnClose = document.querySelector('#btnClose');
const btnComprar = document.querySelector('#btnComprar');
const btnOrdenar = document.querySelector('#btnOrdenar');
const btnOrdenarA = document.querySelector('#btnOrdenarA');
const OpcionTodos = document.querySelector('#Todos');

let lanzamientos_lista = [];

const listaCarro = JSON.parse(localStorage.getItem('carro')) || [];
const carro = new Carro(listaCarro);

carroCuenta.innerText = carro.getCuenta();

btnModalCarrito.addEventListener('click', function() {
    const lista = carro.getLanzamientos();
    carroSeleccion.innerText = carro.getSuma();
    renderCarro(lista);
    modal.show();
});

btnComprar.addEventListener('click', () => {
    setTimeout(() => {
        Swal.fire({
            title: "Discos Arg",
            text: "Compra finalizada",
            icon: "success"
        });
    }, 3000);
    modal.hide();
    localStorage.removeItem('carro');
});

btnClose.addEventListener('click', () => {
    Swal.fire({
        title: 'Cancelar compra',
        text: '¿Estás seguro de que deseas cancelar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar compra',
        cancelButtonText: 'No, seguir comprando'
    }).then((result) => {
        if (result.isConfirmed) {
            modal.hide();
            localStorage.removeItem('carro');
            carroCuenta.innerText = '0';
            Swal.fire(
                'Compra cancelada',
                'Los datos del carrito han sido eliminados',
                'success'
            );
        }
    });
});


inputBusqueda.addEventListener('input', (evento) => {
    const busqueda = evento.target.value;
    const nombreLista = lanzamientos_lista.filter((disco) => disco.artista.toLowerCase().includes(busqueda.toLowerCase()) && disco.id_genero == selectGenero.value);
    renderLanzamientos(nombreLista);
});



selectGenero.addEventListener('change', (e) => {
    const id_genero = selectGenero.value;
    filtroGenero(id_genero);
});

btnOrdenar.addEventListener('click', () => {
    lanzamientos_lista.sort((a, b) => a.precio - b.precio);
    renderLanzamientos(lanzamientos_lista);
});

btnOrdenarA.addEventListener('click', () => {
    lanzamientos_lista.sort((a, b) => b.precio - a.precio);
    renderLanzamientos(lanzamientos_lista);
});

const filtroGenero = (id_genero) => {
    const nuevaLista = lanzamientos_lista.filter((lanzamiento) => lanzamiento.id_genero == id_genero);
    renderLanzamientos(nuevaLista);
};

const renderLanzamientos = (lista) => {
    listaLanzamientos.innerHTML = '';
    lista.forEach(lanzamiento => {
        listaLanzamientos.innerHTML += `
            <div class="card text-center" style="width: 17rem;">
                <div class="card-body">
                    <h3>${lanzamiento.artista}</h3>
                    <img class="img-fluid" src="${lanzamiento.img}" alt="${lanzamiento.artista}">
                    <h4 class="text-center">${lanzamiento.nombre}</h4>
                    <h5 class="text-center">$${lanzamiento.precio}</h5>
                    <button id="${lanzamiento.id_lanzamiento}" type="button" class="btn btnAddCarro">
                        <i class="fa-solid fa-cart-plus"></i>Agregar
                    </button>
                </div>
            </div>`;
    });

    const btns = document.querySelectorAll('.btnAddCarro');
    btns.forEach(btn => {
        btn.addEventListener('click', agregarAlCarro);
    });
};

const agregarAlCarro = (e) => {
    const id = e.target.id;
    const lanzamiento = lanzamientos_lista.find(item => item.id_lanzamiento == id);
    carro.agregarAlCarro(lanzamiento);
    carroCuenta.innerText = carro.getCuenta();

    Toastify({
        close: true,
        text: "Disco agregado al Carrito",
        gravity: 'bottom',
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
};

const renderCarro = (lista) => {
    modalDiscos.innerHTML = '';
    lista.forEach(lanzamiento => {
        modalDiscos.innerHTML += `
            <tr>
                <td>${lanzamiento.nombre}</td>
                <td>${lanzamiento.unidades}</td>
                <td>$${lanzamiento.precio}</td>
                <td>$${lanzamiento.precio * lanzamiento.unidades}</td>
            </tr>`;
    });
};

const renderGenero = (lista) => {
    selectGenero.innerHTML = `<option value="" id="Todos">Todos</option>`;
    lista.forEach(genero => {
        selectGenero.innerHTML += `<option value="${genero.id_genero}">${genero.nombre}</option>`;
    });
};

const getLanzamientos = async () => {
    try {
        const endPoint = 'data.json';
        const resp = await fetch(endPoint);
        const json = await resp.json();

        const { lanzamientos, genero } = json;
        lanzamientos_lista = lanzamientos;
        renderLanzamientos(lanzamientos);
        renderGenero(genero);
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: 'Ocurrió un error al mostrar los discos, por favor inténtelo en unos minutos',
            icon: "error",
            confirmButtonText: 'Aceptar'
        });
        console.log(error);
    }
};

getLanzamientos();








// class LanzamientoCreado {
//     constructor(id_lanzamiento, artista, nombre, precio) {
//         this.id = id_lanzamiento;
//         this.artista = artista;
//         this.nombre = nombre;
//         this.precio = precio;
//     }
// }

// const btnAgregarLanzamiento = document.querySelector('#btnAgregarLanzamiento')
// const id = document.querySelector('modalID');
// const artista = document.querySelector('modalArtista');
// const nombre = document.querySelector('modalNombre');
// const precio = document.querySelector('modalPrecio');
// const textoError = document.getElementById( 'error');


// if ( document.getElementById( 'ModalAgregar')) {

//     let modal = document.getElementById( 'ModalAgregar');
//     let buttonAL = document.getElementById( 'btnModalAgregarLaznamietno');
//     let span = document.getElementsByClassName( 'close')[0];
//     let body = document.getElementsByTagName( 'body')[0];

//     buttonAL.onclick = function () {
//         modal.style.display = 'block';
//         body.style.position = 'static';
//         body.style.height = '100%';
//         body.style.overflow = 'hidden';
//     }

//     span.onclick = function () {
//         modal.style.display = 'none';
//         body.style.position = 'inherit';
//         body.style.height = 'auto';
//         body.style.overflow = 'visible';
//     }
// } 

// btnAgregarLanzamiento.addEventListener('click', (e) => {
//     const validarID =(id) => {
//         if ( id.length===2 && !isNaN(id)) {
//             return true;
//         } else {
//             return false;
//         }
//     }
//     const validarNombre = (nombre) => {
//         return nombre.length >=3;
//     }
//     const validarArtista = (artista) => {
//         return nombre.length >=3;    
//     }
//     const validarPrecio = (precio) =>{
//         if ( !isNaN(precio)) {
//             return true;
//         } else {
//             return false;
//         }
//     }
//     if (validarID(id.value) && validarNombre(nombre.value) && validarArtista(artista.value) && validarPrecio(Number(precio.value))) {
//         let nuevoLanzamiento = new LanzamientoCreado ( id.value, nombre.value, artista.value,Number(precio.value));
//         textoError.style.display = 'none';
//         lanzamientosNuevos.push(nuevoLanzamiento);
//         localStorage.setItem("lanzamientos",JSON.stringify(lanzamientosNuevos));
//         lanzamientosNuevos = JSON.parse( localStorage.getItem( 'lanzamientos'));
//         renderLanzamientos( lanzamientosNuevos);
// // kkkkk
//         id.value = '';
//         nombre.value = '';
//         artista.value = '';
//         precio.value = '';

//         Toastify({
//             text: "lanzamiento agregado.",
//             duration: 2000
//             }).showToast();

//     } else {
//         Swal.fire({
//             title: "Error!",
//             text: "Alguno de los campos no es válido. 1- Verifique que el id contenga 2 digitos. 2- Que el nombre esté compuesto por lo menos de 3 letras.",
//             icon: "error"
//         });
//     }

// })






// let estudiantes = [];

// // let estudiantesGet = [];
// fetch('../data/data.json')
// .then(response => response.json())
// .then(data => {
//     estudiantes = data;
//     JSON.parse( localStorage.getItem( 'estudiantes')) || localStorage.setItem( 'estudiantes', JSON.stringify(estudiantes));
    
// })



//agregar los estudiantes renderizados a la lista de estudiantes existente.

// const nuevoLanzamiento = LanzamientoCreado;