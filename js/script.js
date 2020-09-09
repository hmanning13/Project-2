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
const linkList = document.querySelector(".link-list");
const header = document.querySelector("header");
const searchBar = header.querySelector("#search");
const searchButton = header.querySelector("#search-button");
const studentList = document.querySelector("ul.student-list");




const searchBarLabel = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;


header.insertAdjacentHTML("beforeend", searchBarLabel);

function search(searchInput, list) {
   const filteredList = [];

   for (let i = 0; i < list.length; i +=1) {
      const student = list[i];
      const studentName = `${student.name.first} ${student.name.last}`.toLowerCase();

      if (searchInput.value.length != 0 && studentName.includes(searchInput.value.toLowerCase())) {
         filteredList.push(student);
      }
   }



   if (filteredList.length != 0) {
      showPage(filteredList, 1);
      addPagination(filteredList);
   } else if (filteredList.length == 0 && searchInput.value.length != 0) {
      studentList.innerHTML = `<h3>No results found</h3>`;
      linkList.innerHTML = "";
   } else if (filteredList.length == 0 && searchInput.value.length == 0) {
      showPage(data, 1);
      addPagination(data);
   }


}






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
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = "";
   // loop over the number of pages needed
     // create the elements needed to display the pagination button
     // insert the above elements
   for (let i = 1; i <= numOfPages; i += 1) {
      let button = "";
      button += `
      <li>
         <button type ="button">${i}</button>
      <li>`;
      linkList.insertAdjacentHTML("beforeend", button);
   }
   // give the first pagination button a class of "active"
   let firstButton = document.querySelector("button");
   firstButton.className = "active";
 

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         let first = document.querySelector(".active");
         
         e.target.className = "activate";     
         showPage(list, e.target.textContent)
      }
         
   });
}




 // Call functions
 showPage(data, 1);
 addPagination(data);




 searchBar.addEventListener("keyup", () => {
   search(searchBar, data);
});

searchButton.addEventListener("click", () => {
   search(searchBar, data);
});
