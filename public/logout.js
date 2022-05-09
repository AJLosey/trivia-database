const loginForm = async function () {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }

    //query selector should point to logout button
    document.querySelector('#logout').addEventListener('click', logout);
}