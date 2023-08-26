const form = document.getElementById('restorePasswordForm');
const text = document.getElementById('message');
const urlParams =  new Proxy(new URLSearchParams(window.location.search),{
  get:(searchParams,prop) => searchParams.get(prop)
})

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  obj.token= urlParams.token;
  const response = await fetch('/api/sessions/restorePassword', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  console.log(responseData)
  if (responseData.status === 'success') {
    
    text.innerHTML= "se ah cambiado la contrseña"
    
  }
  else{
    text.innerHTML = responseData.error
  }
});