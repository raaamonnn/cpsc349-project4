import * as mockroblog from './mockroblog.js'
// import stylesheets from 'tailwind.css'
// import tailwindConfig from '.../tailwind.config.js'
// const { theme } = resolveConfig(tailwindConfig)
window.mockroblog = mockroblog

// login get and set functions to save session user
// setter
const setUser = function (userId) {
  sessionStorage.setItem('saveUser', userId)
}

// getter
const getUser = function () {
  const saved = sessionStorage.getItem('saveUser')
  if (saved) {
    return JSON.parse(saved)
  }
}

const setUserSearch = async function (userId) {
  sessionStorage.setItem('saveUserSearch', JSON.stringify(userId))
}

const getUserSearch = function () {
  const saved = sessionStorage.getItem('saveUserSearch')
  if (saved) {
    console.log(saved)
    return JSON.parse(saved)
  }
}

// post button on post page
if (document.getElementById('finalpost') != null) {
  const postBtn = document.getElementById('finalpost')
  postBtn.addEventListener('click', async event => {
    event.preventDefault();
    if (document.getElementById('message').value) {
      await mockroblog.postMessage(getUser(), document.getElementById('message').value)
      alert('message posted')
      window.location.href = 'hometimeline.html'
    } else {
      alert('Please add a message')
    }
  })
}

//message button foot
if (document.getElementById('sendMessage') != null){
  const msgBtn = document.getElementById('sendMessage')
    msgBtn.addEventListener('click', function () {
    window.location.href = 'directmessage.html'
  })
}

//post button foot
//message button foot
if (document.getElementById('postBut') != null){
  const pstBtn = document.getElementById('postBut')
    pstBtn.addEventListener('click', function () {
    window.location.href = 'post.html'
  })
}

    /*
    button.addEventListener("click", function(){
      let newMessage = document.createElement("li");
      newMessage.innerHTML = textbox.value;
      messages.appendChild(newMessage);
      textbox.value = "";
    })
    */
   /*return fetch(`http://localhost:5000/posts/?follower_id=${userId}&following_id=${userIdToStopFollowing}`, { method: 'get' })
      //direct_messages(from_user_id, to_user_id, in_reply_to_id, timestamp, text)
      .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
}
    */

/*
if (document.querySelector('#publicTimeline-json') != null) {
  const timeline = await mockroblog.getPublicTimeline()
  console.log(timeline)
  const display = document.querySelector('#publicTimeline-json')

  for(const key in timeline) {
    display.innerHTML += (
      `<link href= 
      "https://unpkg.com/tailwindcss@%5E1.0/dist/tailwind.min.css"
              rel="stylesheet">
             <!--Style taken from Tailblocks-->
      <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
              <div class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-black-900"><a class="searchUser" href="">${await mockroblog.returnUsername(timeline[key].user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timeline[key].timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timeline[key].text}</p>
                  <button class="btn"> Follow / Unfollow ${await mockroblog.returnUsername(timeline[key].user_id)}</button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  }
*/


if (document.getElementById('dmOtherUser')) {
  const searchButton = document.getElementById('searchOtherUser')
  searchButton.addEventListener('click', async event => {
    event.preventDefault()

    const userToSearch = document.getElementById('dmOtherUser').value
    
    //receive DM on page
if (document.querySelector('#directMessage-json') != null) {
  let messages = document.getElementById("messages");
  const timeline = await fetch(`http://localhost:5000/direct_messages/?from_user_id=${await mockroblog.returnId(userToSearch)}&to_user_id=${getUser()}`, { method: 'get' })
  .then((res) => res.json())
  .then((json) => {
    return json.resources
  }).catch((error) => {
    throw error
  })
  let firstMessage = document.createElement("li");
      //firstMessage.innerHTML = 'You:  ' + textbox.value;
      //messages.appendChild(newMessage);
  console.log(timeline)
  for(const key in timeline) {
    firstMessage.innerHTML += (
      `${await mockroblog.returnUsername(timeline[key].from_user_id)}: <br>
      ${timeline[key].text}<br>
       <br>
        `
      )
    }
    messages.appendChild(firstMessage);
}
  })

  //send message on DM page
  if (document.getElementById('sendMsg') != null) {
    let messages = document.getElementById("messages");
    let textbox = document.getElementById("inputMsg");
    const sndBtn = document.getElementById('sendMsg');
    sndBtn.addEventListener('click', async event => {
      event.preventDefault()
    if (document.getElementById('inputMsg').value) {
      
    const userToSearch = document.getElementById('dmOtherUser').value
    console.log("ASDSADSD")
    await fetch(`http://localhost:5000/direct_messages/`, {
    method: 'post',
    // follower_id=${getUser()}&following_id=${await mockroblog.returnId(userToSearch)}`
    body: JSON.stringify({
      from_user_id: `${getUser()}`,
      to_user_id: `${await mockroblog.returnId(userToSearch)}`,
      text: `${textbox.value}`
    })
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })


      let newMessage = document.createElement("li");
      newMessage.innerHTML = 'You:  <br>' + textbox.value + '<br><br>';
      messages.appendChild(newMessage);
      textbox.value = "";

    } else {
      alert('Please add a message')
    }
  })
}
}

//cancel message on DM page
    if (document.getElementById('cancelMessage') != null){
  const msgBtn = document.getElementById('cancelMessage')
    msgBtn.addEventListener('click', function () {
    window.location.href = 'hometimeline.html'
  })
}

// cancel button on post page
if (document.getElementById('cancelpost') != null) {
  const postBtn = document.getElementById('cancelpost')
  postBtn.addEventListener('click', function () {
    alert('Message cancelled')
    window.location.href = 'hometimeline.html'
  })
}
// login button on register page
if (document.getElementById('loginpage') != null) {
  const logpgBtn = document.getElementById('loginpage')
  logpgBtn.addEventListener('click', function () {
    window.location.href = 'index.html'
  })
}

// login button on login page
if (document.getElementById('login') != null) {
  const loginBtn = document.getElementById('login')
  loginBtn.addEventListener('click', async event => {
    event.preventDefault();
    if (!document.getElementById('loginUsername').value || !document.getElementById('loginPassword').value) {
      alert('Failed Login. Make sure to fill out all fields')
      return
    }

    let userId = await mockroblog.authenticateUser(document.getElementById('loginUsername').value, document.getElementById('loginPassword').value)
    console.log(userId)
    if (userId != null) {
      // save user logged in
      setUser(userId)
      window.location.href = 'hometimeline.html'
    } else {
      // display unsuccesful message
      alert('Failed Login')
    }
    
  })
}
// register site
if (document.getElementById('register') != null) {
  const registerBtn = document.getElementById('register')
  registerBtn.addEventListener('click', async event => {
    event.preventDefault();
    if (!document.getElementById('registerUsername').value || !document.getElementById('registerEmail').value || !document.getElementById('registerPassword').value) {
      alert('Failed Register. Make sure to fill out all fields')
      return
    }

    if (await mockroblog.createUser(document.getElementById('registerUsername').value, document.getElementById('registerEmail').value, document.getElementById('registerPassword').value) != null) {
      window.location = window.location.toString().replace('register.html', 'hometimeline.html')
    } else {
      // display unsuccesful message
      alert('User already Exists')
    }
  })
}

// user timeline
if (document.querySelector('#yourTimeline-json') != null) {
  const timeline = await mockroblog.getUserTimeline(getUser())

  console.log(timeline)

  const display = document.querySelector('#yourTimeline-json')

  for(const key in timeline) {
    display.innerHTML += (
      `<link href= 
      "https://unpkg.com/tailwindcss@%5E1.0/dist/tailwind.min.css"
              rel="stylesheet">
             <!--Style taken from Tailblocks-->
      <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
              <div class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-black-900"><p>${await mockroblog.returnUsername(timeline[key].user_id)}</p></span>
                  <span class="mt-1 text-gray-500 text-sm">${timeline[key].timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timeline[key].text}</p>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  }
}

// searchtimeline
if (document.querySelector('#searchUser') != null) {
  const timeline = await mockroblog.getUserTimeline(getUserSearch())
  const display = document.querySelector('#searchUser')
  for(const key in timeline) {
    display.innerHTML += (
      `<link href= 
      "https://unpkg.com/tailwindcss@%5E1.0/dist/tailwind.min.css"
              rel="stylesheet">
             <!--Style taken from Tailblocks-->
      <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
              <div class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-black-900"><p>${await mockroblog.returnUsername(timeline[key].user_id)}</p></span>
                  <span class="mt-1 text-gray-500 text-sm">${timeline[key].timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timeline[key].text}</p>
                  <button class="btn"> Follow / Unfollow ${await mockroblog.returnUsername(timeline[key].user_id)}</button>
                  <button class="LBtn"> Like </button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  }
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    followButton.addEventListener('click', async event => {
      event.preventDefault();
      let userToFollow = followButton.innerHTML.replace(" Follow / Unfollow ", "")
      
      let userId = getUser();
      let userToFollowId = await mockroblog.returnId(userToFollow)
      if(await mockroblog.checkFollowing(userId, userToFollowId)) {
        await mockroblog.removeFollower(userId, userToFollowId)
        alert("You have unfollowed " + userToFollow)
      } else {
        await mockroblog.addFollower(userId, userToFollowId)
        alert("You have followed " + userToFollow)
      }
    })
  })
  const likeButton = document.getElementsByClassName('LBtn')
  Array.from(likeButton).forEach((likeButton) => {
    let lastButton = 'Unlike'
    likeButton.addEventListener('click', function () {
      const temporayBtn = likeButton.innerHTML
      likeButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
  
}


// home timeline
if (document.querySelector('#homeTimeline-json') != null) {

 
  const timelineArray = await mockroblog.getHomeTimeline(getUser())
  console.log(timelineArray)

  setTimeout(async function() { 
    const display = document.querySelector('#homeTimeline-json')
    for (const timeline in timelineArray) { 
      console.log(timelineArray[timeline])
      display.innerHTML += (
        `<link href= 
        "https://unpkg.com/tailwindcss@%5E1.0/dist/tailwind.min.css"
                rel="stylesheet">
               <!--Style taken from Tailblocks-->
        <section class="text-gray-600 body-font overflow-hidden">
            <div class="container px-5 py-24 mx-auto">
              <div class="-my-8 divide-y-2 divide-gray-100">
                <div class="py-8 flex flex-wrap md:flex-nowrap">
                  <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span class="font-semibold title-font text-black-900"><a class="searchUser" href="">${await mockroblog.returnUsername(timelineArray[timeline].user_id)}</span>
                    <span class="mt-1 text-gray-500 text-sm">${timelineArray[timeline].timestamp}</span>
                  </div>
                  <div class="md:flex-grow">
                    <p class="leading-relaxed">${timelineArray[timeline].text}</p>
                    <button class="btn"> Follow / Unfollow ${await mockroblog.returnUsername(timelineArray[timeline].user_id)}</button>
                    <button class="LBtn"> Like </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
          `
      )
    }
  }, 1000);
  
  const followButton = document.getElementsByClassName('#btn')
  Array.from(followButton).forEach((followButton) => {
    followButton.addEventListener('click', async function() {
      //event.preventDefault();
      let userToFollow = followButton.innerHTML.replace(" Follow / Unfollow ", "")
      
      let userId = getUser();
      let userToFollowId = await mockroblog.returnId(userToFollow)
      if(await mockroblog.checkFollowing(userId, userToFollowId)) {
        await mockroblog.removeFollower(userId, userToFollowId)
        alert("You have unfollowed " + userToFollow)
      } else {
        await mockroblog.addFollower(userId, userToFollowId)
        alert("You have followed " + userToFollow)
      }
    })
  })

  const searchUserArray = document.getElementsByClassName('#searchUser')
  Array.from(searchUserArray).forEach((searchUser) => {
    searchUser.addEventListener('click', async event => {
      event.preventDefault();
      let otherUserId = await mockroblog.returnId(searchUser.innerHTML)

      console.log("outside")
      if (otherUserId === getUser()) {
        console.log("if")
        window.location.href = 'yourtimeline.html'
      } else {
        await setUserSearch(otherUserId)
        window.location.href = 'searchtimeline.html'
        console.log("else")
      }
      return false;
    })
  })
  const likeButton = document.getElementsByClassName('LBtn')
  Array.from(likeButton).forEach((likeButton) => {
    let lastButton = 'Unlike'
    likeButton.addEventListener('click', function () {
      const temporayBtn = likeButton.innerHTML
      likeButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
}

// public timeline
if (document.querySelector('#publicTimeline-json') != null) {
  const timeline = await mockroblog.getPublicTimeline()
  console.log(timeline)
  const display = document.querySelector('#publicTimeline-json')

  for(const key in timeline) {
    display.innerHTML += (
      `<link href= 
      "https://unpkg.com/tailwindcss@%5E1.0/dist/tailwind.min.css"
              rel="stylesheet">
             <!--Style taken from Tailblocks-->
      <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
              <div class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-black-900"><a class="searchUser" href="">${await mockroblog.returnUsername(timeline[key].user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timeline[key].timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timeline[key].text}</p>
                  <button class="btn"> Follow / Unfollow ${await mockroblog.returnUsername(timeline[key].user_id)}</button>
                  <button class="LBtn"> Like </button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  }
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    followButton.addEventListener('click', async function () {
      let userToFollow = followButton.innerHTML.replace(" Follow / Unfollow ", "")
      
      let userId = getUser();
      let userToFollowId = await mockroblog.returnId(userToFollow)
      if(await mockroblog.checkFollowing(userId, userToFollowId)) {
        await mockroblog.removeFollower(userId, userToFollowId)
        alert("You have unfollowed " + userToFollow)
      } else {
        await mockroblog.addFollower(userId, userToFollowId)
        alert("You have followed " + userToFollow)
      }
    })
  })

  const searchUserArray = document.getElementsByClassName('searchUser')
  Array.from(searchUserArray).forEach((searchUser) => {
    searchUser.addEventListener('click', async event => {
      event.preventDefault();
      let otherUserId = await mockroblog.returnId(searchUser.innerHTML)

      if (otherUserId === getUser()) {
        window.location.href = 'yourtimeline.html'
      } else {
        await setUserSearch(otherUserId)
        window.location.href = 'searchtimeline.html'
      }
    })
  })
  const likeButton = document.getElementsByClassName('LBtn')
  Array.from(likeButton).forEach((likeButton) => {
    let lastButton = 'Unlike'
    likeButton.addEventListener('click', function () {
      const temporayBtn = likeButton.innerHTML
      likeButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })

}
