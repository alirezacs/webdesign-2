let showUsers = (users) => {
    let list = document.getElementById('list');

    list.innerHTML = "";
    
    users.map(user => {
        list.innerHTML += `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="avatar">LG</div>
                        <div>
                            <strong>${user.name}</strong>
                            <small>ID: #${user.id}</small>
                        </div>
                    </div>
                </td>

                <td>
                    <span class="username">@${user.username}</span>
                </td>

                <td>
                    <a href="mailto:${user.email}">
                        ${user.email}
                    </a>
                </td>

                <td>
                    <strong>${user.address.city}</strong>
                    <small>${user.address.street}, ${user.address.suite}</small>
                </td>

                <td>${user.phone}</td>

                <td>
                    <strong>${user.company.name}</strong>
                    <small>${user.company.catchPhrase}</small>
                </td>

                <td>
                    <a href="https://hildegard.org" target="_blank">
                        ${user.website}
                    </a>
                </td>

                <td>
                    <div class="actions">
                        <button class="view" title="View">👁</button>
                        <button class="edit" title="Edit">✏️</button>
                        <button class="delete" title="Delete">🗑</button>
                    </div>
                </td>
            </tr>
        `        
    })
}

let getUsers = async (callback) => {
    let request = await fetch("https://jsonplaceholder.typicode.com/users");

    let users = await request.json();
    
    callback(users);
}

getUsers(showUsers);