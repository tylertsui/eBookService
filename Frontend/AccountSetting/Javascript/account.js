const email_nav = () => {
    window.location.replace("./email.html");
}

const username_nav = () => {
    window.location.replace("./username.html");
}

const password_nav = () => {
    window.location.replace("./password.html");
}

const page_navigation = () => {
    let password = document.getElementById("password_change");
    let username = document.getElementById("username_change");
    let email = document.getElementById("email_change");

    password.innerHTML = "Change Password";
    password.onclick = password_nav;
    username.innerHTML = "Change Username";
    username.onclick = username_nav;
    email.innerHTML = "Change Email";
    email.onclick = email_nav;
}

const page_populate = () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjliYjA3MGI1NGQ1Mzc1NDhkN2NjOCIsImlhdCI6MTYwNjA4NTExMCwiZXhwIjoxNjA2MTcxNTEwfQ.rGjR4Qh6I9UWe26w_dePMXGHr5tD7jF_kQAmolSTSLY';
    let id = '5fb9b7510b54d537548d7cc3';
    let user;
    axios({
        method: 'GET',
        url: "http://localhost:8080/api/users",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }).then(response => {
        console.log(JSON.stringify(response.data))
        for(let i = 0; i < response.data.users.length; i++) {
            if (response.data.users[i]._id == id) {
                user = response.data.users[i];
                break;
            }
        }
        let user_div = document.getElementById("account_info_area");
        let user_name = document.createElement("p");
        let email = document.createElement("p");
        user_name.innerHTML = `Username: ${user.username}`;
        email.innerHTML = `Email: ${user.email}`;
        user_div.appendChild(user_name);
        user_div.appendChild(email);
    }).catch(error => {
        console.log(error)
    })
}

const main = () => {
    page_navigation();
    page_populate();
}

main();