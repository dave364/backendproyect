const socket = io();


const getMostrarProductos = document.querySelector('#mostrarProductos')
const getErrorSpan = document.querySelector('.errorForm');
console.log(getMostrarProductos)

socket.on('productos', data=>{
    console.log(data)
    let agrupar = ""
    data.forEach(element => {
        agrupar+=`
                <div id="cart">
                    <p><span class="keyDer"> ID : </span>${element._id}</p>
                    <p><span class="keyDer"> TITULO : </span> ${element.title}</p>
                    <p><span class="keyDer"> DESCRIPCION : </span> ${element.description}</p>
                    <p><span class="keyDer"> PRECIO: </span> $${element.price}</p>
                    <p><span class="keyDer"> THUMBNAIL : </span> ${element.thumbnail} </p>
                    <p><span class="keyDer"> CODIGO : </span> ${element.code}  </p>
                    <p><span class="keyDer"> STOCK : </span> ${element.stock}</p>
                    <p><span class="keyDer"> CATEGORIA : </span> ${element.category}</p>
                    <p><span class="keyDer"> STATUS: </span> ${element.status} </p>
                    <button id="${element._id}">Eliminar</button>
                </div>`              
    });
    getMostrarProductos.innerHTML = agrupar;

    const botonEliminar  = document.querySelectorAll('#mostrarProductos button')

    botonEliminar.forEach(element=>{
        element.onclick = (e) =>{
            e.preventDefault();
            console.log(e.target.id)            
            socket.emit('delete',e.target.id)            
        }
        
    })

    

})




const valorInput = document.querySelector('#formulario');

valorInput.addEventListener('submit', (e)=>{
    e.preventDefault();    
    const title = e.target.title.value
    const description  = e.target.description.value
    const price = e.target.price.value
    const thumbnail = e.target.thumbnail.value
    const code = e.target.code.value
    const stock = e.target.stock.value
    const category = e.target.category.value
    const status = e.target.status.value

    if (title && description && price && thumbnail && code && stock && category && status){
        
        const productForm ={ 
            title,
            description,
            price, 
            thumbnail,
            code,
            stock,
            category,
            status
        }          
        console.log(productForm)
        socket.emit('addProduct',productForm)    
        getErrorSpan.style.display = 'none'    
    }
    else {
        
        getErrorSpan.style.display = 'block'
    }

})

socket.on('dataEvent',data =>{
    Swal.fire(
        data
      )
})