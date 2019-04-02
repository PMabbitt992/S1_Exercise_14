"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case

   Author: Paige Mabbitt
   Date: 3.28.19  

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array


*/

//Generate an outline based on h1 theough h6 heading in the source document
window.addEventListener("load", makeOutline);
window.addEventListener("load", setupStyles);

function makeOutline() {
      //location of the outline
      var outline = document.getElementById("outline");
      //source document for the outline
      var source = document.getElementById("doc");

      var mainHeading = document.createElement("h1");
      var outlineList = document.createElement("ol");
      var headingText = document.createTextNode("Outline");

      mainHeading.appendChild(headingText);
      outline.appendChild(mainHeading);
      outline.appendChild(outlineList);

      createList(source, outlineList);
}

function setupStyles() {
      //link the page view styles
      var pageStyles = document.createElement("link");
      pageStyles.setAttribute("href", "bc_page.css");
      pageStyles.setAttribute("rel", "stylesheet");
      pageStyles.setAttribute("disabled", "disabled");
      //Append link to the element head
      document.head.appendChild(pageStyles);
      pageStyles.disabled = true

      //insert buttons for switching
      var buttonDiv = document.createElement("div");
      buttonDiv.setAttribute("id", "styleButtons");
      //Web view button
      var webButton = document.createElement("input");
      webButton.setAttribute("type", "button");
      webButton.setAttribute("value", "Web View");
      //page view button
      var pageButton = document.createElement("input");
      pageButton.setAttribute("type", "button");
      pageButton.setAttribute("value", "Page View");

      buttonDiv.appendChild(webButton);
      buttonDiv.appendChild(pageButton);

      document.body.insertBefore(buttonDiv, document.body.firstChild);
      //append embedded sheet to document head
      var buttonStyles = document.createElement("style");
      document.head.appendChild(buttonStyles);

      //Add style rules
      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "div#styleButtons { \
                  position: fixed; \
            }", 0
      );

      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "div#styleButtons input { \
                  background-color: rgba(68, 94, 186, 0.6); \
                  border: 3px solid rgba(0,24,123, 0.6); \
                  border-radius: 50%; \
                  cursor: pointer; \
                  color: white; \
                  display: inline-block;\
                  font-size: 1.2 em;\
                  height: 60px; \
                  margin: 5px 10px; \
                  width: 100px; \
            }", 1
      );

      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "@media print { \
                  div#styleButtons {\
                        display: none; \
                  } \
            }", 2
      );

      //Turn page view on and off
      webButton.onclick = function () {
            pageStyles.disabled = true;
      }

      pageButton.onclick = function () {
            pageStyles.disabled = false;
      }

}


function createList(source, outlineList) {
      //heading for the outline
      var headings = ["H1", "H2", "H3", "H4", "H5", "H6"]
      //previous level of the headings
      var prevLevel = 0
      //running total of the article headings
      var headNum = 0;
      //loop through all child nodes of source article till no child nodes are left
      for (let n = source.firstChild; n !== null; n = n.nextSibling) {
            var headLevel = headings.indexOf(n.nodeName);
            if (headLevel !== -1) {
                  //add id to heading if it is missing
                  headNum++;
                  if (n.hasAttribute("id") === false) {
                        n.setAttribute("id", "head" + headNum);
                  }
                  var listElem = document.createElement("li");
                  //create hypertext links to the document headings
                  var linkElem = document.createElement("a");
                  linkElem.innerHTML = n.innerHTML;
                  linkElem.setAttribute("href", "#" + n.id);
                  //append hypertext to list item
                  listElem.appendChild(linkElem);


                  if (headLevel === prevLevel) {
                        //append list item to current list
                        outlineList.appendChild(listElem);
                  } else if (headLevel > prevLevel) {
                        //start new nested list
                        var nestedList = document.createElement("ol");
                        nestedList.appendChild(listElem);
                        //append nested list to the last item in the current list
                        outlineList.lastChild.appendChild(nestedList);
                        //set current list to new list
                        outlineList = nestedList;
                  } else {
                        //append list item to a higher list
                        var levelUp = prevLevel - headLevel;

                        for (var i = 1; i <= levelUp; i++) {
                              outlineList = outlineList.parentNode.parentNode;
                        }
                        outlineList.appendChild(listElem);
                  }
                  //update value of prev level
                  prevLevel = headLevel;

            }


      }

}