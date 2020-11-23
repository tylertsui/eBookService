let email_nav = () => {
    window.location.replace("./email.html");
}

let username_nav = () => {
    window.location.replace("./username.html");
}

let password_nav = () => {
    window.location.replace("./password.html");
}

let page_navigation = () => {
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

let main = () => {
    page_navigation();
}

main();