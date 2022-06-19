function isEqual(str1, str2){
	return (str1 === str2)
}

function formatDate(date){
	return date.toLocaleDateString()
}

module.exports = {isEqual, formatDate}