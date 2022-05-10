const { response } = require("express");

document.querySelector('#change-password').addEventListener('submit', changePassword);

document.querySelector('#my-quizzes').addEventListener('click', displayQuizzes);

document.querySelector('#logout-btn').addEventListener('click', logout);

document.querySelector('#create-quiz-btn').addEventListener('click', createQuizRedirect);

const changePassword = async function (event) {
    event.preventDefault();

    const password = document.querySelector('#password').value.trim();

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
}

const logout = async function () {
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

const createQuizRedirect = async function () {
    const response = await fetch('/dashboard/new', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        console.log("redirected to quiz page")
    } else {
        alert('Failed to log out.');
    }

}
