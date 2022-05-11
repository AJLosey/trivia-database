// Author: Mayur
// Purpose: call /api/category/list to get category list that will be display on category page sidebar     
const categoryListEl = $('#categorieslist');
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