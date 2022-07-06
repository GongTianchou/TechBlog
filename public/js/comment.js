
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.href.split('/')[window.location.href.split('/').length - 1]
  
  
    if (comment_text) {
      try {
        grecaptcha.ready( async function() {
          grecaptcha.execute('6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe', {action: 'submit'})
          .then( async function(token) {
            event.preventDefault();
            const response = await fetch('/api/comments', {
              method: 'POST',
              body: JSON.stringify({
                token,
                post_id,
                comment_text
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
  
            if (response.ok) {
              document.location.reload();
            } else {
              document.getElementById('commentError').innerText = 'failed to upload, please sign in and ensure comment is not empty.';
            }
          });
        });
      } catch (error) {
        console.log(error)
        document.getElementById('commentError').innerText = 'failed to upload, please sign in and ensure comment is not empty.';
      }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  