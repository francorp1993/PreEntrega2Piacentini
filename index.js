const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const cartCount = document.querySelector('#cartCount');
const cartSum = document.querySelector('#cartSum');
const inputSearch = document.querySelector('#inputSearch');
const listaLanzamientos = document.querySelector('#listaLanzamientos');
const selectGenero = document.querySelector('#selectGenero');
const modalDiscos = document.querySelector('#modalDiscos');
const btnClose = document.querySelector('#btnClose');
const btnSave = document.querySelector('#btnSave');
const btnOrder = document.querySelector('#btnOrder');

let lanzamientos_lista = [];

const listCart = JSON.parse( localStorage.getItem('cart') ) || [];
const cart = new Cart(listCart);

cartCount.innerText = cart.getCount();


btnModalCarrito.addEventListener('click', function(){
    const lista = cart.getLanzamientos();
    cartSum.innerText = cart.getSum();

    redenCart( lista );

    modal.show();
})

btnSave.addEventListener('click', ()=> {
    setTimeout( () => {
        
        Swal.fire({
            title: "Carrito de Compras",
            text: "Compra finalizada",
            icon: "success"
        });
    

    }, 3000)


    modal.hide();

    localStorage.removeItem('cart');
})

btnClose.addEventListener('click', ()=> {
    modal.hide();

    localStorage.removeItem('cart');
})


btnClose.addEventListener('click', ()=> {
    modal.hide();
})

inputSearch.addEventListener('input', (evento) => {
    const busqueda = evento.target.value;
    const nombreLista = lanzamientos_lista.filter(  (disco) => disco.name.toLowerCase().includes( busqueda.toLowerCase() ) && disco.id_genero == selectGenero.value );

    renderLanzamientos(nombreLista);
})



selectGenero.addEventListener('change', (e) => {
    const id_genero = selectGenero.value;
    filtroGenero( id_genero )
});

// KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK 

btnOrder.addEventListener('click', ()=> {
    lanzamientos_lista.sort(  (a, b ) => {
        if(  a.price < b.price  ){
            return -1
        }
        if ( a.price > b.price){
            return 1
        }

        return 0
    } )

    renderLanzamientos(lanzamientos_lista)
    btnOrder.setAttribute('disabled', true)
})

const filtroGenero = ( id_genero ) => {
    const nuevaLista = lanzamientos_lista.filter (  (lanzamiento) => lanzamiento.id_genero == id_genero );
    renderLanzamientos(nuevaLista);
}

const renderLanzamientos = (lista) => {
    listaLanzamientos.innerHTML = '';
    lista.forEach(lanzamiento => {
        listaLanzamientos.innerHTML += // html
            `<div class="card text-center" style="width: 17rem;">
                <div class="card-body">
                    <h3>${lanzamiento.artista}</h3>
                    <img class="img-fluid" src="${lanzamiento.img}" alt="${lanzamiento.artista}">
                    <h4 class="text-center">${lanzamiento.name} </h4>
                    <h5 class="text-center">$${lanzamiento.price} </h5>
                    <button id="${lanzamiento.id_lanzamiento}" type="button" class="btn btnAddCart">
                        <i class="fa-solid fa-cart-plus"></i>Agregar
                    </button>
                </div>
            </div>`;
    });


    const btns = document.querySelectorAll('.btnAddCart');
    btns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

const addToCart = ( e )=> {
    const id = e.target.id_lanzamiento;
    const lanzamiento = lanzamientos_lista.find( item => item.id == id );
    cart.addToCart( lanzamiento);
    cartCount.innerText = cart.getCount();
    
    Toastify({
        close: true,
        text: "Disco agregado al Carrito",
        gravity: 'bottom',
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();

}

const redenCart = (lista) => {
    modalDiscos.innerHTML = '';
    lista.forEach( lanzamiento => {
        modalDiscos.innerHTML += // html
            `<tr>
                <td> ${lanzamiento.name} </td>
                <td> ${lanzamiento.units}</td>
                <td>$${lanzamiento.price}</td>
                <td>$${lanzamiento.price * lanzamiento.units}</td>
            </tr>`
    });
}

const renderGenero = ( lista) => {
    selectGenero.innerHTML = '';
    lista.forEach( genero => {
        selectGenero.innerHTML += // html
        `<option value="${genero.id_genero}"> ${genero.name}</option>`
    });
}

const getLanzamientos = async () => {

    try {
        const endPoint = 'data.json';
        const resp = await fetch(endPoint);
        const json = await resp.json();


        const { lanzamientos, genero } = json;
        lanzamientos_lista = lanzamientos;
        renderLanzamientos (lanzamientos);
        renderGenero (genero)

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: 'Ocurrio un error al mostrar los discos, por favor intente en unos minutos',
            icon: "error",
            confirmButtonText: 'Aceptar'
        });

        console.log(error);
    }


}

getLanzamientos();
