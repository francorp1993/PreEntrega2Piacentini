class Carro {
    constructor( lista = [] ){
        this.carro = lista;
    }


    addToCarro( {id_lanzamiento, nombre, precio,} ){
        // Busco si existe el producto
        const index = this.carro.findIndex(  lanzamiento => lanzamiento.id_lanzamiento == id_lanzamiento );
        if( index == -1){
            this.carro.push( {id_lanzamiento, nombre, precio, unidades: 1} );
        } else {
            // Ya esta en el carrito entonces incremento la cantidad'
            this.carro[index].unidades += 1;
        }

        localStorage.setItem('carro', JSON.stringify(this.carro));
    }


    getLanzamientos(){
        return this.carro;
    }

    getCuenta(){
        const cuenta = this.carro.reduce(  (cantidad, lanzamiento) => {  return cantidad + lanzamiento.unidades   }, 0  )
        return cuenta;
    }

    getSuma(){
        return this.carro.reduce(  (acumulado, lanzamiento) => {  return acumulado + (lanzamiento.unidades * lanzamiento.precio)  }, 0  )
    }
}


