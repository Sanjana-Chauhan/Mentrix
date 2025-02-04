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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    // Manually handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      console.log("Error data:", errorData);
      throw new Error(errorData.message || "Something went wrong!");
    }

    const result = await response.json();

    if (result && result.token) {
      window.location.href = "/Home"; // Redirect to the Home page
    }
  } catch (error) {
    alert(error.message || "An error occurred"); // show the error message from the server
  }
});
