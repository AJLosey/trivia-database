// Author: Mayur
// Purpose: call /api/category/list to get category list that will be display on category page sidebar     
const categoryListEl = $('#categorieslist');
const quizListEl = $('#quizlist');

fetch('/api/category/')    
.then(function (response) {        
    if (response.ok) {
        response.json().then(function (categories) { 
            // Create Ul element            
            let ulEl = $('<ul class="list-group">');           
            for(let i = 0; i < categories.length; i++)
            {
                let liEl = $('<li class="list-group-item">');                         
                let categorylink = "<a href='/category/" + 
                categories[i].id + "'>" +categories[i].category_name.replace('Entertainment: ','') 
                +"</a>";
                liEl.html(categorylink);                
                ulEl.append(liEl);   
            }  
            categoryListEl.append(ulEl);   
        });
    } else {
        categoryListEl.text("There was an error occurred while connecting to REST API. Please try again!");
    }
  })
  .catch(function (error) {
    categoryListEl.text("There was an error occurred while connecting to REST API. Please try again!");
  });

 // Author: Mayur
// Purpose: call /api/quiz/bycategory/id to get list of quizzes by id and render
const strs = document.URL.split('/');
const id = strs.at(-1); 
const quizByCategoryURL = `/api/quiz/bycategory/${id}`;
fetch(quizByCategoryURL)    
.then(function (response) {        
    if (response.ok) {
        response.json().then(function (quizzes) {            
            // Create Ul element            
            console.log(quizzes);
            let ulEl = $('<ul class="list-group">');           
            for(let i = 0; i < quizzes.length; i++)
            {
                // let categorylink = "<a href='/category/" + 
                // categories[i].id + "'>" +categories[i].category_name.replace('Entertainment: ','') 
                // +"</a>";
                let liEl = $('<li class="list-group-item">');                         
                liEl.html(quizzes[i].quiz_name);                
                ulEl.append(liEl);   
            }  
            quizListEl.append(ulEl);   
        });
    } else {
        categoryListEl.text("There was an error occurred while connecting to REST API. Please try again!");
    }
  })
  .catch(function (error) {
    categoryListEl.text("There was an error occurred while connecting to REST API. Please try again!");
  });