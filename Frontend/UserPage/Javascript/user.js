const toUpload = () => {
    window.location.replace("../../UploadPage/HTML/upload.html");
}

const toUser = () => {
    window.location.replace("../../AccountSetting/HTML/account.html");
}

const display_results = (data) => {
    document.getElementById("search_results").innerHTML = data[0];
}

const search_by_title = (title) => {
    let token = sessionStorage.getItem("token");
    console.log(title);
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/title/${title}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_genre = (genre) => {
    let token = sessionStorage.getItem("token");
    console.log(genre);
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/genre/${genre}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_author = (author) => {
    let token = sessionStorage.getItem("token");
    console.log(author);
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/author/${author}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_year = (year) => {
    let token = sessionStorage.getItem("token");
    console.log(year);
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/year/${year}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_user = () => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/uploader`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_function = () => {
    let search = document.getElementById("eb_search").value;
    let search_option = document.getElementById("title").value;

    if (search_option == "title") {
        search_by_title(search);
    } else if (search_option == "genre") {
        search_by_genre(search);
    } else if (search_option == "author") {
        search_by_author(search);
    } else if (search_option == "year") {
        search_by_year(search);
    }
}

const pageNavigation = () => {
    let upload = document.getElementById("eb_upload");
    let user = document.getElementById("user_info_settings");
    let submit = document.getElementById("eb_submit");
    let user_search = document.getElementById("eb_user_search");

    upload.onclick = toUpload;
    user.onclick = toUser;
    submit.onclick = search_function;
    user_search.onclick = search_by_user;
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