'use strict';

const formPedido = document.getElementById('formularioPedido');
const nombre = document.getElementById('nombre');
const pedido = document.getElementById('pedido');
const pedidoActualizado = document.getElementById('pedidoActualizado');
const dataPedido = document.getElementById('dataPedido');
const guardar = document.getElementById('guardar');

let pedidos = [];

formPedido.addEventListener('submit', function (e) {
    e.preventDefault();
    if (nombre.value.trim() !== '' && pedido.value.trim() !== '') {
        addPedido(nombre.value, pedido.value);
        savePedidoInStorage();
        mostrarPedidos();
        e.target.reset();
    } else {
        console.log('Debe ser llenado todos los campos');
    }
});

function mostrarPedidos() {
    dataPedido.innerHTML = '';
    pedidos.forEach(function (pedido, indice) {
        console.log(pedido)
        dataPedido.innerHTML += `
            <section id="${indice + 1}" class="card">
                <div class="cliente">
                    <h3>Cliente</h3>
                    <p>${pedido.nombre}</p>
                </div>
                <div class="pedido">
                    <h3>Pedido</h3>
                    <p>${pedido.pedido}</p>
                </div>
                <div class="botones">
                    <button class="editar" onclick="editPedido(${indice})">Editar</button>
                    <button class="eliminar" onclick="deletePedido(${indice})">Eliminar</button>
                </div>
            </section>
        `
    });
    savePedidoInStorage();
}

/* CRUD */
function addPedido(nombre, pedido) {
    let dataPedido = {
        'nombre': nombre,
        'pedido': pedido
    }
    pedidos.push(dataPedido);
}

function editPedido(indice) {
    // console.log(pedidos[indice].pedido);
    pedidos[indice].pedido = prompt('Ingrese el nuevo pedido.');
    mostrarPedidos();
}

function deletePedido(indice) {
    pedidos.splice(indice, 1);
    mostrarPedidos();
}

function savePedidoInStorage() {
    const savePedidos = JSON.stringify(pedidos);
    localStorage.setItem('pedidos', savePedidos);
}

function getPedidosStorage() {
    const getPedidos = localStorage.getItem('pedidos');
    pedidos = getPedidos === null ? [] : JSON.parse(getPedidos);
}

getPedidosStorage();
mostrarPedidos();