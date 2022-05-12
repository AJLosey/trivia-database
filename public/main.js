document.querySelector('#logout-link').addEventListener('click', logout);

const logout = async function () {
    console.log('check')
    const response = await fetch('/dashboard/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }

}