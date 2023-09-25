document.addEventListener("DOMContentLoaded", () => {


  const verProdHome = document.querySelector('#verProductsHome')

  const allBoton = document.querySelectorAll ('.mostrarProductosCart button');
  
  const allBotonEliminar = document.querySelectorAll ('.eliminarProducto button');
  
  const idCartUser= document.querySelector('.idCarrito');
  
  const botonFinalizar = document.querySelector('.finalizarCompra button')
  
  const botonVaciar = document.querySelector('.vaciarCarrito button');
  
  const spanVerCarrito = document.querySelector('.verCarrito Span')
  
  const emailUser = document.querySelector('.email')
  
  const changeRoleBoton = document.querySelector('.changeRol')
  
  const userID = document.querySelector('.userID')
  
  
  
  
  
  
  
  console.log(allBotonEliminar)
  
  
  if (botonVaciar){
    botonVaciar.addEventListener('click', async (e)=>{
      e.preventDefault();
      const response = await fetch(`/api/carts/${spanVerCarrito.id}`, {
        method: 'DELETE',
        body:'',
        headers: {
          'Content-Type': 'application/json',
        },
     });
     const responseData = await response.json();
     console.log(responseData);
     Swal.fire('Se vacio el carrito')
     setTimeout(function() {
      window.location.reload();
    }, 500);
    })
  }
  
  
  if (allBoton){
    allBoton.forEach( async (boton)=>{
      boton.addEventListener('click', async (e)=>{
          e.preventDefault();
          console.log(e.target.id);
          const response = await fetch(`/api/products/${e.target.id}`, {
            method: 'GET',           
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData); 
  
          if (emailUser.getAttribute("email")==responseData.owner){
            Swal.fire('no puede agregar productos de su creacion al carrito')
          }
          else{
            
            const response = await fetch(`/api/carts/${idCartUser.id}/product/${e.target.id}`, {
              method: 'POST',
              body:'',
              headers: {
                'Content-Type': 'application/json',
              },
           });
           const responseData = await response.json();
           console.log(responseData);
           Swal.fire('Se agrego el producto al carrito')
          }
  
  
  
  
          
           
      })
  
  })
  }
  
  
  if (botonFinalizar){
    botonFinalizar.addEventListener('click',async (e)=>{
      e.preventDefault();
      console.log(botonFinalizar, "compro?");
      const response = await fetch(`/api/carts/${spanVerCarrito.id}/purchase`, {
        method: 'POST',
        body:'',
        headers: {
          'Content-Type': 'application/json',
        },
     });
     const responseData = await response.json();
     console.log(responseData);
     if(responseData.status==='success'){
      if (responseData.payload===""){
        Swal.fire('Se realizo la compra con exito')
        setTimeout(function() {
          window.location.reload();
        }, 5000);
      }
      else{
        Swal.fire(`Se realizo la compra con exito pero estos codigos de producos no tenian stock :${responseData.payload} `)
        setTimeout(function() {
          window.location.reload();
        }, 5000);
      }
      
     }
     else{
      console.log("la compra no se hizo")
      console.log(responseData.payload)
      if (responseData.payload===""){
        Swal.fire('la compra no se realizo no habia productos en el carrito ')
      }
      else{
        Swal.fire(`la compra no se realizo estos  codigos de productos no tenian stock : ${responseData.payload}`)
      }
     
     }
     
    })
  }
  
  if (allBotonEliminar){
    allBotonEliminar.forEach( async (boton)=>{
      boton.addEventListener('click', async (e)=>{
          e.preventDefault();
          console.log(e.target.id);
          const response = await fetch(`/api/carts/${spanVerCarrito.id}/products/${e.target.id}`, {
              method: 'DELETE',
              body:'',
              headers: {
                'Content-Type': 'application/json',
              },
           });
           const responseData = await response.json();
           console.log(responseData);
           Swal.fire('Se elimino el producto en el  carrito')
           setTimeout(function() {
            window.location.reload();
          }, 500);
           
      })
  
  })
  }
  
  if (changeRoleBoton){
    changeRoleBoton.addEventListener('click',async (e)=>{
      e.preventDefault();
      const response = await fetch(`/api/users/premium/${userID.getAttribute("id")}`, {
        method: 'PUT',
        body:'',
        headers: {
          'Content-Type': 'application/json',
        },
     });
     const responseData = await response.json();
     console.log(responseData);
     Swal.fire('Se modifico el role del usuario , es necesesario Relogear para ver los cambios')
           setTimeout(function() {
            window.location.href = '/api/sessions/logout'
          }, 2000);
  
    })
  }});

  const deleteButton = (id) => {
    // Aquí puedes realizar alguna acción para eliminar el producto
  }
  
  const getProduct = (page, orderBy) => {
    fetch(`/api/products?page=${page}&orderBy=${orderBy}`)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';
  
        if (Array.isArray(data.payload.docs)) {
          const productList = data.payload.docs;
  
          productList.forEach(product => {
            const row = `
              <tr>
                <td>${product._id}</td>
                <td>${product.title}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td><img class="cartIMG" src=${product.thumbnail} alt="img"></td>
                <td>${product.price}</td>
                <td><button class="pages btn btn-sm btn-info comprar-button" data-product-id="{{product._id}}">Comprar</button></td>
              </tr>
            `;
            tableBody.innerHTML += row;
          });
        } else {
          console.log('La propiedad "docs" no existe o no es un array');
        }
  
        pageButtons(data.payload, orderBy);
      })
      .catch(error => {
        console.log('Error al obtener los productos:', error);
      });
  }
  
  
  
  // Llama a la función getProduct inicialmente para mostrar los productos
  getProduct(0,0);
  
  function pageButtons(state, orderBy) { console.log("state",state, orderBy)
    var wrapper = document.getElementById('pagination-wrapper');
    wrapper.innerHTML = '';
  
    for (let page = 1; page <= state.totalPages; page++) {
      wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info" style=${page == state.page ? 'color:black;' : null}>${page}</button>`;
    }
  
    if (state.hasPrevPage) {
      wrapper.innerHTML = `<button value=${state.prevPage} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML;
    }
  
    if (state.hasNextPage) {
      wrapper.innerHTML += `<button value=${state.nextPage} class="page btn btn-sm btn-info">Last &#187;</button>`;
    }
  
    wrapper.innerHTML += `<button class="pages btn btn-sm btn-info" onclick="getProduct(0, 0)">Limpiar</button>`;
    wrapper.innerHTML += `<button class="pages btn btn-sm btn-info" onclick="getProduct(0, -1)">Mayor precio</button>`;
    wrapper.innerHTML += `<button class="pages btn btn-sm btn-info" onclick="getProduct(0, 1)">Menor precio</button>`;
  
    $('.page').on('click', function() { 
      const page = Number($(this).val());
      getProduct(page, orderBy);
    });
  }
  
    pageButtons(state);