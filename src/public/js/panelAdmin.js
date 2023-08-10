

const getErrorSpan = document.querySelector('.errorForm');
const getErrorSpanAct = document.querySelector('.errorFormAct');
const getErrorSpanEli = document.querySelector('.errorFormEli');

const valorInput = document.querySelector('#formulario');
console.log(valorInput)

valorInput.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const price = e.target.price.value;
    const category = e.target.category.value;
  
    if (name && price && category ) {
      const productForm = {
        name,
        price,
        category
      };
      
      console.log(productForm)     
        const response = await fetch('/api/products', {
            method: 'POST',
           body: JSON.stringify(productForm),
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData);     
        getErrorSpan.style.display = 'none'  
        Swal.fire('Se agrego el producto') 
    }
    else {
        
        getErrorSpan.style.display = 'block'
    }

})


const valorInputFormActualizacion = document.querySelector('#formularioActualizacion');

valorInputFormActualizacion.addEventListener('submit',async (e)=>{
    e.preventDefault();    
    const id = e.target.id.value
    const name = e.target.name.value
    const price = e.target.price.value
    const category = e.target.category.value

    console.log("Formulario de Actualizar Producto enviado");
    console.log("ID:", id);
    console.log("Nombre:", name);
    console.log("Precio:", price);
    console.log("Categoría:", category);


    if (name && price && category && id){
        
        const productForm ={             
            name,
            price, 
            category,
           
        }          
        console.log(productForm)
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
           body: JSON.stringify(productForm),
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData); 

        getErrorSpanAct.style.display = 'none'  
        Swal.fire('Se modifico el producto')   
    }
    else {
        
        getErrorSpanAct.style.display = 'block'
    }

})


const valorInputFormEliminar = document.querySelector('#formularioEliminar');

valorInputFormEliminar.addEventListener('submit', async (e)=>{
    e.preventDefault();    
    const id = e.target.id.value
   
    console.log("Formulario de Eliminar Producto enviado");
    console.log("ID:", id);

    if (id){
        
        const productForm ={ 
            id            
        }          
        console.log(productForm)
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
           body: JSON.stringify(productForm),
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData);    
        getErrorSpanEli.style.display = 'none'  
        Swal.fire('Se elimino el producto')  
    }
    else {
        
        getErrorSpanEli.style.display = 'block'
    }

})