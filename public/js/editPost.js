const editPostHandler = async (event) => {
	event.preventDefault();
	const title = document.querySelector('#titleInput').value.trim()
	const content = document.querySelector('#contentInput').value.trim()
	const id= document.querySelector('#editPostForm').getAttribute('post-id')

	if (title && content) {
		const response = await fetch(`/api/post/${id}`,{
			method: 'PUT',
			body: JSON.stringify({title, content}),
			headers: {'Content-Type': 'application/json'}
		})
		if(response.ok){
			document.location.replace('/dashboard')
		}else{
			alert('Something went wrong. Failed to update post')
		}
	}
}


const deletePostHandler = async (event) => {
	event.preventDefault()
	const id= document.querySelector('#editPostForm').getAttribute('post-id')
	const response = await fetch(`/api/post/${id}`,{
		method: 'DELETE'
	})

	if(response.ok){
		document.location.replace('/dashboard')
	}
	else{
		alert('Something went wrong. Failed to delete post')
	}
}



document.querySelector('#editBtn').addEventListener('click', editPostHandler)
document.querySelector('#deleteBtn').addEventListener('click', deletePostHandler)