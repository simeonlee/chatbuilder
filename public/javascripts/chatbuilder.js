$(document).ready(function(){

	var $messages = $('.messages');
	var $draft = $('.draft');
	var $send = $('.send');
	var $chat = $('.chat');
	var $username_input = $('.username-input')
	var $name = $('.name')
	var username = '';

	$chat.hide();

	// While within input field, 'enter' press
	$draft.keypress(function(e){
	 	var key = e.which;
	 	if(key==13){
			$send.click();
			return false;
	 	}
	})

	$username_input.keypress(function(e){
		var key = e.which;
	 	if(key==13){
			username = $username_input.val();
			board(username);
			return false;
	 	}
	});

	var board = function(username){
		if(username != false){
			$name.hide();
			$chat.show();
		}else{
			alert('Please enter a valid username!');
		}
	}



	var messagePrint = function(){
		var text = $draft.val();
		var message = '<li class="message">' + username + ' : ' + text+'</li>';
		$messages.append(message);
		$draft.val('');
	}

	// On manual click
	$send.on('click',messagePrint);

});

/*
Checklist
- Have alert window or whatever that asks for username upon webpage load
- add username before text
- Git init
- Host on Heroku
- Configure socket on server
- Figure out how to socket emit to EVERYONE when anyone on the webpage types something in
- pretty it up with CSS / bootstrap
*/