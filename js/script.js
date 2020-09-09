/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/










function showPage(list, page) {
// create two variables which will represent the index for the first and last student on the page


   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;


// select the element with a class of 'student-list' and assign it to a variable
  
   const studentList = document.querySelector("ul.student-list")
   

// set the innerHTML property of the variable you just created to an empty string
   
   studentList.innerHTML = "";


// loop over the length of the 'list' parameter
   // inside the loop create a conditional to display the proper students
      // inside the conditional:
      // create the elements needed to display the student information
      // insert the above elements 


   for (let i = 0; i < list.length; i +=1) {
      if (i >= startIndex && i < endIndex) {
         //const student = list[i];
         const studentItem = ` 
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>`;
         studentList.innerHTML += studentItem;
      }
   }
}










/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / 9);
   // select the element with a class of `link-list` and assign it to a variable
   const linkList = document.querySelector("ul.link-list");
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = "";
   // loop over the number of pages needed
     // create the elements needed to display the pagination button
     // insert the above elements
   for (let i = 1; i <= numOfPages; i += 1) {
      const button = 
      `<li>
         <button type ="button">${i}</button>
      <li>`;
      linkList.innerHTML += button
   }
   // give the first pagination button a class of "active"
   const firstButton = linkList.firstElementChild;
   firstButton.className = "active";
 

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         const listOfButtons = linkList.children;
         const button = e.target;
         
         for (let i = 0; i < listOfButtons.length; i += 1) {
            const buttonElement = listOfButtons[i].querySelector("button");
            //buttonElement.className = "";
            
         }
         
         button.className = "active";
         showPage(list, button.textContent);
      }
   });
}

 // Call functions
 showPage(data, 1);
 addPagination(data);
