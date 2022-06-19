const newPostHandler = async (event)=>{
	event.preventDefault()
	document.location.replace('/dashboard/new')
}



document.querySelector('#newPostBtn').addEventListener('click', newPostHandler)

