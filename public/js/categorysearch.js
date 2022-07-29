const categorySearchEl = $('#categoryidsearch');

fetch('/api/category/')    
.then(function (response) {        
    if (response.ok) {
        response.json().then(function (categories) { 
            
            for(let i = 0; i < categories.length; i++)
            {
                // Create option element            
                let optionEl = $(`<option value="${categories[i].id}">${categories[i].category_name}</option>`);                           
                categorySearchEl.append(optionEl);   
            }  
        });
    } else {
       categoryListEl.text("There was an error occurred while connecting to REST API. Please try again!");
    }
  })
  .catch(function (error) {
    categoryListEl.text("There was an error occurred while connecting to REST API. Please try again!");
  });


document.querySelector("#btnsearch").addEventListener("click", function() {
    const categorypageurl = `/category/${categorySearchEl.val()}`;
    document.location.href = categorypageurl;    
});
  