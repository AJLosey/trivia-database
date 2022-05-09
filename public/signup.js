const signUp = async function (event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();

    //queryselector should equal password form field on login page
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document.querySelector('#signup').addEventListener('submit', signup);