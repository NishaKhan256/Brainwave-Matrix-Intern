document.addEventListener("DOMContentLoaded", () => {
    const balanceEl = document.getElementById("balance");
    const transactionList = document.getElementById("transaction-list");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const addTransactionBtn = document.getElementById("add-transaction");
    const searchInput = document.getElementById("search");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function updateBalance() {
        const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        balanceEl.textContent = `$${total.toFixed(2)}`;
    }

    function renderTransactions() {
        transactionList.innerHTML = "";
        transactions.forEach((transaction, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${transaction.description} - $${transaction.amount} `;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.addEventListener("click", () => deleteTransaction(index));
            
            li.appendChild(deleteBtn);
            transactionList.appendChild(li);
        });
        updateBalance();
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function addTransaction() {
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categoryInput.value;
    
        if (description === "" || isNaN(amount)) {
            alert("Please enter a valid description and amount.");
            return;
        }
    
        transactions.push({ description, amount, category });
    
        // Clear inputs
        descriptionInput.value = "";
        amountInput.value = "";
    
        renderTransactions();
    }
    

    function deleteTransaction(index) {
        transactions.splice(index, 1);
        renderTransactions();
    }

    function filterTransactions() {
        const searchTerm = searchInput.value.toLowerCase();
        transactionList.innerHTML = "";
        transactions.filter(t => t.description.toLowerCase().includes(searchTerm)).forEach((transaction, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${transaction.description} - $${transaction.amount} `;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.addEventListener("click", () => deleteTransaction(index));
            
            li.appendChild(deleteBtn);
            transactionList.appendChild(li);
        });
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        const icon = darkModeToggle.querySelector("i");
    
        if (document.body.classList.contains("dark-mode")) {
            icon.classList.replace("fa-sun", "fa-moon");
        } else {
            icon.classList.replace("fa-moon", "fa-sun");
        }
    }
    

    addTransactionBtn.addEventListener("click", addTransaction);
    searchInput.addEventListener("input", filterTransactions);
    darkModeToggle.addEventListener("click", toggleDarkMode);

    renderTransactions();
});
