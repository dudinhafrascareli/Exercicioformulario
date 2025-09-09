const form = document.querySelector("#form");
const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let formIsValid = true;

  const fields = [
    { id: "nome", label: "Nome", validador: nameIsValid },
    { id: "ultimoNome", label: "Sobrenome", validador: nameIsValid },
    { id: "telefone", label: "Telefone", validador: telefoneIsValid },
    { id: "email", label: "E-mail", validador: emailIsValid },
    { id: "rg", label: "RG", validador: rgIsValid },
    { id: "cpf", label: "CPF", validador: cpfIsValid },
    { id: "nascimento", label: "Nascimento", validador: dateIsValid },
    { id: "endereco", label: "Endereço", validador: enderecoIsValid },
    { id: "complemento", label: "Complemento", validador: enderecoIsValid },
    { id: "cep", label: "CEP", validador: cepIsValid },
    { id: "curso", label: "Curso", validador: cursoIsValid },
    {
      id: "anoConclusao",
      label: "Ano de Conclusão",
      validador: anoConclusaoIsValid,
    },
    { id: "senha", label: "Senha", validador: passwordIsSecure },
    {
      id: "confirmaSenha",
      label: "Confirmação de Senha",
      validador: passwordMatch,
    },
  ];

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const value = input.value.trim();
    const inputBox = input.closest(".campos, .camposNascimento");
    const erroSpan = inputBox.querySelector(".erro");

    erroSpan.innerHTML = "";
    inputBox.classList.remove("invalid");
    inputBox.classList.add("valid");

    const validacao = field.validador(value);
    if (!validacao.isValid) {
      erroSpan.innerHTML = `${iconeErro} ${validacao.errorMensagem}`;
      inputBox.classList.add("invalid");
      inputBox.classList.remove("valid");
      formIsValid = false;
    }
  });

  const selects = [
    { id: "residencia", label: "Residência" },
    { id: "estado", label: "Estado" },
  ];

  selects.forEach((selectField) => {
    const select = document.getElementById(selectField.id);
    const selectBox = select.closest(".select");
    const erroSpan = selectBox.querySelector(".erro");

    erroSpan.innerHTML = "";
    selectBox.classList.remove("invalid");
    selectBox.classList.add("valid");

    if (select.value === "") {
      erroSpan.innerHTML = `${iconeErro} Selecione ${selectField.label}!`;
      selectBox.classList.add("invalid");
      selectBox.classList.remove("valid");
      formIsValid = false;
    }
  });

  const escolaridade = document.getElementsByName("escolaridade");
  const escolaridadeBox = document.querySelector(".escolaridadeBox");
  const escolaridadeErro = escolaridadeBox.querySelector(".erro");
  const escolaridadeSelected = [...escolaridade].find((r) => r.checked);

  escolaridadeErro.innerHTML = "";
  escolaridadeBox.classList.remove("invalid");
  escolaridadeBox.classList.add("valid");

  if (!escolaridadeSelected) {
    escolaridadeErro.innerHTML = `${iconeErro} Selecione sua escolaridade!`;
    escolaridadeBox.classList.add("invalid");
    escolaridadeBox.classList.remove("valid");
    formIsValid = false;
  }

  if (formIsValid) {
    alert("Formulário enviado com sucesso!");
    form.submit();
  }
});

function isEmpty(value) {
  return value === "";
}

function nameIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O campo é obrigatório!";
    return validador;
  }
  if (value.length < 3) {
    validador.isValid = false;
    validador.errorMensagem = "O campo deve ter no mínimo 3 caracteres";
    return validador;
  }
  const regex = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
  if (!regex.test(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O campo deve conter apenas letras.";
  }
  return validador;
}

function telefoneIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  const regex = /^\(\d{2}\)\d{5}-\d{4}$/;
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O telefone é obrigatório!";
    return validador;
  }
  if (!regex.test(value)) {
    validador.isValid = false;
    validador.errorMensagem = "Digite o telefone no formato (00)00000-0000";
  }
  return validador;
}

function emailIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O e-mail é obrigatório!";
    return validador;
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(value)) {
    validador.isValid = false;
    validador.errorMensagem = "Digite um e-mail válido!";
  }
  return validador;
}

function rgIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O RG é obrigatório!";
    return validador;
  }
  return validador;
}

function cpfIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O CPF é obrigatório!";
    return validador;
  }
  return validador;
}

function dateIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "A data de nascimento é obrigatória!";
    return validador;
  }
  const year = new Date(value).getFullYear();
  if (year < 1920 || year > new Date().getFullYear()) {
    validador.isValid = false;
    validador.errorMensagem = "Data inválida!";
  }
  return validador;
}

function enderecoIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O endereço é obrigatório!";
    return validador;
  }
  if (value.length < 3) {
    validador.isValid = false;
    validador.errorMensagem = "O endereço deve ter no mínimo 3 caracteres";
  }
  return validador;
}

function cepIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O CEP é obrigatório!";
    return validador;
  }
  const regex = /^\d{5}-?\d{3}$/;
  if (!regex.test(value)) {
    validador.isValid = false;
    validador.errorMensagem = "Digite um CEP válido!";
  }
  return validador;
}

function cursoIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O curso é obrigatório!";
    return validador;
  }
  if (value.length < 3) {
    validador.isValid = false;
    validador.errorMensagem = "O curso deve ter no mínimo 3 caracteres";
  }
  return validador;
}

function anoConclusaoIsValid(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "O ano de conclusão é obrigatório!";
    return validador;
  }
  const regex = /^\d{4}$/;
  if (!regex.test(value)) {
    validador.isValid = false;
    validador.errorMensagem = "Digite um ano válido (somente números, ex: 2024).";
    return validador;
  }
  const ano = parseInt(value);
  const anoAtual = new Date().getFullYear();
  if (ano < 1900 || ano > anoAtual) {
    validador.isValid = false;
    validador.errorMensagem = `O ano deve estar entre 1900 e ${anoAtual}.`;
  }
  return validador;
}

function passwordIsSecure(value) {
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "A senha é obrigatória!";
    return validador;
  }
  const hasCapital = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  if (value.length < 8 || !hasCapital || !hasNumber || !hasSpecial) {
    validador.isValid = false;
    validador.errorMensagem = "A senha deve ter no mínimo 8 caracteres, com ao menos uma letra maiúscula, um número e um caractere especial.";
  }
  return validador;
}

function passwordMatch(value) {
  const password = document.getElementById("senha").value;
  const validador = { isValid: true, errorMensagem: null };
  if (isEmpty(value)) {
    validador.isValid = false;
    validador.errorMensagem = "A confirmação de senha é obrigatória!";
    return validador;
  }
  if (value !== password) {
    validador.isValid = false;
    validador.errorMensagem = "As senhas não coincidem!";
  }
  return validador;
}

const iconSenha = document.querySelectorAll(".icon_senha");
iconSenha.forEach((icon) => {
  icon.addEventListener("click", function () {
    const input = icon.parentElement.querySelector("input");
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye-slash");
    icon.classList.toggle("fa-eye");
  });
});