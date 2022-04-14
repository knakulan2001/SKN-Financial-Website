var button = document.getElementById('mainButton');

//Open a separate "form" upon clicking any button (for client home page)
var openForm = function() {
	button.className = 'active';
};

//Template for redirecting to Client Home page upon successful validation


//An input validator for username and password (template to change as needed)
// var checkInput = function(input) {
// 	if (input.value.length > 0) {
// 		input.className = 'active';
// 	} else {
// 		input.className = '';
// 	}
// };

//Close the separate form upon clicking another button within separate form (for client home page)
var closeForm = function() {
	button.className = '';
};

// document.addEventListener("keyup", function(e) {
// 	if (e.keyCode == 27 || e.keyCode == 13) {
// 		closeForm();
// 	}
// });

