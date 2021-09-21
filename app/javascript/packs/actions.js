function paintIt(element, backgroundColor, textColor) {
  element.style.backgroundColor = backgroundColor;
  if (textColor) {
    element.style.color = textColor;
  }
}
window.addEventListener("load", () => {
  const links = document.querySelectorAll(
    "a[data-background-color]"
  );
  links.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      const {backgroundColor, textColor} = element.dataset;
      paintIt(element, backgroundColor, textColor);
    });
  });
});

window.addEventListener("load", () => {
  document.getElementById('inputFile').addEventListener("change", () => {
    var file = new FileReader();
    file.onload = () => {
      document.getElementById('displayText').textContent = file.result;
    }
    var readFiles = file.readAsText(event.target.files[0]);

  });
});
