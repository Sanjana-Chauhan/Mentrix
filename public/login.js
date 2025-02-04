document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const formType = e.submitter.getAttribute("data-formtype");

  const url =
    formType === "signup"
      ? "http://localhost:4000/signup"
      : "http://localhost:4000/SignIn";

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (formType !== "signup") {
    headers.authorization = localStorage.getItem("token");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (formType === "signup") {
      if (result.token) {
        localStorage.setItem("token", result.token);
        alert("Signup successful");
      } else {
        console.error("Signup failed:", result.message);
        alert("Signup failed");
      }
    } else {
      if (result.exists === false) {
        alert("User does not exist");
      } 
      else {


        const ttoken= localStorage.getItem("token");
        fetch("http://localhost:4000/Home", {
          method: "GET",
          headers: {
              
            "authorization":ttoken,
          },
        }).then(() => {
          console.log("Success"); 
        })
        

      }
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred");
  }
});
