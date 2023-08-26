

const getErrorSpan = document.querySelector('.errorForm');
const getErrorSpanAct = document.querySelector('.errorFormAct');
const getErrorSpanEli = document.querySelector('.errorFormEli');
const getRole = document.querySelector('.RoleDiv h2');
const getemail = document.querySelector('.EmailDiv h2');

console.log(getRole.getAttribute("class"));

const valorInput = document.querySelector('#formulario');
console.log(valorInput)

valorInput.addEventListener('submit',async (e)=>{
    e.preventDefault();    
    if (getRole.getAttribute("class")=="premium"){
        owner=getemail.getAttribute("class");
    }
    else{
        owner="admin"
    }
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
    if (getRole.getAttribute("class")=="admin"){
        const title = e.target.title.value
        const price = e.target.price.value
        const category = e.target.category.value

        if (title && price && category && id){
            
            const productForm ={             
                title,
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
            if (responseData.status==="success"){
                Swal.fire('Se modifico el producto')   
            }
            else  
                {
                    Swal.fire('no existe el producto a modificar')   
                }
        }
        else {
            
            getErrorSpanAct.style.display = 'block'
        } 
    }
   
    else{
        console.log("pedro")
        const id = e.target.id.value;
        console.log(id)
        const response = await fetch(`/api/products/${id}`, {
            method: 'GET',           
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData); 
         if ( getemail.getAttribute("class")==responseData.owner){
            
            const title = e.target.title.value
            const price = e.target.price.value
            const category = e.target.category.value
    
            if (title && price && category && id){
            
                const productForm ={             
                    title,
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
                if (responseData.status==="success"){
                    Swal.fire('Se modifico el producto')   
                }
                else  
                    {
                        Swal.fire('no existe el producto a modificar')   
                    }
            }
            else {
            
                getErrorSpanAct.style.display = 'block'
            } 
         }
         else{
            Swal.fire('no se puede modificar ya que no fuiste quien creo el producto')   
         }
         
    }
})


const valorInputFormEliminar = document.querySelector('#formularioEliminar');

valorInputFormEliminar.addEventListener('submit', async (e)=>{
    e.preventDefault();    
    const id = e.target.id.value
    if (getRole.getAttribute("class")=="admin"){

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
        if (responseData.status==="si success"){
            Swal.fire('Se elimino el producto')  
        }
        else{
            Swal.fire('el producto a eliminar no existia')  
        }
         
    }
    else {
        
        getErrorSpanEli.style.display = 'block'
    }
    }
    else{
        const response = await fetch(`/api/products/${id}`, {
            method: 'GET',           
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData); 
         if ( getemail.getAttribute("class")==responseData.owner){
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
                if (responseData.status==="si success"){
                    Swal.fire('Se elimino el producto')  
                }
                else{
                    Swal.fire('el producto a eliminar no existia')  
                }
                 
            }
            else {
                
                getErrorSpanEli.style.display = 'block'
            }   
         }
         else{
            Swal.fire('no se puede eliminar ya que no fuiste quien creo el producto')   
         }
    }
})