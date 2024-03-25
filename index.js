const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const carroCuenta = document.querySelector('#carroCuenta');
const carroSeleccion = document.querySelector('#carroSeleccion');
const modalDiscos = document.querySelector('#modalDiscos');

const inputBusqueda = document.querySelector('#inputBusqueda');
const selectGenero = document.querySelector('#selectGenero');

const listaLanzamientos = document.querySelector('#listaLanzamientos');

const btnClose = document.querySelector('#btnClose');
const btnComprar = document.querySelector('#btnComprar');
const btnOrdenar = document.querySelector('#btnOrdenar');
const btnOrdenarA = document.querySelector('#btnOrdenarA');

const btnMiLanzamiento = document.querySelector('#btnMiLanzamiento');

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

// -------------------------------------------------------Agregar Lanzamiento y Renderizarlo------------------------------------------


// Función para mostrar el formulario en un Sweet Alert
const mostrarFormulario = (titulo, contenidoHTML) => {
    Swal.fire({
        title: titulo,
        html: contenidoHTML,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            // Aquí puedes agregar la lógica para guardar los datos del formulario
            // y realizar cualquier acción necesaria
        }
    });
};

// Event listeners para cada selector
btnMiLanzamiento.addEventListener('click', () => {
    const contenidoHTML = `
        <form id="formAlbum">
            <label for="nombreAlbum">Album:</label>
            <input type="text" id="nombreAlbum" name="nombreAlbum" required>
            <label for="artistaAlbum">Artista:</label>
            <input type="text" id="artistaAlbum" name="artistaAlbum" required>
            <label for="precioAlbum">Precio:</label>
            <input type="number" id="precioAlbum" name="precioAlbum" required>
        </form>
    `;
    mostrarFormulario('Nuevo Álbum', contenidoHTML);
});



// --------------------------------------------------------BUSQUEDA y SELECCIONADOR DE GENERO-----------------------------------------
inputBusqueda.addEventListener('input', (evento) => {
    const busqueda = evento.target.value.toLowerCase();
    const id_genero = selectGenero.value;

    if (id_genero === "") {
        const listaTodos = lanzamientos_lista.filter((lanzamiento) => 
            lanzamiento.artista.toLowerCase().includes(busqueda) || 
            lanzamiento.nombre.toLowerCase().includes(busqueda)
        );
        renderLanzamientos(listaTodos);
    } else {
        const nombreLista = lanzamientos_lista.filter((lanzamiento) => 
            (lanzamiento.artista.toLowerCase().includes(busqueda) || lanzamiento.nombre.toLowerCase().includes(busqueda)) && 
            lanzamiento.id_genero == id_genero
        );
        renderLanzamientos(nombreLista);
    }
});

selectGenero.addEventListener('change', (e) => {
    const id_genero = selectGenero.value;
    filtroGenero(id_genero);
});

const filtroGenero = (id_genero) => {
    if (id_genero === "") {
        renderLanzamientos(lanzamientos_lista);
    } else {
        const nuevaLista = lanzamientos_lista.filter((lanzamiento) => lanzamiento.id_genero == id_genero);
        renderLanzamientos(nuevaLista);
    }
};

// --------------------------------------------------------------------------------------------------------------------------------------



btnOrdenar.addEventListener('click', () => {
    lanzamientos_lista.sort((a, b) => a.precio - b.precio);
    renderLanzamientos(lanzamientos_lista);
});

btnOrdenarA.addEventListener('click', () => {
    lanzamientos_lista.sort((a, b) => b.precio - a.precio);
    renderLanzamientos(lanzamientos_lista);
});



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



// -----------------------------------------PARTE SUSCRIPCION------------------------------------------------