let upload_file = async (data) => {
    let file;
    let reader;
    let contents;

    try {
        file = document.getElementById("eBook").files[0];
        reader = new FileReader();
        let promise = new Promise((resolve, reject) => {
            reader.onload = () => {
                contents = reader.result;
                data["content"] = contents;
                resolve(contents);
            }
            reader.readAsText(file);
        });
        await promise;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without choosing an appropriate file!";
        Promise.reject();
    }
}

let upload_title = (data) => {
    try {
        let title = document.getElementById("title").value;
        if (title === "") {
            throw "Empty";
        }
        data["title"] = title;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without a title!";
    }
}

let upload_author = (data) => {
    try {
        let author = document.getElementById("author").value;
        if (author === "") {
            throw "Empty";
        }
        data["author"] = author;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without an author!";
    }
}

let upload_year = (data) => {
    try {
        let year = parseInt(document.getElementById("year").value);
        if (year === null) {
            throw "Empty";
        }
        data["publicationYear"] = year;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without a publication year!";
    }
}

let upload_genre = (data) => {
    try {
        let genre = document.getElementById("genre").value;
        if (genre === "") {
            throw "Empty";
        }
        data["genre"] = genre;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without an genre!";
    }
}

let check_values = (data) => {
    if (data["title"] === "" || data["author"] === "" || data["year"] === "" || data["contents"] ==="") {
        return false;
    } else {
        return true;
    }
}

let upload_call = (data) => {
    console.log("sending", data["contents"]);
}

let upload_function = async () => {
    let data = {
        title: "", 
        author: "", 
        publicationYear: null, 
        content: "",
        genre: "",
        uploader: "test1"};
    upload_title(data);
    upload_author(data);
    upload_year(data);
    upload_genre(data);
    await upload_file(data);
    if (check_values(data)) {
        // testing();
        uploadEBookToDB(data);
        // upload_call(data);
    }
    
}

const testing = () => {
    axios.get("http://localhost:8080")
    .then(res => console.log(JSON.stringify(res.data)))
    .catch(e => console.log("FIRST FAILED"))
}

const uploadEBookToDB = (body) => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjliYjA3MGI1NGQ1Mzc1NDhkN2NjOCIsImlhdCI6MTYwNjA4NTExMCwiZXhwIjoxNjA2MTcxNTEwfQ.rGjR4Qh6I9UWe26w_dePMXGHr5tD7jF_kQAmolSTSLY'
    // const header = {
    //     'Content-Type': 'application/json',
    //     'x-access-token': token
    // }
    axios({
        method: 'POST',
        url: "http://localhost:8080/api/eBookAdd",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        data: body
    })
    // axios.post("http://localhost:8080/api/eBookAdd", body, header)
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error)
    })
}

let main = () => {
    let button = document.getElementById("submit");
    button.innerHTML = "Submit";
    button.onclick = upload_function;
}

main();