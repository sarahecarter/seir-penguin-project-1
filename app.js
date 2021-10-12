const url = "https://cdn.contentful.com/spaces/unul3en2jtfl/environments/master/entries?access_token=YIweag8-CCwmyLDQiTXz5O1Zvf-LsVDbckGQC0y-J2A&content_type=triviaq";

$.ajax(url)
.then((data) => {
    console.log(data);
})