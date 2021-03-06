window.onload = function () {
    getSonglist();
    getPlayList();
     document.getElementById('username').innerText=sessionStorage.getItem('username');
    const logout = document.getElementById('logout');
    const search = document.getElementById("btn-search")

    search.addEventListener('click', function () {
        let searchInput = document.getElementById("input-search").value;
        if (searchInput == '' || searchInput == ' ') {
            searchInput = undefined;
        }
        if (searchInput != undefined) {
            let dataTable = document.getElementById('song-table');
            fetch(`http://localhost:9999/songs?songName=${searchInput}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': sessionStorage.getItem("token"),
                },
            })
                .then((response) => {
                    if (response.status == 500) {
                        throw Error("Sorry, something went wrong!!!")
                    } else {
                        return response.json();
                    }
                })
                .then((json) => {
                    let tableHeaderRowCount = 1;
                    let rowCount = dataTable.rows.length;
                    for (let i = tableHeaderRowCount; i < rowCount; i++) {
                        dataTable.deleteRow(tableHeaderRowCount);
                    }
                    console.log(json);
                    const tblData = json;
                    console.log(tblData[0])
                    if (tblData.length > 0) {
                        for (let i = 0; i < tblData.length; i++) {
                            dataTable.innerHTML += "<tr><td>" + tblData[i].id + "</td>" +
                                "<td>" + tblData[i].title + "</td>" +
                                "<td>" + tblData[i].releaseDate + "</td>" +
                                "<td><button id='add' onclick='addSong(this)'>Add</button></td>" +
                                "</tr>"
                        }
                    } else {
                        dataTable.innerHTML = '<p>Sorry,Song Not Found!!!</p>';
                    }
                }).catch(error => {
                console.log(error)
            });
        }
    });

    logout.addEventListener('click', function () {
        sessionStorage.clear();
        location.replace('./main.html')
    })


    function getSonglist() {
        let dataTable = document.getElementById('song-table');
        fetch('http://localhost:9999/songs', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'token': sessionStorage.getItem("token"),
            },
        })
            .then((response) => {
                if (response.status == 500) {
                    throw Error("Sorry, something went wrong!!!")
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                console.log(json);
                const tblData = json;
                console.log(tblData[0])
                if (tblData.length > 0) {
                    for (let i = 0; i < tblData.length; i++) {
                        dataTable.innerHTML += "<tr><td>" + tblData[i].id + "</td>" +
                            "<td>" + tblData[i].title + "</td>" +
                            "<td>" + tblData[i].releaseDate + "</td>" +
                            "<td><button id='add' onclick='addSong(this)'>Add</button></td>" +
                            "</tr>"
                    }
                } else {
                    dataTable.innerHTML = '<p>Sorry,Song Not Found!!!</p>';
                }

            }).catch(error => {
            console.log(error)
        });
    }

    function getPlayList() {
        let dataTable = document.getElementById('playlist-table');
        console.log("inside playlist");
        fetch('http://localhost:9999/playList', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'token': sessionStorage.getItem("token"),
            },
        })
            .then((response) => {
                if (response.status == 500) {
                    throw Error("Sorry, something went wrong!!!")
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                console.log(json);
                const tblData = json;
                console.log(tblData)

                if (tblData.length > 0) {
                    for (let i = 0; i < tblData.length; i++) {
                        dataTable.innerHTML += "<tr><td>" + tblData[i].songId + "</td>" +
                            "<td>" + tblData[i].title + "</td>" +
                            "<td>" + tblData[i].releaseDate + "</td>" +
                            "<td><button id='remove' onclick='removeSong(this)'>Delete</button>" +
                            "<button id='play' >Play</button></td>" +
                            "</tr>"
                    }
                } else {
                    dataTable.innerHTML = '<p>No Songs in your playlist</p>';
                }

            }).catch(error => {
            console.log(error)
        });
    }
}


