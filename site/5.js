/**
 * @param {string} colortext
 * @param {number} shrifttext
 * @param {string} typeshrifttext
 */
function ChangeAndSave(colortext, shrifttext, typeshrifttext) {
  document.getElementById("feedback-text").style.backgroundColor = colortext;
  document.getElementById("feedback-text").style.fontSize = `${shrifttext}px`;
  document.getElementById("feedback-text").style.fontFamily = typeshrifttext;

  localStorage.setItem(
    "styles",
    JSON.stringify([colortext, `${shrifttext}px`, typeshrifttext])
  );
}
function sreset() {
  localStorage.removeItem("styles");
  location.reload();
}

if (localStorage.length > 0) {
  let memorari = JSON.parse(localStorage.getItem("styles"));
  document.getElementById("feedback-text").style.backgroundColor = memorari[0];
  document.getElementById("feedback-text").style.fontSize = memorari[1];
  document.getElementById("feedback-text").style.fontFamily = memorari[2];
}
