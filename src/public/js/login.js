const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
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
   console.log(responseData);
   if (responseData.status=="success"){
     console.log("estas adentro");  
    window.location.replace('/tienda');
    
   }
   else{
    console.log("estas afuera");  
   }
  } catch (error) {
   
    
  }
  
 
 
});