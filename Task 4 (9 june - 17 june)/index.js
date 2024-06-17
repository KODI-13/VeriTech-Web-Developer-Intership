let accordian = document.getElementsByClassName("FAQ__title");

// for (let i = 0; i &lt; accordian.length; i++) {
//     accordian[i].addEventListener(&quot;click&quot;, function () {
//     if (this.childNodes[1].classList.contains(&quot;fa-plus&quot;)) {
//       this.childNodes[1].classList.remove(&quot;fa-plus&quot;);
//       this.childNodes[1].classList.add(&quot;fa-times&quot;);
//     } else {
//       this.childNodes[1].classList.remove(&quot;fa-times&quot;);
//       this.childNodes[1].classList.add(&quot;fa-plus&quot;);
//     }

//     let content = this.nextElementSibling;
//     if (content.style.maxHeight) {
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + &quot;px&quot;;
//     }
//   });
// }

// Loop through each element in the accordian array
for (let i = 0; i < accordian.length; i++) {
    // Add a click event listener to each element
    accordian[i].addEventListener("click", function () {
      // Check if the second child node contains the 'fa-plus' class
      if (this.childNodes[1].classList.contains("fa-plus")) {
        // Remove 'fa-plus' and add 'fa-times' class
        this.childNodes[1].classList.remove("fa-plus");
        this.childNodes[1].classList.add("fa-times");
      } else {
        // Otherwise, remove 'fa-times' and add 'fa-plus' class
        this.childNodes[1].classList.remove("fa-times");
        this.childNodes[1].classList.add("fa-plus");
      }
  
      // Get the next sibling element which is the content to show/hide
      let content = this.nextElementSibling;
      // Check if the content is already expanded
      if (content.style.maxHeight) {
        // If expanded, set maxHeight to null to collapse
        content.style.maxHeight = null;
      } else {
        // If collapsed, set maxHeight to the scrollHeight to expand
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
