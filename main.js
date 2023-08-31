document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://api.replicate.com/v1/predictions";
    const apiToken = "r8_VTMYeRGEHZnOUOHk2jl1a2PfuRVRbs04I93hT"; // Replace with your actual API token
    const generateButton = document.getElementById("generate-button");
    const imageInput = document.getElementById("image-input");
    const resultContainer = document.getElementById("result-container");
  
    generateButton.addEventListener("click", async function () {
      const imageFile = imageInput.files[0];
  
      if (!imageFile) {
        alert("Please select an image to upload.");
        return;
      }
  
      const inputParams = {
        version: "4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
        input: {
          image: await getBase64Image(imageFile)
        }
      };
  
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${apiToken}`
          },
          body: JSON.stringify(inputParams)
        });
  
        const data = await response.json();
        resultContainer.innerHTML = `<p><strong>Generated Caption:</strong> ${data}</p>`;
      } catch (error) {
        console.error("Error:", error);
      }
    });
  
    function getBase64Image(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    }
  });