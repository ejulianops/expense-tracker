// // Variables to reference key elements in our HTML
// const expenseDescriptionInput = document.getElementById('expense-description');
// const expenseAmountInput = document.getElementById('expense-amount');
// const expenseCategoryInput = document.getElementById('expense-category');
// const transactionList = document.getElementById('transaction-history');
// const totalExpensesElement = document.getElementById('total-expenses');
// const totalIncomeElement = document.getElementById('total-income');
// const balanceElement = document.getElementById('balance');

// // Adding an Income
// function addIncome() {
//     const description = document.getElementById('income-description').value.trim();
//     const amount = parseFloat(document.getElementById('income-amount').value.trim());

//     if (description === '' || isNaN(amount) || amount <= 0) {
//         alert('Please enter a valid income description and amount.');
//         return;
//     }

//     addTransaction(description, amount, 'Income');
//     updateSummary();
//     clearIncomeInputs();
// }

// // Adding an Expense
// function addExpense() {
//     const description = expenseDescriptionInput.value.trim();
//     const amount = parseFloat(expenseAmountInput.value.trim());
//     const category = expenseCategoryInput.value;

//     if (description === '' || isNaN(amount) || amount <= 0) {
//         alert('Please enter a valid expense description and amount.');
//         return;
//     }

//     addTransaction(description, amount, category);
//     updateSummary();
//     clearExpenseInputs();
// }

// function addTransaction(description, amount, type) {
//     const transactionRow = document.createElement('tr');

//     transactionRow.innerHTML = `
//         <td>${description}</td>
//         <td>${type === 'Income' ? 'Income' : expenseCategoryInput.value}</td>
//         <td>${amount.toFixed(2)}</td>
//         <td>${type}</td> <!-- Now dynamically shows 'Income' or 'Expense' -->
//         <td><button class="delete-btn">Delete</button></td>
//     `;

//     transactionList.appendChild(transactionRow);

//     // Add event listener to delete button
//     transactionRow.querySelector('.delete-btn').addEventListener('click', function() {
//         transactionRow.remove();
//         updateSummary();
//     });
// }

// // Updating the Summary
// function updateSummary() {
//     let totalExpenses = 0;
//     let totalIncomes = 0;

//     const transactions = transactionList.querySelectorAll('tr');

//     transactions.forEach(function(transaction) {
//         const amount = parseFloat(transaction.children[2].textContent);
//         const type = transaction.children[3].textContent;

//         if (type === 'Income') {
//             totalIncomes += amount;
//         } else {
//             totalExpenses += amount;
//         }
//     });

//     totalExpensesElement.textContent = totalExpenses.toFixed(2);
//     totalIncomeElement.textContent = totalIncomes.toFixed(2);
//     balanceElement.textContent = (totalIncomes - totalExpenses).toFixed(2);
// }

// // Clearing Income Form Inputs
// function clearIncomeInputs() {
//     document.getElementById('income-description').value = '';
//     document.getElementById('income-amount').value = '';
// }

// // Clearing Form Inputs
// function clearExpenseInputs() {
//     expenseDescriptionInput.value = '';
//     expenseAmountInput.value = '';
//     expenseCategoryInput.value = 'Housing';  // default category
// }


// Variables to reference key elements in our HTML
const expenseDescriptionInput = document.getElementById('expense-description');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseAccountInput = document.getElementById('expense-account');
const transactionList = document.getElementById('transaction-history');
const totalExpensesElement = document.getElementById('total-expenses');
const totalIncomeElement = document.getElementById('total-income');
const balanceElement = document.getElementById('balance');

// Adding an Income
function addIncome() {
    const description = document.getElementById('income-description').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value.trim());
    const category = document.getElementById('income-category').value;
    const account = document.getElementById('income-account').value; // Capture income account

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount, 'Income', category, account);
    updateSummary();
    clearIncomeInputs();
}

// Adding an Expense
function addExpense() {
    const description = expenseDescriptionInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    const category = expenseCategoryInput.value;
    const account = expenseAccountInput.value; // Capture expense account

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount, 'Expense', category, account);
    updateSummary();
    clearExpenseInputs();
}

function addTransaction(description, amount, type, category, account) {
    const transactionRow = document.createElement('tr');

    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td>${account}</td> <!-- Display the account -->
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionList.appendChild(transactionRow);

    // Add event listener to delete button
    transactionRow.querySelector('.delete-btn').addEventListener('click', function() {
        transactionRow.remove();
        updateSummary();
    });
}

// Updating the Summary
function updateSummary() {
    let totalExpenses = 0;
    let totalIncomes = 0;

    const transactions = transactionList.querySelectorAll('tr');

    transactions.forEach(function(transaction) {
        const amount = parseFloat(transaction.children[2].textContent);
        const type = transaction.children[3].textContent;

        if (type === 'Income') {
            totalIncomes += amount;
        } else {
            totalExpenses += amount;
        }
    });

    totalExpensesElement.textContent = totalExpenses.toFixed(2);
    totalIncomeElement.textContent = totalIncomes.toFixed(2);
    balanceElement.textContent = (totalIncomes - totalExpenses).toFixed(2);
}

// Clearing Income Form Inputs
function clearIncomeInputs() {
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
    document.getElementById('income-category').value = 'Salary'; // Reset to default
    document.getElementById('income-account').value = 'Current'; // Reset to default
}

// Clearing Expense Form Inputs
function clearExpenseInputs() {
    expenseDescriptionInput.value = '';
    expenseAmountInput.value = '';
    expenseCategoryInput.value = 'Housing'; // default category
    expenseAccountInput.value = 'Current'; // default account
}

// Clear All Transactions
function clearAll() {
    transactionList.innerHTML = '';
    updateSummary();
}
