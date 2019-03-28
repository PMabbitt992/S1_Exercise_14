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

function makeOutline() {
      //location of the outline
      var outline = document.getElementById("outline");
      //source document for the outline
      var source = document.getElementById("doc");
}