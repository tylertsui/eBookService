const navigate_user = () => {
    window.location.replace("../../Userpage/HTML/user.html");
}

const navigate_edit = () => {
    window.location.replace("../../EBookEdit/HTML/ebedit.html");
}

const page_populate = () => {
    let ebook = {
        title: sessionStorage.getItem("title"),
        author: sessionStorage.getItem("author"),
        year: sessionStorage.getItem("year"),
        content: sessionStorage.getItem("content"),
        genre: sessionStorage.getItem("genre")
    }
    let navigate_return = document.getElementById("nav_back");
    let edit_ebook = document.getElementById("edit");

    document.getElementById("title").innerHTML = `Title: ${ebook.title}`;
    document.getElementById("author").innerHTML = `Author: ${ebook.author}`;
    document.getElementById("genre").innerHTML = `Genre: ${ebook.genre}`;
    document.getElementById("year").innerHTML = `Published on: ${ebook.year}`;
    document.getElementById("ebook_contents").innerHTML = ebook.content;

    navigate_return.onclick = navigate_user;
    navigate_return.innerHTML = "Return";

    edit_ebook.onclick = navigate_edit;
    edit_ebook.innerHTML = "Edit EBook";
}

const main = () => {
    let user = getUser();
    if (checkUserForNull(user)) {
        redirectToHome();
    }
    page_populate();
}

main();