function isEqual(str1, str2){
	if (str1 === str2){
		return true
	}
	else{
		return false
	}
}

function formatDate(date){
	return date.toLocaleDateString()
}

module.exports = {isEqual, formatDate}