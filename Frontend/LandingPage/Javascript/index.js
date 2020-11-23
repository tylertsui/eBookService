const getFormData = () => {
    let user = {
        username: document.getElementById("username").value, 
        password: document.getElementById("password").value
    }
    return user;
}

const redirectToHome = () => {
    window.location.replace("../../UserPage/HTML/user.html");
}

const setSessionStorage = (user) => {
    let role = "user";
    if (user.roles.length > 1) {
        role = "admin"
    }
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("userID", user.id);
    sessionStorage.setItem("token", user.accessToken);
    sessionStorage.setItem("role", role);
}

const login = () => {
    let user = getFormData();
    let URL = `${BASE_URL}/api/auth/signin`;
    axios.post(URL, user).then(res => {
        console.log(res.data);
        setSessionStorage(res.data);
        redirectToHome();
    }).catch(e => {
        console.log(e.response.data.message)
        alert(e.response.data.message);
    });
}