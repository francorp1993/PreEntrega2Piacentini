class carrito {
    constructor (lista =[]){
        this.carrito = lista;
    }

    agregarAlCarrito ({tipo,nombre, añoDeLanzamiento,stock}){
        const index = this.carrito.findIndex (lanzamiento => lanzamiento.id == id );
        if (index == -1){
            this.carrito.push ({tipo,nombre, stock, units:1});
        } else {
            this.carrito[index].units += 1;
        }

        localStorage.setItem ('carrito', JSON.stringify (this.carrito));
    }

    traerColeccion (){
        return this.carrito;
    }

    traerCuenta (){
        const cuenta = this.carrito.reduce ( (cant, lanzamiento) => { return cant + lanzamiento.units }, 0)
        return cuenta;
    } 

    traerSuma (){
        return this.carrito.reduce ( (acum, lanzamiento) => { return acum + (lanzamiento.stock * lanzamiento.stock) },0 )
    }      
    //  SI LE PONGO PRECIO A LOS LANZAMIENTOS  // PUEDO CON ESTO RESTAR EN VEZ DE SUMAR SI QUIERO
}