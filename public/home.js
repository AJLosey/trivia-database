// trying to add radio and submit button functionality but it's still a work in progress

const btn = document.querySelector('#submit-btn');        
const radioButtons = document.querySelectorAll('input[name="flexRadio"]');

btn.addEventListener("click", () => {
    let selectedAnswer;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedAnswer = radioButton.value;
            break;
        }
    }
});

btn.addEventListener("click", () => {
    if (selectedAnswer === "Uruguay") {
        output.innerText = `Correct!`;
        console.log ('correct');
    } else {
        output.innerText = `Incorrect`;
        console.log ('incorrect');
    }
})

