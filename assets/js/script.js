var apiUri = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='Bruce_Willis'";

var getActorInfo = function() {
    fetch(apiUri)
    .then(function (response) {
        // request successful
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
            })
        }
    })
};
getActorInfo();