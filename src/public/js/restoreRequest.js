const form = document.getElementById('restoreRequestForm');
console.log(form)
const text = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch('/api/sessions/restoreRequest', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  console.log(responseData)
  if (responseData.status === 'success') {
    
    text.innerHTML= "se ah enviado un correo de verificacion"
    
  }
  else{
    text.innerHTML = responseData.error
  }
});