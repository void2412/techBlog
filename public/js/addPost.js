const addPostHandler = async (event)=>{
	event.preventDefault()
	const title = document.querySelector('#titleInput').value.trim()
	const content = document.querySelector('#contentInput').value.trim()

	if (title&&content) {
		const response = await fetch('/api/post',{
			method: 'POST',
			body: JSON.stringify({title,content}),
			headers: {'Content-Type': 'application/json'}
		})

		if(response.ok){
			document.location.replace('/dashboard')
		}else{
			alert('Something went wrong. Failed to create post')
		}
	}
}
document.querySelector('#addPostForm').addEventListener('submit', addPostHandler)