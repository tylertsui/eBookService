const getFormData = () => {
    let user = {
        email: document.getElementById("email").value, 
        username: document.getElementById("username").value, 
        password: document.getElementById("password").value
    }
    return user;
}

const redirectToLanding = (msg) => {
    alert(msg);
    window.location.replace("../HTML/index.html");
}

const signUp = () => {
    let user = getFormData();
    let URL = `${BASE_URL}/api/auth/signup`;
    axios.post(URL, user).then(res => {
        console.log(res.data.message);
        redirectToLanding(res.data.message);
    }).catch(e => console.log(e));
}