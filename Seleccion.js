class Carro {
    constructor( lista = [] ){
        this.carro = lista;
    }

    addToCarro( {id, name, img, price} ){
        // Busco si existe el producto
        const index = this.carro.findIndex(  product => product.id == id );
        if( index == -1){
            this.carro.push( {id, name, price, units: 1} );
        } else {
            // Ya esta en el carrito entonces incremento la cantidad'
            this.carro[index].units += 1;
        }

        localStorage.setItem('carro', JSON.stringify(this.carro));
    }

    getLanzamientos(){
        return this.carro;
    }

    getCuenta(){
        const count = this.carro.reduce(  (cantidad, lanzamiento) => {  return cantidad + lanzamiento.units   }, 0  )
        return count;
    }

    getSuma(){
        return this.carro.reduce(  (acumulado, lanzamiento) => {  return acumulado + (lanzamiento.units * lanzamiento.price)  }, 0  )
    }
}