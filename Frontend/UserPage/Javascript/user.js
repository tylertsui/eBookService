const getUser = () => {
    let user = {
        userID: sessionStorage.getItem("userID"),
        username: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email"),
        token: sessionStorage.getItem("token"),
        password: sessionStorage.getItem("password")
    }
    return user;
}

const toUpload = () => {
    window.location.replace("../../UploadPage/HTML/upload.html");
}

const toUser = () => {
    window.location.replace("../../AccountSetting/HTML/account.html");
}

const redirectToHome = () => {
    window.location.replace("../../LandingPage/HTML/index.html");
}

const pageNavigation = () => {
    let upload = document.getElementById("eb_upload");
    let user = document.getElementById("user_info_settings");
    upload.onclick = toUpload;
    user.onclick = toUser;
}

const checkUserForNull = (user) => {
    let isNull = false;
     Object.keys(user).forEach(key => {
       if (user[key] == null) {
        isNull = true;
       }
     });
     return isNull;
}

const signOut = () => {
    sessionStorage.clear();
    redirectToHome();
}

const user = getUser();

const main = () => {
    console.log(user);
    if (checkUserForNull(user)) {
        redirectToHome();
    }
    pageNavigation();
}

main();