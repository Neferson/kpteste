import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '13574d1406e17e65ac25'
});


$(document).ready(function(){

	/*
	* INICIA DADOS DE CONFIGURAÇÔES DE USUÁRIOS
	* INICIA DADOS DE CONFIGURAÇÔES DE USUÁRIOS
	*/

	// successToast();
	// dangerToast();

})

function successToast(){
	$.toast({
		text: "Solicitação concluída com sucesso!", // Text that is to be shown in the toast
		heading: 'Sucesso', // Optional heading to be shown on the toast
		icon: 'success', // Type of toast icon
		showHideTransition: 'slide', // fade, slide or plain
		allowToastClose: true, // Boolean value true or false
		hideAfter: 3500, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
		stack: 200, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
		position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
		
		textAlign: 'left',  // Text alignment i.e. left, right or center
		loader: true,  // Whether to show loader or not. True by default
		loaderBg: '#dddddd',  // Background color of the toast loader
		beforeShow: function () {}, // will be triggered before the toast is shown
		afterShown: function () {}, // will be triggered after the toat has been shown
		beforeHide: function () {}, // will be triggered before the toast gets hidden
		afterHidden: function () {}  // will be triggered after the toast has been hidden
	});	
}

function dangerToast(){
	$.toast({
		text: "Confira seus dados e tente novamente!", // Text that is to be shown in the toast
		heading: 'Houve algum problema', // Optional heading to be shown on the toast
		icon: 'error', // Type of toast icon
		showHideTransition: 'slide', // fade, slide or plain
		allowToastClose: true, // Boolean value true or false
		hideAfter: 3500, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
		stack: 200, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
		position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
		
		textAlign: 'left',  // Text alignment i.e. left, right or center
		loader: true,  // Whether to show loader or not. True by default
		loaderBg: '#dddddd',  // Background color of the toast loader
		beforeShow: function () {}, // will be triggered before the toast is shown
		afterShown: function () {}, // will be triggered after the toat has been shown
		beforeHide: function () {}, // will be triggered before the toast gets hidden
		afterHidden: function () {}  // will be triggered after the toast has been hidden
	});	
}


