function ordenarLista(lista) {
    for (let i = 0; i < lista.length; i++) {
       lista.sort((a, b) => a - b );
        return lista;
    }   
}
console.log(ordenarLista([10, 1, 4, 2, 4, 50, 80]));