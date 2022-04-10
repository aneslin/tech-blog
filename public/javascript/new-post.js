//create a new post from the dashboard
async function postFormHandler(event) {
    event.preventDefault();
  
    const post_title = document.querySelector('#post_title').value.trim();
    const post_content = document.querySelector('#post_body').value.trim();
  
    if (post_title &&  post_content) {
    const response =  await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
          post_title,
          post_content
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        if (response.ok){
          console.log('success')
          window.location.replace('/dashboard')
        } else {
          alert(response.statusText)
        }
  
  }
  }
  document.querySelector('.new-post').addEventListener('submit', postFormHandler)