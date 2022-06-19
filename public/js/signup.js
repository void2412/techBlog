const signupHandler = async (event) => {
	event.preventDefault()

	// collect input data
	const username = document.querySelector('#userInput').value.trim()
	const password = document.querySelector('#passwordInput').value.trim()
	const confirmPassword = document.querySelector('#confirmPasswordInput').value.trim()

	// errorText Object
	const errorText = document.querySelector('#errorText')

	if (username && password && confirmPassword) {
		if(password !== confirmPassword){
			errorText.innerHTML = 'Password must match'
			return
		}

		const response = await fetch('/api/user/signup',{
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
		errorText.innerHTML = 'Password fields must not be empty'
	}
	else if (password && confirmPassword){
		errorText.innerHTML = 'Username must not be empty'
	}
	else{
		errorText.innerHTML = 'Password fields must not be empty'
	}

}

document.querySelector('#signupForm').addEventListener('submit', signupHandler)