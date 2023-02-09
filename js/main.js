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
