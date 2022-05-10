const loginForm = async function (event) {
    event.preventDefault();

    //queryselector should equal username form field on login page
    const username = document.querySelector('#username').value.trim();

    //queryselector should equal password form field on login page
    const password = document.querySelector('#password').value.trim();

    //fetch should equal route for logging in
    const response = await fetch('api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }

    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log in.');
    }
}

//querySelector should equal login form
document.querySelector('#login').addEventListener('submit', loginForm);