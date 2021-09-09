const baseUrl = "https://dummyapi.io/data/v1";
const appKey = "613757bd2b9748529e4fa228";

function GetUsers() {
  var xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var users = JSON.parse(this.responseText).data;

      var divContent = document.getElementById("divContent");
      for (var i = 0; i < users.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "contentPart1");
        div.innerHTML = `<div class='rightPartLeft'><img src='${
          users[i].picture
        }'></div>
                    <div class='rightPartRight'> ${users[i].id}
                        <br /><span><b><a href='/profile.html?userid=${
                          users[i].id
                        }'>${
          users[i].title + " " + users[i].firstName + " " + users[i].lastName
        } </a></b></span>
                    </div>
                    <div class='clear'></div>`;
        divContent.append(div);
      }
    }
  };
  xHttp.open("GET", baseUrl + "/user", true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}

function GetUserDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userid");

  var xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var userDetail = JSON.parse(this.responseText);

      //Image
      var leftImageContainer = document.getElementsByClassName("leftImage")[0];

      var img = document.createElement("img");
      img.setAttribute("src", userDetail.picture);
      leftImageContainer.append(img);

      var leftImageName = document.getElementsByClassName("imageName")[0];
      var span = document.createElement("span");
      span.innerText = userDetail.title + ". " +  userDetail.firstName +" "+ userDetail.lastName;
      leftImageName.append(span);

      //Details
    }
  };
  xHttp.open("GET", baseUrl + `/user/${userId}`, true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}

function GetUserPosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userid");

  var xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var userDetail = JSON.parse(this.responseText);

      //Image
      var leftImageContainer = document.getElementsByClassName("leftImage")[0];
      var img = document.createElement("img");
      img.setAttribute("src", userDetail.picture);
      leftImageContainer.append(img);

      //Details
    }
  };
  xHttp.open("GET", baseUrl + `/user/${userId}`, true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}

function GetPosts(postUrl) {
  // const urlParams = new URLSearchParams(window.location.search);
  // const userId = urlParams.get('userid');

  var xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {  
      var response = JSON.parse(this.responseText);
      var limit = response.limit;
      var total = response.total;
      if (document.getElementsByClassName("contentHeading").length>0) {
        document.getElementsByClassName(
          "contentHeading"
        )[0].innerText = `Showing ${limit} of ${total} results...`;
      }
      
     
      console.log(response.data);
      var posts = response.data;
      var divContent = document.getElementById("content");
      for (var index = 0; index < posts.length; index++) {
        var post = posts[index];
        console.log(post);
        var div = document.createElement("div");
        div.setAttribute("class", "contentPart1");
        div.innerHTML = `<div class="contentTop"><img src="${post.owner.picture}" width="40" height="40"></div>
                    <div class="contentTopRight"> <a href="/profile.html?userid=${post.owner.id}"> ${post.owner.title}. ${post.owner.firstName} ${post.owner.lastName}</a>
                        <br />
                      ${post.publishDate}
                    </div>
                    <div class="clear"></div>
                    <div class="rightPartLeft"><img src="${post.image}" width="200"
                            height="200"></div>
                    <div class="rightPartRight"> <span class="cS">${post.publishDate}</span>
                        <br /><span class="changeStyle">${post.text}</span><br /><br>
                        <span class="pinkButton"><button>animals</button>
                            <button>dog</button>
                            <button>golden retriever</button></span>
                        <br>
                        <div class="like">
                            <i class="far fa-thumbs-up"></i><span class="blue">&nbsp;&nbsp;&nbsp;${post.likes}</span>
                        </div>

                    </div>

                    <div class="clear"></div>`;
        divContent.append(div);
      }
    }
  };

  xHttp.open("GET", baseUrl + postUrl, true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}

function GetUserFullDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userid");

  var xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      //call back method
      var userDetail = JSON.parse(this.responseText);



      var postByUserName = document.getElementsByClassName("postByUserName")[0];
      postByUserName.innerHTML = `<b class="heading">
      Posts <span class="by">by
      </span>${userDetail.firstName} 
      ${userDetail.lastName}</b><br />`;


      var divContent = document.getElementById("topContent");

      console.log(userDetail);
      var div = document.createElement("div");
      div.setAttribute("class", "divTopContentChild");
      div.innerHTML = ` 
                    <div class="topLeft">
                        <div class="topLeft1">
                            <span class="tC1">${userDetail.title}. ${userDetail.firstName} ${userDetail.lastName}</span><br />
                            <span class="tC2">Gender:</span>
                            <span class="tC3">${userDetail.gender}</span>
                            <br /><span class="tC2">Date of birth:</span>
                            <span class="tC3">${userDetail.dateOfBirth}</span>
                            <br /><span class="tC2">Register date:</span>
                            <span class="tC3">${userDetail.registerDate}</span>


                        </div>
                        <div class="topLeft2">
                            <span class="tC2">Email:</span>
                            <span class="tC3">${userDetail.email}</span>
                            <br /><span class="tC2">phone:</span>
                            <span class="tC3">${userDetail.phone}</span>



                        </div>
                    </div>
                    <div class="topRight"></div>
                    <span class="tC2">Address</span>
                    <br /><span class="tC2">State:</span>
                    <span class="tC3">${userDetail.location.state}</span>
                    <br /><span class="tC2">Street:</span>
                    <span class="tC3">${userDetail.location.street}</span>
                    <br /><span class="tC2">City:</span>
                    <span class="tC3">${userDetail.location.city}</span>
                    <br /><span class="tC2">Country:</span>
                    <span class="tC3">${userDetail.location.country}</span>
                    <br /><span class="tC2">Timezone:</span>
                    <span class="tC3">${userDetail.location.timezone}</span>
                    <div class="clear"></div>
                `;
      divContent.append(div);
    }
  };

  xHttp.open("GET", baseUrl + `/user/${userId}`, true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send(); //request
}

function GetPostsByUserID() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userid");
  var postByUserUrl = `/user/${userId}/post`;
  GetPosts(postByUserUrl);
}

function GetAllPosts() {
  var postUrl = "/post";
  GetPosts(postUrl);
}




function GetLatestPostsByUserId() {
  var xHttp = new XMLHttpRequest();
xHttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response.data);
    var posts = response.data;

    var divLeft = document.getElementsByClassName("leftMiddle")[0];
    for (var index = 0; index < posts.length; index++) {
      var post = posts[index];
      console.log(post);
      var div = document.createElement("div");
      div.setAttribute("class", "left1"); //<div class="left1"> </div>

      div.innerHTML = `<div class="leftPart1">${post.text}</div>
            <div class="leftPart2">
            ${post.owner.title}. ${post.owner.firstName} ${post.owner.lastName}<br/>
              <span> ${post.publishDate}</span>
            </div>`;
      divLeft.append(div);
    }
  }
};

  xHttp.open("GET", baseUrl + "/post?orderby=publishdate&page=0&limit=10", true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}