import * as mockroblog from './mockroblog.js'
// import stylesheets from 'tailwind.css'
// import tailwindConfig from '.../tailwind.config.js'
// const { theme } = resolveConfig(tailwindConfig)
window.mockroblog = mockroblog

// login get and set functions to save session user
// setter
const setUser = function () {
  sessionStorage.setItem('saveUser', JSON.stringify(document.getElementById('loginUsername').value))
}
// getter
const getUser = function () {
  const saved = sessionStorage.getItem('saveUser')
  if (saved) {
    return JSON.parse(saved)
  }
  return {}
}

// post button on post page
if (document.getElementById('finalpost') != null) {
  const postBtn = document.getElementById('finalpost')
  postBtn.addEventListener('click', async event => {
    event.preventDefault();
    console.log(document.getElementById('message').value)
    if (document.getElementById('message').value) {
      console.log(getUser().value)
      console.log(document.getElementById('message').value)
      await postMessage(getUser().value, document.getElementById('message').value)
      console.log(document.getElementById('message'))
      alert('message posted')
      window.location.href = 'hometimeline.html'
    } else {
      alert('Please add a message')
    }
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
/*
const cancelBtn = document.getElementById('cancelpost')
cancelBtn.addEventListener('click', () => {
  window.location.href = 'hometimeline.html'
})
*/

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

    if (await mockroblog.authenticateUser(document.getElementById('loginUsername').value, document.getElementById('loginPassword').value) != null) {
      // save user logged in
      setUser()
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
  const timeline = mockroblog.getUserTimeline(getUser())

  const display = document.querySelector('#yourTimeline-json')

  timeline.forEach(timelinePost => {
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
                  <span class="font-semibold title-font text-gray-700">${mockroblog.returnUsername(timelinePost.user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timelinePost.timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timelinePost.text}</p>
                  <button class="btn"> Follow ${mockroblog.returnUsername(timelinePost.user_id)}</button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  })
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    let lastButton = 'Unfollow'
    followButton.addEventListener('click', function () {
      const temporayBtn = followButton.innerHTML
      followButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
}

if (document.querySelector('#user1-json') != null) {
  const timeline = mockroblog.getUserTimeline('ProfAvery')

  const display = document.querySelector('#user1-json')

  timeline.forEach(timelinePost => {
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
                  <span class="font-semibold title-font text-gray-700">${mockroblog.returnUsername(timelinePost.user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timelinePost.timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timelinePost.text}</p>
                  <button class="btn"> Follow ${mockroblog.returnUsername(timelinePost.user_id)}</button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  })
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    let lastButton = 'Unfollow'
    followButton.addEventListener('click', function () {
      const temporayBtn = followButton.innerHTML
      followButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
}

if (document.querySelector('#user2-json') != null) {
  const timeline = mockroblog.getUserTimeline('KevinAWortman')

  const display = document.querySelector('#user2-json')

  timeline.forEach(timelinePost => {
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
                  <span class="font-semibold title-font text-gray-700">${mockroblog.returnUsername(timelinePost.user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timelinePost.timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timelinePost.text}</p>
                  <button class="btn"> Follow ${mockroblog.returnUsername(timelinePost.user_id)}</button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  })
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    let lastButton = 'Unfollow'
    followButton.addEventListener('click', function () {
      const temporayBtn = followButton.innerHTML
      followButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
}

if (document.querySelector('#user3-json') != null) {
  const timeline = mockroblog.getUserTimeline('Beth_CSUF')

  const display = document.querySelector('#user3-json')

  timeline.forEach(timelinePost => {
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
                  <span class="font-semibold title-font text-gray-700">${mockroblog.returnUsername(timelinePost.user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timelinePost.timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timelinePost.text}</p>
                  <button class="btn"> Follow ${mockroblog.returnUsername(timelinePost.user_id)}</button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  })
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    let lastButton = 'Unfollow'
    followButton.addEventListener('click', function () {
      const temporayBtn = followButton.innerHTML
      followButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
}
// home timeline
if (document.querySelector('#homeTimeline-json') != null) {
  const timeline = mockroblog.getHomeTimeline(getUser())

  const display = document.querySelector('#homeTimeline-json')

  timeline.forEach(timelinePost => {
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
                  <span class="font-semibold title-font text-gray-700"><a href="${timelinePost.user_id}.html">${mockroblog.returnUsername(timelinePost.user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timelinePost.timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timelinePost.text}</p>
                  <button class="btn"> Follow ${mockroblog.returnUsername(timelinePost.user_id)}</button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  })
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    let lastButton = 'Unfollow'
    followButton.addEventListener('click', function () {
      const temporayBtn = followButton.innerHTML
      followButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
}

// public timeline
if (document.querySelector('#publicTimeline-json') != null) {
  const timeline = mockroblog.getPublicTimeline()

  const display = document.querySelector('#publicTimeline-json')

  timeline.forEach(timelinePost => {
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
                  <span class="font-semibold title-font text-black-900"><a href="${timelinePost.user_id}.html">${mockroblog.returnUsername(timelinePost.user_id)}</span>
                  <span class="mt-1 text-gray-500 text-sm">${timelinePost.timestamp}</span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">${timelinePost.text}</p>
                  <button class="btn"> Follow ${mockroblog.returnUsername(timelinePost.user_id)}</button>
                </div>
                
              </div>
            </div>
          </div>
        </section>
        `
    )
  })
  const followButton = document.getElementsByClassName('btn')
  Array.from(followButton).forEach((followButton) => {
    let lastButton = 'Unfollow'
    followButton.addEventListener('click', function () {
      const temporayBtn = followButton.innerHTML
      followButton.innerHTML = lastButton
      lastButton = temporayBtn
    })
  })
}
