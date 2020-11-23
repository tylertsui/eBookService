
let to_upload = () => {
    window.location.replace("../../UploadPage/HTML/upload.html");
}

let to_user = () => {
    window.location.replace("../../AccountSetting/HTML/account.html");
}

let page_navigation = () => {
    let upload = document.getElementById("eb_upload");
    let user = document.getElementById("user_info_settings");
    upload.onclick = to_upload;
    user.onclick = to_user;
    
}

let main = () => {
    page_navigation();
}

main();