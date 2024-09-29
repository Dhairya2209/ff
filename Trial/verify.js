document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        alert("Please select an image file.");
        return;
    }

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/process-image', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('result').innerHTML = `
            <p><strong>Name:</strong> ${result.name}</p>
            <p><strong>Date of Birth:</strong> ${result.dob}</p>
            <p><strongGender:</strong> ${result.gender}</p>
            <p><strong>Aadhaar Number:</strong> ${result.aadhar}</p>
        `;
    } catch (error) {
        console.error("Error processing image:", error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
});
