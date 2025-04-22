// Seleciona o formulário de despesas, a lista de despesas e o elemento que exibe o total
const form = document.getElementById('formulario-gasto');
const expenseList = document.getElementById('lista-gastos');
const totalExpense = document.getElementById('total-gastos');

// Array para armazenar as despesas
let expenses = [];

// Adiciona um evento ao formulário para capturar o envio
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página

    // Obtém os valores dos campos de nome e valor da despesa
    const name = document.getElementById('nome-gasto').value;
    const value = parseFloat(document.getElementById('valor-gasto').value);

    // Verifica se os campos foram preenchidos corretamente
    if (name && value) {
        // Cria um objeto de despesa e adiciona ao array
        const expense = { name, value };
        expenses.push(expense);

        // Atualiza a lista de despesas e o total
        updateExpenseList();
        updateTotal();

        // Reseta o formulário para limpar os campos
        form.reset();
    }
});

// Atualiza a lista de despesas exibida na tabela
function updateExpenseList() {
    expenseList.innerHTML = ''; // Limpa a lista atual

    // Itera sobre o array de despesas e cria uma linha para cada despesa
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td style="color: ${expense.value > 100 ? 'red' : 'black'};">${expense.value.toFixed(2)}</td>
            <td>
                <button onclick="editExpense(${index})">Editar</button>
                <button onclick="removeExpense(${index})">Remover</button>
            </td>
        `;
        expenseList.appendChild(row); // Adiciona a linha à tabela
    });
}

// Calcula e atualiza o valor total das despesas
function updateTotal() {
    // Soma os valores de todas as despesas no array
    const total = expenses.reduce((sum, expense) => sum + expense.value, 0);
    totalExpense.textContent = total.toFixed(2); // Exibe o total formatado
}

// Remove uma despesa do array e atualiza a lista e o total
function removeExpense(index) {
    expenses.splice(index, 1); // Remove a despesa pelo índice
    updateExpenseList(); // Atualiza a lista de despesas
    updateTotal(); // Atualiza o total
}

// Permite editar uma despesa existente
function editExpense(index) {
    const expense = expenses[index]; // Obtém a despesa pelo índice

    // Preenche os campos do formulário com os valores da despesa
    document.getElementById('nome-gasto').value = expense.name;
    document.getElementById('valor-gasto').value = expense.value;

    // Remove a despesa para que possa ser atualizada ao salvar
    removeExpense(index);
}
