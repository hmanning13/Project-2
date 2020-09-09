/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


const linkList = document.querySelector(".link-list");
const header = document.querySelector("header");
const studentList = document.querySelector("ul.student-list");


//Show page function below

//This function is used to create the page and show 9 student profiles on each page
//It takes the already given student list and transforms it into visual profiles


function showPage(list, page) {

   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector("ul.student-list")
   
   studentList.innerHTML = "";

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


//Add pagination function
//This function is used to create different pages and buttons that work to help navigate the pages of student profiles


function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);

   linkList.innerHTML = "";

   for (let i = 1; i <= numOfPages; i += 1) {
      let button = "";
      button += `
      <li>
         <button type ="button">${i}</button>
      <li>`;
      linkList.insertAdjacentHTML("beforeend", button);
   }

   let firstButton = document.querySelector("button");
   firstButton.className = "active";
 
   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         let first = document.querySelector(".active");
         first.classList.remove("active");
         e.target.className = "active";     
         showPage(list, e.target.textContent)
      }
         
   });
}

 // Call functions

 showPage(data, 1);
 addPagination(data);



//Below is the function for the search bar
//Returns only the students searched for and clears out the rest of the results 


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

const searchBar = header.querySelector("#search");
const searchButton = header.querySelector(".student-search button");

searchBar.addEventListener("keyup", () => {
   search(searchBar, data);
});

searchButton.addEventListener("click", () => {
   search(searchBar, data);
});
