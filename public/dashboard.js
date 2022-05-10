const { response } = require("express");

document.querySelector('#change-password').addEventListener('submit', changePassword);

document.querySelector('#my-quizzes').addEventListener('click', displayQuizzes);

document.querySelector('#logout-btn').addEventListener('click', logout);

const changePassword = async function (event) {
    event.preventDefault();

    //queryselector should equal password form field on login page
    const password = document.querySelector('#password').value.trim();

    //fetch should equal route for logging in
    const response = await fetch('/dashboard/password', {
        method: 'PUT',
        body: JSON.stringify({ newpass: password }),
        headers: { 'Content-Type': 'application/json' }

    });

    if (response.ok) {
        alert('Updated password!');
    } else {
        alert('Failed to log in.');
    }
}

const displayQuizzes = async function () {
    const display = await fetch('/dashboard/quizzes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
}