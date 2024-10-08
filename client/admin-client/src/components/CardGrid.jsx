import React from 'react';
import '../styles/CardGrid.css'; // Import the CSS file
const elements = [
  "html","base","head","link","meta","script","style","title","body","address",
  "article","aside","footer","header","h1","h2","h3","h4","h5","h6","hgroup",
  "main","nav","section","blockquote","cite","dd","dt","dl","div","figcaption",
  "figure","hr","li","ol","ul","menu","p","pre","a","abbr","b","bdi","bdo","br",
  "code","data","dfn","em","i","kbd","mark","q","rp","ruby","rt","s","samp",
  "small","span","strong","sub","sup","time","u","var","wbr","area","audio",
  "img","map","track","video","embed","iframe","object","picture","source",
  "portal","svg","canvas","noscript","del","ins","caption","col","colgroup",
  "table","tbody","tr","td","tfoot","th","thead","button","datalist","option",
  "fieldset","label","form","input","legend","meter","optgroup","select","output",
  "progress","textarea","details","summary","dialog","slot","template","acronym",
  "applet","bgsound","big","blink","center","dir","font","frame","frameset",
  "image","keygen","marquee","menuitem","nobr","noembed","noframes","param",
  "plaintext","rb","rtc","spacer","strike","tt","xmp"
];

const CardGrid = () => {
  return (
    <div className="cards">
      {elements.map((element, index) => (
        <div className="card" key={index}>
          &lt;{element}&gt;
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
