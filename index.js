const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const carritoCuenta = document.querySelector('#carritoCuenta');
const caritoSuma = document.querySelector('#carritoSuma');
const inputSearch = document.querySelector('#inputSearch');
const listaColeccion = document.querySelector('#listaColeccion');
const seleccionarGenero = document.querySelector('#seleccionarGenero');
const modalListaColeccion = document.querySelector('#modalListaColeccion');
const btnClose = document.querySelector('#btnClose');
const btnSave = document.querySelector('#btnSave');
const btnOrder = document.querySelector('#btnOrder');

let coleccion_lista = [];


const listaCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];
const carrito = new carrito(listaCarrito);



carritoCuenta.innerText = carrito.traerColeccion();




btnModalCarrito.addEventListener('click', function(){
    const lista = carrito.traerColeccion();
    carritoSuma.innerText = carrito.traerSuma();

    renderCarrito( lista );

    modal.show();
})










// ----------------------------------


// btnModalCarrito.addEventListener('click', function(){
//     const list = cart.getProducts();
//     cartSum.innerText = cart.getSum();

//     redenCart( list );

//     modal.show();
// })

// ----------------------------------











btnSave.addEventListener('click', ()=> {
    console.log('Inicio')
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
})



inputBusqueda.addEventListener ('input', (evento) => {
    const busqueda = evento.target.value;  //inputSearch.value PROBAR ESTA  ULTIMA OPCION CUANDO TENGA QUE FUNCIONAR
    const nuevaLista = coleccion_lista.filter( (coleccion) => coleccion.nombre.toLowerCase().includes(busqueda.toLowerCase()));;
    renderColeccion(nuevaLista)
})

seleccionarGenero.addEventListener('change', (e) => {
    const id_genero = seleccionarGenero.value;
    console.log('Genero', id_genero )

    filtroGenero( id_genero )
})



// btnOrder.addEventListener('click', ()=> {
//     coleccion.sort(  (a, b ) => {
//         if(  a.stock < b.stock  ){
//             return -1
//         }
//         if ( a.stock > b.stock){
//             return 1
//         }

//         return 0
//     } )

//     renderColeccion(coleccion);
//     btnOrder.setAttribute('disabled', true);
// }

btnOrder.addEventListener('click', ()=> {
    coleccion.sort(  (a, b ) => {
        if(  a.stock < b.stock  ){
            return -1
        }
        if ( a.stock > b.stock){
            return 1
        }

        return 0
    } )

    renderColeccion(coleccion)
    btnOrder.setAttribute('disabled', true)
})


const filtroGenero = (id_genero) =>{
    const nuevaLista = coleccion_lista.filter ( (lanzamiento)=> lanzamiento.id_genero == id_genero && lanzamiento.nombre == nombre);

    renderColeccion(nuevaLista);
}


// const renderColeccion = (lista) => {
//     listaColeccion.innerHTML = '';
//     lista.forEach(coleccion => {
//         listaColeccion.innerHTML += //html
//         // DIVS Y ETC SEGURAMENTE DE LA LIBRERIA//
//     });
// }


const renderColeccion = (lista) => {
    listaColeccion.innerHTML = '';
    lista.forEach(coleccion => {
        listaColeccion.innerHTML += // html
            `<div class="col-sm-4 col-md-3">
                <div class="card p-2">
                    <h4 class="text-center">${coleccion.tipo} </h4>
                    <img class="img-fluid" src="${coleccion.img}" alt="${coleccion.artista}">
                    <h3 class="text-center">$${coleccion.nombre} </h3>
                    <button id="${coleccion.id_lanzamiento}" type="button" class="btn btn-primary btnAddCart">
                        <i class="fa-solid fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>`;
    });


// const renderLanzamientos = (coleccion) => {
//     ListaLanzamientos.innerHTML = '';
//     list.forEach(lanzamiento => {
//         ListaLanzamientos.innerHTML += // html
//             `<div class="col-sm-4 col-md-3">
//                 <div class="card p-2">
//                     <h4 class="text-center">${lanzamiento.tipo} </h4>
//                     <img class="img-fluid" src="${lanzamiento.img}" alt="${lanzamiento.artista}">
//                     <h3 class="text-center">$${lanzamiento.nombre} </h3>
//                     <button id="${lanzamiento.id} " type="button" class="btn btn-primary btnAddCart">
//                         <i class="fa-solid fa-cart-plus"></i> Agregar
//                     </button>
//                 </div>
//             </div>`;
//     });

    /* -------------- Agrege el escuchador de eventos a los botones ------------- */






    const btns = document.querySelectorAll('.btnAddCart');
    btns.forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });
}

const agregarAlCarrito = ( e )=> {
    const id = e.target.id;
    const lanzamiento = lanzamiento.find( item => item.id_lanzamiento == id );
    console.table(lanzamiento);
    cart.agregarAlCarrito( lanzamiento);
    carritoCuenta.innerText = carrito.traerCuenta();
    
    alert('agregado al carrito')

}



const renderCarrito = (coleccion) => {
    modalListaColeccion.innerHTML = '';
    list.forEach( lanzamiento => {
        modalListaColeccion.innerHTML += // html
            `<tr>
                <td> ${lanzamiento.tipo} </td>
                <td> ${lanzamiento.artista}</td>
                <td>$${lanzamiento.nombre}</td>
                <td>$${lanzamiento.stock}</td>

            </tr>`
    });
}
renderLanzamientos( coleccion);





const renderGenero = ( coleccion) => {
    seleccionarGenero.innerHTML = '';
    list.forEach( genero => {
        seleccionarGenero.innerHTML += // html
        <option value="${genero.id_genero}"> ${genero.name}</option>
    });
}

const traerColeccion = async () => {

    try{
    const endPoint = 'data.json';
    const resp = await fetch(endPoint);
    const json = await resp.json();

    const {coleccion, genero} = json;
    coleccion_lista = coleccion;
    renderColeccion(genero);
    renderGenero(genero);
    }catch (error){
    alert('Ocurrió un error en la carga de los productos, por favor intentar mas tarde')
    }
    console.log (error)
}

traerColeccion ();


// // class Eleccion {
// //     constructor (coleccion){
// //         this.coleccion = coleccion;
// //     }

// //     agregarLanzamiento (lanzamiento){
// //         let id = this.coleccion.lenght + 1;
// //         lanzamiento.id = id;

// //         this.coleccion.push(lanzamiento);
// //     }


// //     traerAlbumPorId(id){
// //         const album = this.coleccion.find (item => item.id === id);
// //         return album ? album : "No contamos con el ejemplar solicitado";
// //     }


// //     traerAlbumPorGenero (genero){
// //         const album = this.coleccion.filter (item => item.genero.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(genero.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()));
// //         return album;
// //     }


// // mostrarLanzamientos(){
// //     console.table(this.coleccion);
// //     let = mensaje = '';

// //     this.coleccion.forEach(lanzamiento => {
// //         mensaje += Nombre ${lanzamiento.artista} | Album : ${lanzamiento.nombre} /n;
// //     });
// //         alert(mensaje)
// //     }
// // }


// // const seleccion = new Eleccion (coleccion);
// // const lanzamientos = seleccion.traerAlbumPorId(parseInt(prompt('Buscar por id')));


// // const busqueda = seleccion.traerAlbumPorGenero (prompt('Buscar albúm por genero'));

// // console.table(lanzamiento);
// // console.table(busqueda);


// // let lanzamientoUsuario = confirm('Desea subir algo?');


// // if (lanzamientoUsuario === true){
// //     do{
// //     tipox = prompt('Indicar formato');
// //     generox = prompt('Indicar genero');
// //     subgenerox = prompt('Indicar subgenero');
// //     artistax = prompt('Indicar nombre del artista');
// //     nombrex = prompt('Indicar nombre del lanzamiento');
// //     añoDeLanzamientox = parseFloat(prompt('Indicar año de lanzamiento'));
// //     stockx = parseFloat(prompt('Indicar stock disponible para venta al público'));

// //     seleccion.agregarLanzamiento ({tipo:tipox, genero: generox, subgenero: subgenerox, artista: artistax, nombre:nombrex, añoDeLanzamiento: añoDeLanzamientox, stock:stockx});

// //     seleccion.mostrarLanzamientos();


// // } while  (confirm("¿Desea publicar mas contenido?") === true);
// // } else {
// //     alert('Cuando quieras compartir tu música con la comunidad no dudes en utilizar nuestra plataforma');
// // }


















// // renderLanzamientos( coleccion);





















// // let nombre;
// // let apellido;
// // let suscripcion;
// // let deuda;
// // let tarjeta;

// // function validarNombreApellido (nombreApellido) {
// //     if (nombreApellido == '' || (nombreApellido.length < 3) || !isNaN(nombreApellido)){
// //         return false;
// //     } else {
// //         return true;
// //     }
// // }

// // function validarSuscripcion (pack) {
// //     if ((pack == 'BRONCE') || (pack == 'PLATA')|| (pack =='ORO') && isNaN(pack)){
// //         return true;
// //     } else {
// //         return false;
// //     }
// // }

// // function modalidadPago (cantidadCuotas) {
// //     if ((cantidadCuotas == '1') || (cantidadCuotas == '2')|| (cantidadCuotas =='3') && !isNaN(cantidadCuotas)){
// //         return true;
// //     } else {
// //         return false;
// //     }
// // }

// // function tarjetaDeCredito (tarjeta) {
// //     if ((tarjeta == '') || (tarjeta.length < 12)|| (tarjeta.length >12) || (tarjeta == parseFloat) || isNaN(tarjeta)){
// //         return false;
// //     } else {
// //         return true ;
// //     }
// // }

// // do{
// //     nombre = prompt ('Ingrese nombre');
// //     apellido = prompt ('Ingrese apellido');

// //     if ( !validarNombreApellido(nombre) || !validarNombreApellido(apellido)){
// //         alert('Error: nombre y/o apellido invalido');

// //     }
// // }
// // while( !validarNombreApellido(nombre) || !validarNombreApellido(apellido)){
// // }
// // let mensaje = 'Bienvenido ' + nombre + ' ' + apellido + '!';






// // alert(mensaje);


// // alert('Elija el plan para su suscripción anual "BRONCE", "PLATA" o "ORO"');





// // do{
// //     suscripcion = prompt ('Ingrese Plan');
// //     suscripcion = suscripcion.toUpperCase();

// //     if (!validarSuscripcion(suscripcion)){
// //         alert('Error: Plan inexistente. Por favor ingrese un plan válido');

// //     }
// // }
// // while( !validarSuscripcion(suscripcion)){
// // }




// // confirmacion = confirm ('Eligió plan ' + suscripcion);


// // if(confirmacion == false){
// //     do{
// //         do{
// //             suscripcion = prompt ('Ingrese Plan');
// //             suscripcion = suscripcion.toUpperCase();
// //             if (!validarSuscripcion(suscripcion)){
// //                 alert('Error: Plan inexistente. Por favor ingrese un plan válido');

// //             }
// //         }
// //         while( !validarSuscripcion(suscripcion)){
// //         }
// //         confirmacion = confirm ('Eligió plan ' + suscripcion);
// //     } while(confirmacion == false){

// //     }
// // } else {

// // }


// // if (suscripcion == 'BRONCE'){
// //     deuda = 10000
// //     alert('Debe abonar $10000')
// // } else if (suscripcion == 'PLATA'){
// //     deuda = 20000
// //     alert('Debe abonar $20000')

// // } else{
// //     deuda = 30000
// //     alert('Debe abonar $30000')
// // }

// // alert('Eliga cantidad de cuotas: 1 (sin interés), 2 (+20%) o 3 (+50%)')
// // do{
// //     cuotas = prompt ('Ingrese cantidad de cuotas');

// //     if ( !modalidadPago(cuotas)){
// //         alert('Error: Escriba 1, 2 o 3 para seleccionar la cantidad de cuotas (1 [sin interés], 2 [+20%] o 3 [+50%])');

// //     }
// // }
// // while( !modalidadPago(cuotas)){
// // }




// // confirmacion2 = confirm('Eligió pagar en ' + cuotas + ' cuotas');


// // if(confirmacion2 == false){
// //     do{
// //         do{
// //             cuotas = prompt ('Ingrese cantidad de cuotas');

// //             if ( !modalidadPago(cuotas)){
// //                 alert('Error: Escriba 1, 2 o 3 para seleccionar la cantidad de cuotas');

// //             }
// //         }
// //         while( !modalidadPago(cuotas)){
// //         }
// //         confirmacion2 = confirm('Eligió pagar en ' + cuotas + ' cuotas');
// //     } while(confirmacion == false){

// //     }
// // } else {

// // }

// // if (cuotas == 1){
// //     alert('Debe abonar ' + '$' + deuda + ' en un solo pago');
// // } else if (cuotas == 2){
// //     alert( 'Debe abonar ' + '$' + ((deuda / 2) * 1.2) + ' en 2 pagos');
// // } else {
// //     alert ('Debe abonar ' + '$' + ((deuda/3) * 1.5) + ' en 3 pagos')
// // }

// // do{
// //     tarjeta = prompt ('Ingrese su tarjeta de crédito')
// //     if (!tarjetaDeCredito(tarjeta)){
// //         alert('Error: Ingrese los 12 números asociados a su nombre de su tarjeta de crédito (sin espacios)');

// //     }
// // }
// // while(!tarjetaDeCredito(tarjeta)){
// // }

// // let mensaje2 = nombre + ' ' + apellido + ' su suscripción al pack ' + suscripcion + ' se realizó con exito!';

// // alert (mensaje2);




// //     document.querySelector ('h3').innerText = nombre + ' ' + apellido + '\n' + 'Suscripcion: ' + suscripcion


// // const coleccion = [
// //     {id:1, tipo:'Album', genero:'Rock', subgenero:'Indie/Independiente/Alternativo', artista:'King Krule', nombre:'Flimsier', añoDeLanzamiento:'2023', stock:15},
// //     {id:2, tipo:'EP', genero:'Electrónica', subgenero:'IDM/Dance', artista:'Aphex Twin', nombre:'Blackbox Life Recorder 21f / In a Room7 F760', añoDeLanzamiento:'2023', stock:11},
// //     {id:3, tipo:'Album', genero:'Rock', subgenero:'Math Rock', artista:'Hella', nombre:'Hold Your Horse Is', añoDeLanzamiento:'2002', stock:10},
// //     {id:4, tipo:'Album', genero:'Rock', subgenero:' Psicodélico/Experimental', artista:'The Beatles', nombre:'Sgt. Pepper´s Lonely Hearts Cub Band', añoDeLanzamiento:'1967', stock:56},
// //     {id:5, tipo:'Album', genero:'Pop/Experimental', subgenero:'Pop/Reguetón/Alternativo/Experimental/Avant-garde', artista:'Rosalía', nombre:'Motomami', añoDeLanzamiento:'2022', stock:124},
// //     {id:6, tipo:'Album', genero:'Experimental/Pop', subgenero:'Latin/Folk/Electrónica/Pop', artista:'Helado Negro', nombre:'Far in', añoDeLanzamiento:'2021', stock:22},
// //     {id:7, tipo:'Album', genero:'Electrónica', subgenero:'Dance/Club', artista:'Caribou', nombre:'Suddenly', añoDeLanzamiento:'2020', stock:12},
// //     {id:8, tipo:'Album', genero:'Reggae', subgenero:'', artista:'Bob Marley & The Wailers', nombre:'Uprising', añoDeLanzamiento:'1980', stock:15},
// //     {id:9, tipo:'Album', genero:'Jazz', subgenero:'Modal', artista:'Miles Davis', nombre:'Kind of Blue', añoDeLanzamiento:'1959', stock:50},
// //     {id:10, tipo:'Album', genero:'Clásico', subgenero:'Post moderna/ Minimalista', artista:'Philip Glass', nombre:'Glassworks', añoDeLanzamiento:'1981', stock:14},
// //     {id:11, tipo:'Album', genero:'Jazz', subgenero:'Smooth', artista:'Bill Evans', nombre:'You Must Believe In Spring', añoDeLanzamiento:'1981', stock:17},
// //     {id:12, tipo:'Album', genero:'Electrónica', subgenero:'Dance/Experimental', artista:'Mark Fell', nombre:'The Neurobiology of Moral Decision Making', añoDeLanzamiento:'2015', stock:2}
// // ]