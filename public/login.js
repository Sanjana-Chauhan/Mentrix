document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
   
    const formData = new FormData(e.target); //return an object of the form data.

    const data = Object.fromEntries(formData.entries());  // it will create an object where each form field's name becomes a key, and its value becomes the corresponding value.y
    const formType = e.submitter.getAttribute("data-formtype");
   
    let url='';
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
  };
    if(formType==='signup'){
      url='http://localhost:4000/signup';
    }
    else{
      url='http://localhost:4000/SignIn';
      headers['authorization']=localStorage.getItem('token');
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if(formType==='signup'){
        if (result.token) {
          localStorage.setItem('token', result.token);
          window.location.href = '/home';
        } else {
          console.error('Signup failed:', result.message);
        }
      }
      else{
          if(result.status==="Success"){
            window.location.href = '/home';
          }
          else{
            alert("Invalid Credentials.Either Mail or Password is n correct");
          }
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
     
  });
  