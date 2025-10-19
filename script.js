let fruits = [];

function addFruit() {
    const input = document.getElementById('fruitInput');
    const fruitName = input.value.trim();
    
    if (fruitName) {
        fruits.push(fruitName);
        displayFruits();
        input.value = ''; 
    }
}

function displayFruits() {
    const fruitList = document.getElementById('fruitList');
    fruitList.innerHTML = '';

    fruits.forEach(fruit => {
        const li = document.createElement('li');
        li.textContent = fruit;
        
        if (fruit.toLowerCase().startsWith('a')) {
            li.classList.add('starts-with-a');
        }
        
        fruitList.appendChild(li);
    });
}

function clearFruits() {
    fruits = [];
    displayFruits();
}

document.getElementById('fruitInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addFruit();
    }
});


async function fetchUsers() {
    const loadingElement = document.getElementById('loading');
    const userListElement = document.getElementById('userList');
    
    try {
        // Show loading state
        loadingElement.style.display = 'block';
        userListElement.innerHTML = '';

        // Fetch users
        const response = await fetch('https://jsonplaceholder.typicode.com/users/');
        const users = await response.json();

        // Create and display user list
        const userTable = document.createElement('table');
        userTable.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>City</th>
            </tr>
        `;

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.company.name}</td>
                <td>${user.address.city}</td>
            `;
            userTable.appendChild(row);
        });

        userListElement.appendChild(userTable);

    } catch (error) {
        console.error('Error fetching users data:', error);
        userListElement.innerHTML = '<p style="color: red;">Error loading users data</p>';
    } finally {
        // Hide loading state
        loadingElement.style.display = 'none';
    }
}