const signUp = async function (event) {


    event.preventDefault();

    //queryselector should equal username form field on login page
    const username = document.querySelector('#username').value.trim();

    //queryselector should equal password form field on login page
    const password = document.querySelector('#password').value.trim();

    const cpassword = document.querySelector('#cpassword').value.trim();

    if (password != cpassword) {
        alert('passwords must match');
        return;
    }

    if (username && password) {
        const response = await fetch('/api/user/signup', {
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

//querySelector should equal login form
document.querySelector('#signup').addEventListener('submit', signUp);
