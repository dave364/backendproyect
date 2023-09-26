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
      console.log(e.target.id);
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
  
  if (allBotonEliminar) {
    allBotonEliminar.forEach(async (boton) => {
      boton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        const response = await fetch(`/api/carts/${spanVerCarrito.id}/products/${e.target.id}`, {
          method: 'DELETE',
          body: '',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        Swal.fire('Se eliminó un producto del carrito'); // Mensaje modificado
        setTimeout(function () {
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


  
