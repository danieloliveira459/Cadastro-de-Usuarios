document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const dateInput = document.getElementById("date");
    const emailInput = document.getElementById("email");
    const menssageText = document.getElementById("menssageText");
    const userlist = document.getElementById("userlist");
    const modal = document.getElementById("modalDetalhes");
    const modalContent = document.getElementById("modalContent");
    const fecharModal = document.getElementById("fecharModal")

    function exibirUsuarios() {
        userlist.innerHTML = '';
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) ||[];
        

        usuarios.forEach((usuario, index) => {
            const li = document.createElement("li");
            li.textContent = `Nome: ${usuario.name} Idade: ${usuario.age} Data: ${usuario.date} Email: ${usuario.email}`;

            li.addEventListener("click", () => {
                modalContent.innerHTML = `
                    <p><strong>Nome:</strong> ${usuario.name}</p>
                    <p><strong>Idade:</strong> ${usuario.age}</p>
                    <p><strong>Data:</strong> ${usuario.date}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                `;
                modal.showModal();
            });
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Remover";
            deleteButton.addEventListener("click", (event) => { // Adicione aqui o código para remover o usuário ou limpar a lista
                usuarios.splice(index, 1);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                exibirUsuarios();
            });

            li.appendChild(deleteButton);
            userlist.appendChild(li);
        });
    }
    
    // Mova o restante do código para dentro do callback do DOMContentLoaded
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const age = ageInput.value.trim();
        const date = dateInput.value.trim();
        const email = emailInput.value.trim();

        if (!name || !age || !date || !email) {
            menssageText.textContent = "por favor, preencha todos os campos.";
            return;
        }
        if (parseInt(age) < 18) {
            menssageText.textContent = "A idade mínima é 18 anos.";
            return;
        }

        // Se passou nas validações, salva o usuário
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push({ name, age, date, email });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        menssageText.textContent = "Usuário cadastrado com sucesso!";
        setTimeout(() => {
            menssageText.textContent = '';
        }, 3000);

        // Limpa os campos
        form.reset();

        // Atualiza a lista de usuários
        exibirUsuarios();
    });

    // Exibe os usuários ao carregar a página
    exibirUsuarios();
    fecharModal.addEventListener("click", () => {
        modal.close();
    })
});

                   
      
    
      


