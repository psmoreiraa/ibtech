document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {

      const command = input.value.toLowerCase().trim();
      let response = "";

      if (command === "whoami") {
        response = "Pedro Moreira - Engenharia da Computação";
      } else if (command === "skills") {
        response = "HTML, CSS, C/C++, Excel, Canva";
      } else if (command === "contact") {
        response = "Email: pedrosmoreira34@gmail.com";
      } else {
        response = "Comando não reconhecido";
      }

      output.innerHTML += `<p>> ${command}</p><p>${response}</p>`;
      input.value = "";
    }
  });

});
