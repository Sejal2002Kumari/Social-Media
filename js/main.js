const baseUrl = "https://dummyapi.io/data/v1";
const appKey = "61658cba69b83795448792c2";

function GetUsers(url) {
  var xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var users = response.data;
      var limit = response.limit;
      var total = response.total;
      var numberOfButton = total / limit;
      if (document.getElementsByClassName("contentHeading").length > 0) {
        document.getElementsByClassName(
          "contentHeading"
        )[0].innerText = `Showing ${limit} of ${total} results...`;
      }

      var divContentInner = document.getElementById("divContentInner");
      var tempDiv = document.createElement("div");
      for (var i = 0; i < users.length; i++) {
        var div = getSingleUserBlock(users[i]);

        tempDiv.append(div);
      }
      divContentInner.innerHTML = tempDiv.innerHTML;
      buttonsForNewPagesUser(numberOfButton);
    }
  };
  xHttp.open("GET", baseUrl + url, true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}

function getSingleUserBlock(user) {
  var div = document.createElement("div");
  div.setAttribute("class", "contentPart1");
  div.innerHTML = `<div class='rightPartLeft'><img src='${user.picture}'></div>
                    <div class='rightPartRight'> ${user.id}
                        <br /><span><b><a href='/profile.html?userid=${
                          user.id
                        }'>${
    user.title + " " + user.firstName + " " + user.lastName
  } </a></b></span>
                    </div>
                    <div class='clear'></div>`;
  return div;
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
      span.innerText =
        userDetail.title +
        ". " +
        userDetail.firstName +
        " " +
        userDetail.lastName;
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
      var numberOfButton = total / limit;
      if (document.getElementsByClassName("contentHeading").length > 0) {
        document.getElementsByClassName(
          "contentHeading"
        )[0].innerText = `Showing ${limit} of ${total} results...`;
      }

      // console.log(response.data);
      var posts = response.data;
      var divContentInner = document.getElementById("divContentInner");
      var tempDIV = document.createElement("div");
      for (var index = 0; index < posts.length; index++) {
        var post = posts[index];
        // console.log(post, "hello__________________________");

        tempDIV.append(getSinglePostBlock(post));
      }
      divContentInner.innerHTML = tempDIV.outerHTML;
      buttonsForNewPages(numberOfButton);
    }
  };

  xHttp.open("GET", baseUrl + postUrl, true);
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}

function getSinglePostBlock(post) {
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
  return div;
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

      // console.log(userDetail, "-----------------------------------");
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
      // console.log(response.data);
      var posts = response.data;

      var divLeft = document.getElementsByClassName("leftMiddle")[0];
      for (var index = 0; index < posts.length; index++) {
        var post = posts[index];
        // console.log(post);
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

  xHttp.open(
    "GET",
    baseUrl + "/post?orderby=publishdate&page=0&limit=10",
    true
  );
  xHttp.setRequestHeader("app-id", appKey);
  xHttp.send();
}

function buttonsForNewPages(numberOfButton) {
  var divContentPaging = document.getElementById("divContentPaging");
  numberOfButton =
    Math.round(numberOfButton) > numberOfButton
      ? Math.round(numberOfButton)
      : Math.round(numberOfButton) + 1;
  var div = document.createElement("div");
  div.setAttribute("class", "divClass");
  for (let i = 1; i <= numberOfButton; i++) {
    var button = document.createElement("button");
    button.setAttribute("class", "buttonToChangePage");
    button.innerText = i;
    // button.style.width = "50%";

    button.addEventListener("click", (event) => {
      var pageNumber = event.target.innerText;
      var postUrl = `/post?page=${pageNumber - 1}&limit=20`;
      GetPosts(postUrl);
    });

    div.append(button);
  }
  if (divContentPaging.childNodes.length > 0) {
    divContentPaging.removeChild(divContentPaging.childNodes[0]);
  }
  divContentPaging.append(div);
}

function buttonsForNewPagesUser(numberOfButton) {
  var divContentPaging = document.getElementById("divContentPaging");
  numberOfButton =
    Math.round(numberOfButton) > numberOfButton
      ? Math.round(numberOfButton)
      : Math.round(numberOfButton) + 1;
  var div = document.createElement("div");
  div.setAttribute("class", "divClass");
  for (let i = 1; i <= numberOfButton; i++) {
    var button = document.createElement("button");
    button.setAttribute("class", "buttonToChangePage");
    button.innerText = i;
    // button.style.width = "50%";

    button.addEventListener("click", (event) => {
      var pageNumber = event.target.innerText;
      var UserUrl = `/user?page=${pageNumber - 1}&limit=20`;
      GetUsers(UserUrl);
    });

    div.append(button);
  }
  if (divContentPaging.childNodes.length > 0) {
    divContentPaging.removeChild(divContentPaging.childNodes[0]);
  }
  divContentPaging.append(div);
}

var userArray = [];
var postsArray = [];
function searchUser(url) {
  // console.log(url);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", baseUrl + url, true);
  xhr.setRequestHeader("app-id", appKey);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var response = JSON.parse(xhr.responseText);
      var page = response.page;
      if (response.data != null && response.data.length > 0) {
        // console.log("r----------",page);
        userArray = userArray.concat(response.data);
        searchUser(`/user?page=${page + 1}&limit=50&created=0`);
      } else {
        console.log(
          userArray.length,
          userArray,
          "---------------------userarray---------------"
        );
      }
    }
  };
  xhr.onerror = function () {
    // console.log(this.responseText);
  };
  xhr.send();
}
setTimeout(function () {
  searchUser("/user?page=0&limit=50&created=0");
  searchPost("/post?page=0&limit=50&created=0");
}, 5000);

function searchPost(postUrl) {
  // console.log(postUrl);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", baseUrl + postUrl, true);
  xhr.setRequestHeader("app-id", appKey);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var response = JSON.parse(xhr.responseText);
      var page = response.page;
      if (response.data != null && response.data.length > 0) {
        // console.log("r----------rrrrr", page);
        postsArray = postsArray.concat(response.data);
        searchPost(`/post?page=${page + 1}&limit=50&created=0`);
      } else {
        console.log(
          postsArray.length,
          postsArray,
          "---------------------postsArray---------------"
        );
      }
    }
  };
  xhr.onerror = function () {
    console.log(this.responseText);
  };
  xhr.send();
}

function searchFun() {
  const urlParams = new URLSearchParams(window.location.search); //querry string 
  const searchParams = urlParams.get("search");
  console.log(searchParams);

  document.getElementsByClassName("box")[0].value = searchParams;
  setTimeout(function () {
    const filteredUserArray = userArray.filter(
      (singleUserData) =>
        singleUserData.firstName
          .toLowerCase()
          .includes(searchParams.toLowerCase()) ||
        singleUserData.lastName
          .toLowerCase()
          .includes(searchParams.toLowerCase()) ||
        singleUserData.id == searchParams
    );
    console.log(filteredUserArray);

    const filteredPostArray = postsArray.filter(
      ({ id, tags, text, owner }) =>
        id == searchParams ||
        tags.includes(searchParams.toLowerCase()) ||
        text.toLowerCase().includes(searchParams.toLowerCase()) ||
        owner.firstName.toLowerCase().includes(searchParams.toLowerCase()) ||
        owner.lastName.toLowerCase().includes(searchParams.toLowerCase()) ||
        owner.id == searchParams
    );
    console.log(filteredPostArray);
    populateSearchedData(filteredUserArray, filteredPostArray);
  }, 50000);
}

document
  .getElementsByClassName("search")[0]
  .addEventListener("click", function () {
    var ab = document.getElementsByClassName("box")[0].value;
    if (ab.trim() == "") {
      alert("Enter some data");
    } else {
      location.replace(`/search.html?search=${ab}`);
    }
  });

function populateSearchedData(filteredUserArray, filteredPostArray) {
  document.getElementsByClassName("contentHeading")[0].innerText = `Found ${
    filteredUserArray.length == 0
      ? ""
      : filteredUserArray.length == 1
      ? filteredUserArray.length + " User"
      : filteredUserArray.length + " Users"
  }  ${filteredUserArray.length > 0 && filteredPostArray > 0 ? "and" : ""} ${
    filteredPostArray.length == 0
      ? ""
      : filteredPostArray.length == 1
      ? filteredPostArray.length + " Post"
      : filteredPostArray.length + " Posts"
  }`;
  filteredUserArray.forEach((element) => {
    document
      .getElementById("divContentUser")
      .append(getSingleUserBlock(element));
  });
  filteredPostArray.forEach((element) => {
    document
      .getElementById("divContentPost")
      .append(getSinglePostBlock(element));
  });
}
