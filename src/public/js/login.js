const form = document.getElementById('loginForm' );

document.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch('/api/sessions/login', {
      method: 'POST',
     body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
   });
   const responseData = await response.json();
   /*console.log(responseData);*/
   if (responseData.status=="success"){

      if (responseData.payload==="Admin"){
        window.location.replace('/panelAdmin');
      }
      else{
        window.location.replace('/tienda');
      }
   
    
   }
   else{
    console.log("estas afuera");  
   }
  } catch (error) {
   
    
  }
  
 
 
});