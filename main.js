let nombre;
let apellido;
let suscripcion;
let deuda;
let tarjeta;

function validarNombreApellido (nombreApellido) {
    if (nombreApellido == '' || (nombreApellido.length < 3) || !isNaN(nombreApellido)){
        return false;
    } else {
        return true;
    }
}

function validarSuscripcion (pack) {
    if ((pack == 'BRONCE') || (pack == 'PLATA')|| (pack =='ORO') && isNaN(pack)){
        return true;
    } else {
        return false;
    }
}

function modalidadPago (cantidadCuotas) {
    if ((cantidadCuotas == '1') || (cantidadCuotas == '2')|| (cantidadCuotas =='3') && !isNaN(cantidadCuotas)){
        return true;
    } else {
        return false;
    }
}

function tarjetaDeCredito (tarjeta) {
    if ((tarjeta == '') || (tarjeta.length < 12)|| (tarjeta.length >12) || (tarjeta == parseFloat) || isNaN(tarjeta)){
        return false;
    } else {
        return true ;
    }
}

do{
    nombre = prompt ('Ingrese nombre');
    apellido = prompt ('Ingrese apellido');

    if ( !validarNombreApellido(nombre) || !validarNombreApellido(apellido)){
        alert('Error: nombre y/o apellido invalido');

    }
}
while( !validarNombreApellido(nombre) || !validarNombreApellido(apellido)){
}    
let mensaje = 'Bienvenido ' + nombre + ' ' + apellido + '!';






alert(mensaje);


alert('Elija el plan para su suscripción anual "BRONCE", "PLATA" o "ORO"');





do{
    suscripcion = prompt ('Ingrese Plan');
    suscripcion = suscripcion.toUpperCase();

    if (!validarSuscripcion(suscripcion)){
        alert('Error: Plan inexistente. Por favor ingrese un plan válido');

    }
}
while( !validarSuscripcion(suscripcion)){
}    




confirmacion = confirm ('Eligió plan ' + suscripcion);


if(confirmacion == false){
    do{
        do{
            suscripcion = prompt ('Ingrese Plan');
            suscripcion = suscripcion.toUpperCase();
            if (!validarSuscripcion(suscripcion)){
                alert('Error: Plan inexistente. Por favor ingrese un plan válido');

            }
        }
        while( !validarSuscripcion(suscripcion)){
        }  
        confirmacion = confirm ('Eligió plan ' + suscripcion);
    } while(confirmacion == false){

    }
} else {

}


if (suscripcion == 'BRONCE'){
    deuda = 10000
    alert('Debe abonar $10000')
} else if (suscripcion == 'PLATA'){
    deuda = 20000
    alert('Debe abonar $20000')

} else{
    deuda = 30000
    alert('Debe abonar $30000')
}

alert('Eliga cantidad de cuotas: 1 (sin interés), 2 (+20%) o 3 (+50%)')
do{
    cuotas = prompt ('Ingrese cantidad de cuotas');

    if ( !modalidadPago(cuotas)){
        alert('Error: Escriba 1, 2 o 3 para seleccionar la cantidad de cuotas (1 [sin interés], 2 [+20%] o 3 [+50%])');

    }
}
while( !modalidadPago(cuotas)){
}    




confirmacion2 = confirm('Eligió pagar en ' + cuotas + ' cuotas');


if(confirmacion2 == false){
    do{
        do{
            cuotas = prompt ('Ingrese cantidad de cuotas');
        
            if ( !modalidadPago(cuotas)){
                alert('Error: Escriba 1, 2 o 3 para seleccionar la cantidad de cuotas');
        
            }
        }
        while( !modalidadPago(cuotas)){
        }  
        confirmacion2 = confirm('Eligió pagar en ' + cuotas + ' cuotas');
    } while(confirmacion == false){

    }
} else {

}

if (cuotas == 1){
    alert('Debe abonar ' + '$' + deuda + ' en un solo pago');
} else if (cuotas == 2){
    alert( 'Debe abonar ' + '$' + ((deuda / 2) * 1.2) + ' en 2 pagos');
} else {
    alert ('Debe abonar ' + '$' + ((deuda/3) * 1.5) + ' en 3 pagos')
}

do{
    tarjeta = prompt ('Ingrese su tarjeta de crédito')
    if (!tarjetaDeCredito(tarjeta)){
        alert('Error: Ingrese los 12 números asociados a su nombre de su tarjeta de crédito (sin espacios)');

    }
}
while(!tarjetaDeCredito(tarjeta)){
}    

let mensaje2 = nombre + ' ' + apellido + ' su suscripción al pack ' + suscripcion + ' se realizó con exito!';

alert (mensaje2);




    document.querySelector ('h3').innerText = nombre + ' ' + apellido + '\n' + 'Suscripcion: ' + suscripcion


const coleccion = [
    {id:1, tipo:'Album', genero:'Rock', subgenero:'Indie/Independiente/Alternativo', artista:'King Krule', nombre:'Flimsier', añoDeLanzamiento:'2023', stock:15},
    {id:2, tipo:'EP', genero:'Electrónica', subgenero:'IDM/Dance', artista:'Aphex Twin', nombre:'Blackbox Life Recorder 21f / In a Room7 F760', añoDeLanzamiento:'2023', stock:11},
    {id:3, tipo:'Album', genero:'Rock', subgenero:'Math Rock', artista:'Hella', nombre:'Hold Your Horse Is', añoDeLanzamiento:'2002', stock:10},
    {id:4, tipo:'Album', genero:'Rock', subgenero:' Psicodélico/Experimental', artista:'The Beatles', nombre:'Sgt. Pepper´s Lonely Hearts Cub Band', añoDeLanzamiento:'1967', stock:56},
    {id:5, tipo:'Album', genero:'Pop/Experimental', subgenero:'Pop/Reguetón/Alternativo/Experimental/Avant-garde', artista:'Rosalía', nombre:'Motomami', añoDeLanzamiento:'2022', stock:124},
    {id:6, tipo:'Album', genero:'Experimental/Pop', subgenero:'Latin/Folk/Electrónica/Pop', artista:'Helado Negro', nombre:'Far in', añoDeLanzamiento:'2021', stock:22},
    {id:7, tipo:'Album', genero:'Electrónica', subgenero:'Dance/Club', artista:'Caribou', nombre:'Suddenly', añoDeLanzamiento:'2020', stock:12},
    {id:8, tipo:'Album', genero:'Reggae', subgenero:'', artista:'Bob Marley & The Wailers', nombre:'Uprising', añoDeLanzamiento:'1980', stock:15},
    {id:9, tipo:'Album', genero:'Jazz', subgenero:'Modal', artista:'Miles Davis', nombre:'Kind of Blue', añoDeLanzamiento:'1959', stock:50},
    {id:10, tipo:'Album', genero:'Cláscia', subgenero:'Post moderna/ Minimalista', artista:'Philip Glass', nombre:'Glassworks', añoDeLanzamiento:'1981', stock:14},
    {id:11, tipo:'Album', genero:'Jazz', subgenero:'Smooth', artista:'Bill Evans', nombre:'You Must Believe In Spring', añoDeLanzamiento:'1981', stock:17},
    {id:12, tipo:'Album', genero:'Electrónica', subgenero:'Dance/Experimental', artista:'Mark Fell', nombre:'The Neurobiology of Moral Decision Making', añoDeLanzamiento:'2015', stock:2},

]

class Eleccion {
    constructor (coleccion){
        this.coleccion = coleccion;
    }

    GetAlbumById(id){
        const album = this.coleccion.find (item => item.id === id);
        return album ? album : "No contamos con el ejemplar solicitado";
    }

    GetAlbumByGenero (genero){
        const album = this.coleccion.filter (item =>item.genero.toLowerCase().includes(genero.toLowerCase()));
        return album;

    }
}

const seleccion = new Eleccion (coleccion);
const articulo = seleccion.GetAlbumById (parseInt(prompt('Buscar por id')));
const busqueda = seleccion.GetAlbumByGenero (prompt('Buscar albúm por genero'));

console.table(articulo);
console.table(busqueda);

