import Rails from "@rails/ujs"

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
      var form = new FormData();
      form.append("logEvents", file.result);
      Rails.ajax({
        type: "POST",
        url: '/ips',
        data: form,
        success: function(result) {
          console.log(result.lastChild);
          document.getElementById('displayText').append(result.lastChild);
        },
      });
    }
    var readFiles = file.readAsText(event.target.files[0]);
  });
});
