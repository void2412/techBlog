const loginHandler = async (event) => {
	event.preventDefault()

	// collect input data
	const username = document.querySelector('#userInput').value.trim()
	const password = document.querySelector('#passwordInput').value.trim()

	// errorText Object
	const errorText = document.querySelector('#errorText')

	if (username && password) {
		const response = await fetch('/api/user/login',{
			method: 'POST',
			body: JSON.stringify({username,password}),
			headers: { 'Content-Type': 'application/json' },
		})
		if(response.ok){
			document.location.replace('/dashboard')
		}
		else{
			const error = await response.json()
			errorText.innerHTML = error.message
		}
	}
	else if (username){
		errorText.innerHTML = 'Password must not be empty'
	}
	else{
		errorText.innerHTML = 'Username must not be empty'
	}

}












document.querySelector('#loginForm').addEventListener('submit', loginHandler)