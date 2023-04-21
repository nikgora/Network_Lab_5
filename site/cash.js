/**
 * Function does saving data from page to local storage
 *
 * @param {string} colortext string with HEX format of color
 * @param {number} shrifttext font size
 */
function ChangeAndSave(colortext, shrifttext) {
  // change styles
  document.getElementById("texttoch").style.backgroundColor = colortext;
  document.getElementById("texttoch").style.fontSize = `${shrifttext}px`;
  // create list with styles data and save in local storage
  localStorage.setItem(
    "styles",
    JSON.stringify([colortext, `${shrifttext}px`])
  );
  // change styles in styles setter back
  document.getElementById("colorget").value = "rgba(0,0,0,0.5)";
  document.getElementById("shriftget").value = "";
}
/**
 * Function does reseting of text and deleting data from local storage
 */
function Megareset() {
  //document.getElementById("texttoch").style.backgroundColor='';
  //document.getElementById("texttoch").style.fontSize =`35px`;
  localStorage.removeItem("styles");
  location.reload();
}

if (localStorage.length > 0) {
  let alwStyle = JSON.parse(localStorage.getItem("styles"));
  document.getElementById("texttoch").style.backgroundColor = alwStyle[0];
  document.getElementById("texttoch").style.fontSize = alwStyle[1];
}
