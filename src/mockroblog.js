/* Mockroblog client API stubs for prototyping */

export async function createUser (username, email, password) {
  return fetch('http://localhost:5000/users/', {
    method: 'post',
    body: JSON.stringify({
      username: `${username}`,
      email: `${email}`,
      password: `${password}`
    })
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      return json
    }).catch((error) => {
		  console.log('User already exists')
      return null
    })
}

export async function returnId (username) {
  return fetch(`http://localhost:5000/users/?username=${username}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      for (const key in json.resources) {
        if (json.resources[key].id) {
          return json.resources[key].id
        }
      }
    }).catch((error) => {
		  throw error
    })
}

export async function returnUsername (userId) {
  return fetch(`http://localhost:5000/users/?id=${userId}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      for (const key in json.resources) {
        if (json.resources[key].username) {
          return json.resources[key].username
        }
      }
    }).catch((error) => {
		  throw error
    })
}

export async function authenticateUser (username, password) {
  return fetch(`http://localhost:5000/users/?username=${username}&password=${password}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      for (const key in json.resources) {
        if (json.resources[key].id) {
          return json.resources[key].id
        }
      }
      return null
    }).catch((error) => {
		  throw error
    });
}
export async function checkFollowing (userId, otherUser) {
  return fetch(`http://localhost:5000/followers/?follower_id=${userId}&following_id=${otherUser}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      for (const key in json.resources) {
        return true
      }
      return false
      console.log('done')
    }).catch((error) => {
		  throw error
    });
}

export async function addFollower (userId, userIdToFollow) {
  return fetch('http://localhost:5000/followers/', {
    method: 'post',
    body: JSON.stringify({
      follower_id: `${userId}`,
      following_id: `${userIdToFollow}`
    })
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
}
/*
export async function sendDM (from_user_id, to_user_id, text) {
  return fetch(`http://localhost:5000/followers/?follower_id=${from_user_userId}&following_id=${userIdToStopFollowing}`, {
    method: 'post',
    body: JSON.stringify({
      from_user_id: `${from_user_id}`,
      to_user_id: `${to_user_id}`,
      text: `${text}`
    })
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
}
*/

export async function removeFollower (userId, userIdToStopFollowing) {
  return fetch(`http://localhost:5000/followers/?follower_id=${userId}&following_id=${userIdToStopFollowing}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      console.log('Remove Follower: ')
      console.log(json)
      for (const key in json.resources) {
        if (json.resources[key].id) {
          fetch(`http://localhost:5000/followers/${json.resources[key].id}`, { method: 'delete' })
            .then((res) => res.json())
            .then((json) => {
              console.log(json)
            })
        }
      }
    })
}

export async function getUserTimeline (userId) {
  return fetch(`http://localhost:5000/posts/?sort=-timestamp&user_id=${userId}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      return json.resources
    }).catch((error) => {
		  throw error
    })
}

export async function getPublicTimeline () {
  return fetch('http://localhost:5000/posts/?sort=-timestamp', { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      return json.resources
    }).catch((error) => {
		  throw error
    })
}

export async function getHomeTimeline (userId) {
  const posts = []
  const promises = []
  fetch(`http://localhost:5000/followers/?follower_id=${userId}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      const data = json.resources

      for (const key in data) {
        promises.push(fetch(`http://localhost:5000/posts/?sort=-timestamp&user_id=${data[key].following_id}`, { method: 'get' })
          .then((res) => res.json())
          .then((json) => {
            for (const key in json.resources) {
              posts.push(json.resources[key])
            }
          })
          .catch((error) => {
            throw error;
          })
        )
      }
    })
    .catch((error) => {
		  throw error
    })

  return await Promise.all([promises]).then(([data]) => {
    console.log('Get Home Timeline:')
    console.log(posts)
    console.log(data)
    return posts
  })
}

export async function postMessage (userId, text) {
  return fetch('http://localhost:5000/posts/', {
    method: 'post',
    body: JSON.stringify({
      user_id: `${userId}`,
      text: `${text}`
    })
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
}
/*
export async function receiveDM (from_user_id, to_user_id, text) {
  //return fetch(`http://localhost:5000/direct_messages/?from_user_id=${from_user_id}&to_user_id=${to_user_id}&in_reply to_id=${in_reply_to_id}&timestamp=${timestamp}&text=${text}`, { method: 'get' })
  //{"from_user_id":1,"id":2,"in_reply_to_id":1,"text":"Thanks! Going to share this with Dr. Ryu.","timestamp":"2021-08-05 03:23:29","to_user_id":3}]}

  /*
  return fetch(`http://localhost:5000/direct_messages/?from_user_id=${from_user_id}&to_user_id=${to_user_id}`, { method: 'get' })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      for (const key in json.resources) {
        if (json.resources[key].id) {
          fetch(`http://localhost:5000/direct_messages/${json.resources[key].id}`, { method: 'post' })
            .then((res) => res.json())
            .then((json) => {
              console.log(json)
            })
        }
      }
    })

    const posts = []
    const promises = []
    fetch(`http://localhost:5000/followers/?follower_id=${userId}`, { method: 'get' })
      .then((res) => res.json())
      .then((json) => {
        const data = json.resources

        for (const key in data) {
          promises.push(fetch(`http://localhost:5000/posts/?user_id=${data[key].following_id}`, { method: 'get' })
            .then((res) => res.json())
            .then((json) => {
              for (const key in json.resources) {
                posts.push(json.resources[key])
              }
            })
            .catch((error) => {
              throw error
            })
          )
        }
      })
      .catch((error) => {
        throw error
      })

    return await Promise.all([promises]).then(([data]) => {
      console.log('Get Home Timeline:')
      console.log(posts)
      console.log(data)
      return posts
    })
}
*/
