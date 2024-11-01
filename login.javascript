
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Basic validation
    if (validateEmail(email) && password.length >= 6) {
        alert('Login Successful!');
        // Optionally, save email to local storage if "Remember Me" is checked
        if (rememberMe) {
            localStorage.setItem('email', email);
        }
        // Redirect to the home page
        window.location.href = 'home.html'; // Ensure this points to the correct home page
    } else {
        alert('Invalid email or password. Please try again.');
    }
});
