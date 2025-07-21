document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const userList = document.getElementById('userlist');
  const messageText = document.getElementById('menssageText');
  const modal = document.getElementById('modalDetalhes');
  const modalContent = document.getElementById('modalContent');
  const fecharModal = document.getElementById('fecharModal');

  function carregarUsuarios() {
    fetch('/records')
      .then(res => res.json())
      .then(data => {
        userList.innerHTML = '';
        data.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${user.name}</strong> - ${user.email}
            <button onclick="mostrarDetalhes(${user.id})">Detalhes</button>
            <button onclick="deletarUsuario(${user.id})">Excluir</button>
          `;
          userList.appendChild(li);
        });
      })
      .catch(err => console.error('Erro ao carregar usuários:', err));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const novoUsuario = {
      name: form.name.value,
      age: form.age.value,
      date: form.date.value,
      email: form.email.value
    };

    fetch('/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    })
    .then(res => res.json())
    .then(data => {
      messageText.textContent = data.message;
      form.reset();
      carregarUsuarios();
    })
    .catch(err => {
      console.error('Erro ao cadastrar:', err);
      messageText.textContent = 'Erro ao cadastrar usuário.';
    });
  });

  window.mostrarDetalhes = function (id) {
    fetch('/records')
      .then(res => res.json())
      .then(data => {
        const user = data.find(u => u.id === id);
        if (user) {
          modalContent.innerHTML = `
            <p><strong>Nome:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Idade:</strong> ${user.age}</p>
            <p><strong>Nascimento:</strong> ${user.date}</p>
          `;
          modal.showModal();
        }
      });
  };

  fecharModal.addEventListener('click', () => modal.close());

  window.deletarUsuario = function (id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      fetch(`/records/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          messageText.textContent = data.message;
          carregarUsuarios();
        })
        .catch(err => {
          console.error('Erro ao excluir:', err);
          messageText.textContent = 'Erro ao excluir usuário.';
        });
    }
  };

  carregarUsuarios();
});
