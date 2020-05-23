appName = '/eventplanner/';

ajax = {
	get: (url, func) => {
		$.ajax({
	        url: url,
	        crossDomain: true,
	        dataType: 'json',
	        success: func,
	        type: 'GET'
	    });
	},
	post: (url, func, msg) => {
		$.ajax({
	        url: url,
	        crossDomain: true,
	        data: JSON.stringify(msg),
	        dataType: 'json',
	        success: func,
	        type: 'POST'
	    });
	}
}

// ajax.get("dummy.json", (res) => {console.log(res)})

/* Router */
$(document).ready(route);

function route() {
	var location = window.location.hash;
	console.log(location);

	var tokens = location.split("/");
	console.log(tokens);

	// TODO: check user, check event

	if (tokens[1] == undefined) {
		loadHome();
		return;
	}

	if (tokens[1] === "new") {
		loadNew();
	} else if (tokens[1] === "event") {
		loadEvent();
	} else if (tokens[1] === "list") {
		loadList();
	} else if (tokens[1] === "login") {
		loadLogin();
	} else {
		loadHome();
	}
}

function loadHome() {
	if (getUser() == undefined) {
		$("#navbar-state-user").hide();
		$("#navbar-state-login").show();
	} else {
		$("#navbar-state-user").show();
		$("#navbar-state-login").hide();
	}

	click($("#navbar-home"));

	$("#home").show();
	$("#new").hide();
	$("#event").hide();
	$("#list").hide();
	$("#login").hide();

	changeLocation("home");
}

function loadNew() {
	var user = getUser();
	if (user == undefined) {
		loadHome();
		return;
	} else {
		$("#navbar-state-user").show();
		$("#navbar-state-login").hide();
	}

	click($("#navbar-new"));

	$("#home").hide();
	$("#new").show();
	$("#event").hide();
	$("#list").hide();
	$("#login").hide();

	$("#event-button")[0].parentElement.innerHTML = $("#event-button")[0]
		.parentElement.innerHTML.replace("${user}", user)

	changeLocation("new");
}

function loadEvent(src) {
	var id = getEvent(src);
	if (id == undefined) {
		return;
	}

	var user = getUser();
	if (user == undefined) {
		loadHome();
		return;
	} else {
		$("#navbar-state-user").show();
		$("#navbar-state-login").hide();
	}

	unclick();

	ajax.get("dummy.json", (res) => {
		var event;
		for(event of res.list) {
			if (event.id === id) {
				break;
			}
		}
		if (event.id !== id) {
			loadHome();
		}

		$("#home").hide();
		$("#new").hide();
		$("#event").show();
		$("#list").hide();
		$("#login").hide();

		$("#event")[0].innerHTML = $("#event")[0].innerHTML
			.replace("${event_id}", event.id)
			.replace("${event_name}", event.name)
			.replace("${datetime}", makeDatePretty(event.datetime))
			.replace("${description}", event.description);

		var parent = $("#assistant-list-row-template")[0].parentElement;
		var template = $("#assistant-list-row-template")[0];

		while (parent.childElementCount > 1) {
			parent.removeChild(parent.children[1]);
		}

		var user_assists = false;
		for(assistant of event.assistants) {
			var row = template.cloneNode(true);
			row.id = "";
			row.style = "";
			row.innerHTML = row.innerHTML
				.replace("${assistant}", assistant);
			if (assistant === user || user === event.organizer) {
				row.lastElementChild.lastElementChild.style = "";
			}
			if (assistant === user) {
				user_assists = true;
			}
			parent.appendChild(row);
		}

		if (!user_assists) {
			var row = template.cloneNode(true);
			row.id = "";
			row.style = ""
			row.innerHTML = row.innerHTML
				.replace("${assistant}", "")
				.replace("danger", "success")
				.replace("glyphicon-remove", "glyphicon-plus");
			row.lastElementChild.lastElementChild.style = "";
			row.lastElementChild.lastElementChild.onclick = add_assistant(user);
			parent.appendChild(row);
		}
	});

	window.location.hash = window.location.hash + "/" + id;
	changeLocation("event");
}

function loadList() {
	var user = getUser();
	if (user == undefined) {
		loadHome();
		return;
	} else {
		$("#navbar-state-user").show();
		$("#navbar-state-login").hide();
	}

	click($("#navbar-list"));

	ajax.get("dummy.json", (res) => {
		$("#home").hide();
		$("#new").hide();
		$("#event").hide();
		$("#list").show();
		$("#login").hide();

		parent = $("#event-list-row-template")[0].parentElement;
		var template = $("#event-list-row-template")[0];

		while (parent.childElementCount > 1) {
			parent.removeChild(parent.children[1]);
		}

		for(event of res.list) {
			var row = template.cloneNode(true);
			row.id = "";
			row.style = "";
			row.innerHTML = row.innerHTML
				.replace("${event_id}", event.id)
				.replace("${event_name}", event.name)
				.replace("${datetime}", makeDatePretty(event.datetime))
				.replace("${assistant_cnt}", event.assistants.length);
			parent.appendChild(row);
		}
	});

	changeLocation("list");
}

function loadLogin() {
	if (getUser() == undefined) {
		$("#navbar-state-user").hide();
		$("#navbar-state-login").show();
	} else {
		loadHome();
		return;
	}

	click($("#navbar-login"));

	$("#home").hide();
	$("#new").hide();
	$("#event").hide();
	$("#list").hide();
	$("#login").show();

	changeLocation("login");
}

function login() {
	var location = window.location.hash;
	var tokens = location.split("/");

	var username = $("#username")[0].value;
	if (username === "") {
		return;
	}

	ajax.get("dummy.json", (res) => {
		if (isUserIntoList(res.users, username)) {
			tokens[2] = username;

			$("#username")[0].value = "";
			$(".has-error").removeClass("has-error");
			window.location.hash = tokens.join("/");
			loadHome();
		} else {
			$("#username")[0].parentElement.className += " has-error";
		}
	});
}

function logout() {
	var location = window.location.hash;
	var tokens = location.split("/");

	while (tokens.length > 2) {
		tokens.splice(2, 1);
	}

	tokens.splice(2, 1);

	window.location.hash = tokens.join("/");

	loadHome();
}

/* Other functions */
function click(src) {
	unclick();
	src.addClass("active");
}

function unclick() {
	$(".active").removeClass("active");
}

function changeLocation(destiny) {
	var location = window.location.hash;
	var tokens = location.split("/");

	tokens[1] = destiny;

	if (destiny === "event") {
		while (tokens.length > 4) {
			tokens.splice(4, 1);
		}
	} else if (tokens[2] === "") {
		while (tokens.length > 2) {
			tokens.splice(2, 1);
		}
	} else {
		while (tokens.length > 3) {
			tokens.splice(3, 1);
		}
	}

	window.location.hash = tokens.join("/")
}

function getUser() {
	var location = window.location.hash;
	var tokens = location.split("/");

	if (tokens[2] === "") {
		return undefined;
	}

	// TODO: check user

	$("#nav-username")[0].textContent = tokens[2];

	return tokens[2];
}

function isUserIntoList(userlist, username) {
	for(user of userlist) {
		if (user.name === username) {
			return true;
		}
	}

	return false;
}

function getEvent(event) {
	if (event === undefined || event === "") {
		var location = window.location.hash;
		var tokens = location.split("/");

		if (tokens.length > 3) {
			event = tokens[3];
		} else {
			return undefined;
		}
	}

	// TODO: check event

	return event;
}

function makeDatePretty(datetime) {
	return datetime;
}

function remove_event() {
	// TODO: complete
}

function add_assistant(user, event) {
	// TODO: complete
}

function remove_assistant(user, event) {
	// TODO: complete
}

function add_event(src, user) {
	if ($("#eventname")[0].value === "") {
		$("#eventname")[0].parentElement.className += " has-error";
		return;
	}
	if ($("#date")[0].value === "") {
		$("#date")[0].parentElement.className += " has-error";
		return;
	}
	if ($("#time")[0].value === "") {
		$("#time")[0].parentElement.className += " has-error";
		return;
	}
	if ($("#description")[0].value === "") {
		$("#description")[0].parentElement.className += " has-error";
		return;
	}

	event = {
		name: $("#eventname")[0].value,
		datetime: $("#date")[0].value + " " + $("#time")[0].value + " GMT",
		description: $("#description")[0].value,
		organizer: user,
		assistants: []
	}

	$(".has-error").removeClass("has-error");
	$("#eventname")[0].value = "";
	$("#date")[0].value = "";
	$("#time")[0].value = "";
	$("#description")[0].value = "";

	console.log(event);
}