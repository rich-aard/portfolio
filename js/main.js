/**
 * @param {Event} event - The click event object
 * @param {string} tabId - The ID of the targeted tab container
 */
function openTab(event, tabId) {
   
    const tabContents = document.getElementsByClassName("tab-content");
    const tabButtons = document.getElementsByClassName("tab-btn");

    
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active-content");
    }

    
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }


    document.getElementById(tabId).classList.add("active-content");
    event.currentTarget.classList.add("active");
}

document.getElementById('portfolio-contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const statusDiv = document.getElementById('form-status');
    statusDiv.style.color = '#ffc107'; 
    statusDiv.innerText = 'Sending your message...';

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwrojCVWDq1rL9dBRzrjIiZZrOj5WtAKlIaX1v8M__fzDbNwRBAiMaBIQ3n0BVcGTDf/exec';

    try {
        const response = await fetch(googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        statusDiv.style.color = '#28a745'; 
        statusDiv.innerText = 'Message has been sent successfully.';

        setTimeout(()=> {
            document.getElementById('portfolio-contact-form').reset();
            statusDiv.innerText = ''; 
            
        }, 3000);

    } catch (error) {
        statusDiv.style.color = '#dc3545'; 
        statusDiv.innerText = 'ERROR: CHANNELS BLOCKED. TRANSMISSION FAILED.';
        console.error('Submission error:', error);
    }
});