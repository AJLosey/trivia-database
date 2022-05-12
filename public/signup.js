const signUp = async function (event) {

    console.log('check');
    event.preventDefault();

    //queryselector should equal username form field on login page
    const username = document.querySelector('#username').value.trim();

    //queryselector should equal password form field on login page
    const password = document.querySelector('#password').value.trim();

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

console.log('check');