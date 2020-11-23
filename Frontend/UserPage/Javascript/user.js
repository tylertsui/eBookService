const user = getUser();

const getUser = () => {
    let user = {
        userID: sessionStorage.getItem("userID"),
        username: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email"),
        token: sessionStorage.getItem("token")
    }
    return user;
}

const toUpload = () => {
    window.location.replace("../../UploadPage/HTML/upload.html");
}

const toUser = () => {
    window.location.replace("../../AccountSetting/HTML/account.html");
}

const pageNavigation = () => {
    let upload = document.getElementById("eb_upload");
    let user = document.getElementById("user_info_settings");
    upload.onclick = toUpload;
    user.onclick = toUser;
    
}

const main = () => {
        pageNavigation();
}

main();