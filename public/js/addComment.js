const addCommentHandler = async (event)=>{
	event.preventDefault()
	const content = document.querySelector('#newCommentInput').value.trim()
	const post_id = document.querySelector('#postId').getAttribute('post-id')

	if(content && post_id){
		const response = await fetch('/api/comment',{
			method: 'POST',
			body: JSON.stringify(content),
			headers: {'Content-Type': 'application/json'}
		})

		if (response.ok){
			document.location.replace(`/post/${post_id}`)
		}
		else{
			alert('Something went wrong. Failed to add comment')
		}
	}
}

const editCommentHandler = async (event)=>{
	event.preventDefault()
	const firstLayer = document.querySelectorAll('.first-layer')
	const secondLayer = document.querySelectorAll('.second-layer')
	firstLayer.forEach((element)=>{
		element.setAttribute('style', 'display:none;')
	})
	secondLayer.forEach((element)=>{
		element.setAttribute('style', 'display:inline-block;')
	})
}

const cancelCommentHandler = async (event)=>{
	event.preventDefault()
	const firstLayer = document.querySelectorAll('.first-layer')
	const secondLayer = document.querySelectorAll('.second-layer')
	secondLayer.forEach((element)=>{
		element.setAttribute('style', 'display:none;')
	})
	firstLayer.forEach((element)=>{
		element.setAttribute('style', 'display:inline-block;')
	})
}

const deleteCommentHandler = async (event)=>{

}

const submitCommentHandler = async (event)=>{
	
}

document.querySelector('#newCommentBtn').addEventListener('click', addCommentHandler)

document.querySelector('#editBtn').addEventListener('click', editCommentHandler)

document.querySelector('#cancelEditBtn').addEventListener('click', cancelCommentHandler)