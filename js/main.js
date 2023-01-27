$(document).ready(function () {
  $("#cpf").mask("000.000.000-00");
  $("#cep").mask("00000-000");
  $("#phone").mask("(00) 00000-0000");
  $("#email").mask("A", {
    translation: {
      A: { pattern: /[\w@\-.+]/, recursive: true },
    },
  });
  $("form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "Por favor, informe um endereço de email",
        email: "Por favor, informe um endereço de email válido",
      },
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element).addClass("error-message");
    },
    submitHandler: function (form) {
      form.submit();
    },
  });
  $("#cep").blur(function () {
    var cep = $(this)
      .val()
      .replace(/[^0-9]/, "");
    if (cep.length != 8) {
      alert("CEP inválido!");
    } else {
      $.getJSON(
        "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
        function (dados) {
          if (!("erro" in dados)) {
            $("#endereco").val(
              dados.logradouro +
                ", " +
                dados.bairro +
                ", " +
                dados.localidade +
                ", " +
                dados.uf
            );
          } else {
            alert("CEP não encontrado.");
          }
        }
      );
    }
  });
});

let originalSpan = document.getElementById("originalSpan");
let container = document.getElementById("container-span");
let currentValue = originalSpan.textContent;

for (let i = 0; i < 500; i++) {
  let newSpan = document.createElement("span");
  newSpan.textContent = currentValue;
  container.appendChild(newSpan);
}

let allSpans = document.getElementsByTagName("span");
for (let i = 0; i < allSpans.length; i++) {
  allSpans[i].style.position = "absolute";
  allSpans[i].style.top = "0";
  allSpans[i].style.left = "0";
  allSpans[i].style.right = "0";
  allSpans[i].style.bottom = "0";
}
