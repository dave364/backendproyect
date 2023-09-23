

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
            status,
            owner
        }          
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
        if (responseData.status=="success"){
            Swal.fire('Se agrego el producto') 
        }     
        else{
            Swal.fire('No se agrego el producto ingrese valores correctos en los campos') 
        }       
    }
    else {
        
        getErrorSpan.style.display = 'block'
    }

})

const valorInputFormActualizacion = document.querySelector('#formularioActualizacion');

valorInputFormActualizacion.addEventListener('submit',async (e)=>{
    e.preventDefault();    
    if (getRole.getAttribute("class")=="admin"){
        const id = e.target.id.value
        const title = e.target.title.value
        const description  = e.target.description.value
        const price = e.target.price.value
        const thumbnail = e.target.thumbnail.value
        const code = e.target.code.value
        const stock = e.target.stock.value
        const category = e.target.category.value
        const status = e.target.status.value
    
        if (title && description && price && thumbnail && code && stock && category && status && id){
            
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
                    Swal.fire('no existe el producto a modificar o tipio al dato invalido ')   
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
         if(responseData.owner){

            if ( getemail.getAttribute("class")==responseData.owner){
            
                const title = e.target.title.value
                const description  = e.target.description.value
                const price = e.target.price.value
                const thumbnail = e.target.thumbnail.value
                const code = e.target.code.value
                const stock = e.target.stock.value
                const category = e.target.category.value
                const status = e.target.status.value
        
                if (title && description && price && thumbnail && code && stock && category && status && id){
                
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
                    const response = await fetch(`/api/products/${id}`, {
                        method: 'PUT',
                    body: JSON.stringify(productForm),
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    });
                    const responseData = await response.json();                
        
                    getErrorSpanAct.style.display = 'none'  
                    if (responseData.status==="success"){
                        Swal.fire('Se modifico el producto')   
                    }
                    else  
                        {
                            Swal.fire('no existe el producto a modificar o tipio mal algun valor')   
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
        else
           {
            Swal.fire('el producto a modificar no existia')   
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
        const response1 = await fetch(`/api/products/${id}`, {
            method: 'GET',           
            headers: {
              'Content-Type': 'application/json',
            },
         });
         
         const responseData1 = await response1.json();         
         if(responseData1.owner){
            if ( getemail.getAttribute("class")==responseData1.owner){
                if (id){
            
                    const productForm ={ 
                        id            
                    }          
                    console.log(productForm)
                    const response2 = await fetch(`/api/products/${id}`, {
                        method: 'DELETE',
                       body: JSON.stringify(productForm),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                     });
                     const responseData2 = await response2.json();
                     console.log(responseData2);    
                    getErrorSpanEli.style.display = 'none'  
                    if (responseData2.status==="si success"){
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
         else   
            {
                Swal.fire('el producto a eliminar no existia') 
            }
        
    }
})

