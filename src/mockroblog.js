/* Mockroblog client API stubs for prototyping */

export async function createUser (username, email, password) {
  return fetch(`http://localhost:5000/users/`, {method : 'post', body: JSON.stringify({
    "username": `${username}`,
    "email": `${email}`,
    "password": `${password}`})
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      return json
    }).catch((error) => {
		  console.log("User already exists")
      return null;
	});
}

export async function returnId (username) {
  return fetch(`http://localhost:5000/users/?username=${username}`, {method : 'get'})
	.then((res) => res.json())
	.then((json) => {
    for (const key in json.resources) {
      if (json.resources[key].id) {
        return json.resources[key].id
      }
    }
  }).catch((error) => {
		  throw error;
	});
}

export async function returnUsername (userId) {
  return fetch(`http://localhost:5000/users/?id=${userId}`, {method : 'get'})
	.then((res) => res.json())
	.then((json) => {
    for (const key in json.resources) {
      if (json.resources[key].username) {
        return json.resources[key].username
      }
    }
  }).catch((error) => {
		  throw error;
	});
}

export async function authenticateUser (username, password) {
  return fetch(`http://localhost:5000/users/?username=${username}&password=${password}`, {method : 'get'})
	.then((res) => res.json())
	.then((json) => {
    for (const key in json.resources) {
      if (json.resources[key].id) {
        return json.resources[key].id
      }
    }
    return null
  }).catch((error) => {
		  throw error;
	});
}

export async function addFollower (userId, userIdToFollow) {
  return fetch(`http://localhost:5000/followers/`, {method : 'post', body: JSON.stringify({
    "follower_id": `${userId}`,
    "following_id": `${userIdToFollow}`})})
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
}

export async function removeFollower (userId, userIdToStopFollowing) {
  if (userId <= 3) {
    return {
      message: null
    }
  }
}

export async function getUserTimeline (userId) {
  return fetch(`http://localhost:5000/posts/?user_id=${userId}`, {method : 'get'})
	.then((res) => res.json())
	.then((json) => {
    return json.resources
  }).catch((error) => {
		  throw error;
	});
}

export async function getPublicTimeline () { 
  return fetch(`http://localhost:5000/posts/`, {method : 'get'})
	.then((res) => res.json())
	.then((json) => {
    return json.resources
  }).catch((error) => {
		  throw error;
	});
}

export async function getHomeTimeline (userId) { 
  return fetch(`http://localhost:5000/followers/?follower_id=${userId}`, {method : 'get'})
	.then((res) => res.json())
	.then((json) => {
    let data = json.resources
    let posts = []
    //data[key].following_id
    for(const key in data) {
       fetch(`http://localhost:5000/posts/?user_id=${data[key].following_id}`, {method : 'get'})
      .then((res) => res.json())
      .then((json) => {
        for (const key in json.resources) {
            posts.push(json.resources[key])
          }
      }).catch((error) => {
        throw error;
    });
    }
    return posts
  }).catch((error) => {
		  throw error;
	});
}

export async function postMessage (userId, text) {
  return fetch(`http://localhost:5000/posts/`, {method : 'post', body: JSON.stringify({
    "user_id": `${userId}`,
    "text": `${text}`})})
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
}
