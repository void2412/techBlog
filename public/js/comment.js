const addCommentHandler = async (event)=>{
	event.preventDefault()
	const content = document.querySelector('#newCommentInput').value.trim()
	const post_id = document.querySelector('#postId').getAttribute('post-id')

	if(content && post_id){
		const response = await fetch(`/api/comment/${post_id}`,{
			method: 'POST',
			body: JSON.stringify({content}),
			headers: {'Content-Type': 'application/json'}
		})
		console.log(response)
		if (response.ok){
			document.location.replace(`/post/${post_id}`)
		}
		else{
			document.location.replace('/login')
		}
	}
}

const commentListHandler = async (event)=>{
	event.preventDefault()
	var target = event.target
	var parent = target.parentElement
	console.log(parent)
	// handle edit button
	if (target.matches('#editBtn')){
		const firstLayer = parent.querySelectorAll('.first-layer')
		const secondLayer = parent.querySelectorAll('.second-layer')
		firstLayer.forEach((element)=>{
			element.setAttribute('style', 'display:none;')
		})
		secondLayer.forEach((element)=>{
			element.setAttribute('style', 'display:inline-block;')
		})
	}

	// handle cancel button
	if(target.matches('#cancelEditBtn')){
		const firstLayer = parent.querySelectorAll('.first-layer')
		const secondLayer = parent.querySelectorAll('.second-layer')
		const firstLayerText = parent.querySelectorAll('.first-layer-text')
		secondLayer.forEach((element)=>{
			element.setAttribute('style', 'display:none;')
		})
		firstLayer.forEach((element)=>{
			element.setAttribute('style', 'display:inline-block;')
		})
		firstLayerText.forEach((element)=>{
			element.setAttribute('style', 'display:block;')
		})
	}

	// handle delete button
	if(target.matches('#deleteBtn')){
		const id = parent.getAttribute('comment-id')
		const post_id = document.querySelector('#postId').getAttribute('post-id')
		const response = await fetch(`/api/comment/${id}/${post_id}`,{
			method: 'DELETE'
		})
	
		if (response.ok){
			document.location.replace(`/post/${post_id}`)
		}
		else{
			document.location.replace('/login')
		}
	}

	// handle submitEdit button
	if(target.matches('#submitEditBtn')){
		const id = parent.getAttribute('comment-id')
		const content = parent.querySelector('#commentContent').value.trim()
		const post_id = document.querySelector('#postId').getAttribute('post-id')

		const response = await fetch(`/api/comment/${id}/${post_id}`,{
			method: 'PUT',
			body: JSON.stringify({content}),
			headers: {'Content-Type': 'application/json'}
		})
	
		if(response.ok){
			document.location.replace(`/post/${post_id}`)
		}
		else{
			document.location.replace('/login')
		}
	}
}

document.querySelector('#newCommentBtn').addEventListener('click', addCommentHandler)



document.querySelector('#commentList').addEventListener('click', commentListHandler)