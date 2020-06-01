/* Router */
$(document).ready(route);

function route() {
	appName = '/eventplanner/';
	user = undefined;
	
	user = getUser();
	if (user !== undefined && user !== "") {
		$.get("dummy.json", (res) => {
			// TODO
			if (!isUserIntoList(user, res.users)) {
				user = undefined;

				var location = window.location.hash;
				var tokens = location.split("/");

				while (tokens.length > 2) {
					tokens.splice(2, 1);
				}

				tokens.splice(2, 1);

				window.location.hash = tokens.join("/");
			}

			_route();
		});
	} else {
		_route();
	}
}

function _route() {
	// Contents from templates
	content_node = $(".content")[0];
	content_home = $(".home")[0];
	content_new = $(".new")[0];
	content_event = $(".event")[0];
	content_list = $(".list")[0];
	content_login = $(".login")[0];
	table_row_event = $(".list tbody tr")[0].cloneNode(true);
	table_row_assistant = $(".event tbody tr")[0].cloneNode(true);
	$(".templates").remove();

	var location = window.location.hash;
	var tokens = location.split("/");

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

function load(target) {
	while (content_node.childElementCount > 0) {
		content_node.removeChild(content_node.lastElementChild);
	}
	content_node.appendChild(target.cloneNode(true));
}

function loadHome() {
	if (getUser() == undefined) {
		$(".navbar-state-user").addClass("hide");
		$(".navbar-state-login").removeClass("hide");
	} else {
		$(".navbar-state-user").removeClass("hide");
		$(".navbar-state-login").addClass("hide");
	}

	click($(".navbar-home"));

	load(content_home);

	changeLocation("home");
}

function loadNew() {
	var user = getUser();
	if (user == undefined) {
		loadHome();
		return;
	} else {
		$(".navbar-state-user").removeClass("hide");
		$(".navbar-state-login").addClass("hide");
	}

	click($(".navbar-new"));

	load(content_new);

	$(".event-button")[0].parentElement.innerHTML = $(".event-button")[0]
		.parentElement.innerHTML.replace("${user}", user);

	changeLocation("new");
}

function loadEvent(eventid) {
	var user = getUser();
	if (user == undefined) {
		loadHome();
		return;
	} else {
		$(".navbar-state-user").removeClass("hide");
		$(".navbar-state-login").addClass("hide");
	}

	var id = getEvent(eventid);
	if (id == undefined) {
		loadHome();
		return;
	}

	$.get("dummy.json", (res) => {
		// TODO
		var event;
		for(event of res.list) {
			if (event.id === id) {
				break;
			}
		}
		if (event.id !== id) {
			loadHome();
			return;
		}

		unclick();
		
		load(content_event);

		$(".event")[0].innerHTML = $(".event")[0].innerHTML
			// .replace("${event_id}", event.id)
			.replace("${event_name}", event.name)
			.replace("${datetime}", makeDatePretty(event.datetime))
			.replace("${description}", event.description.replace("\n", "<br>"));


		var table_assistants = $(".event tbody")[0];
		table_row_assistant.innerHTML = table_row_assistant.innerHTML
			.replace("${event_id}", event.id);

		while (table_assistants.childElementCount > 0) {
			table_assistants.removeChild(table_assistants.lastElementChild);
		}

		sortAssistants(event.assistants);

		var user_assists = false;
		for(var assistant of event.assistants) {
			var row = table_row_assistant.cloneNode(true);
			row.innerHTML = row.innerHTML
				.replace("${assistant}", assistant)
				.replace("${assistant}", assistant);
			if (assistant === user || user === event.organizer) {
				row.innerHTML = row.innerHTML
					.replace("disabled", "hoverable clickable");
				row.lastElementChild.lastElementChild.classList.remove("hide");
			} else {
				row.lastElementChild.onclick = undefined;
			}
			if (assistant === user) {
				user_assists = true;
			}
			row.id = assistant;
			table_assistants.appendChild(row);
		}

		if (!user_assists) {
			var row = table_row_assistant.cloneNode(true);
			row.innerHTML = row.innerHTML
				.replace("${assistant}", "")
				.replace("hoverable", "")
				.replace("glyphicon-remove", "glyphicon-plus")
				.replace("disabled", "hoverable clickable")
				.replace("remove", "add")
				.replace("${assistant}", user);
			row.lastElementChild.lastElementChild.classList.remove("hide");
			table_assistants.appendChild(row);
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
		$(".navbar-state-user").removeClass("hide");
		$(".navbar-state-login").addClass("hide");
	}

	$.get("dummy.json", (res) => {
		// TODO
		click($(".navbar-list"));

		load(content_list);

		var table_events = $(".list tbody")[0];

		while (table_events.childElementCount > 0) {
			table_events.removeChild(table_events.lastElementChild);
		}

		sortEvents(res.list);

		for(var event of res.list) {
			var row = table_row_event.cloneNode(true);
			row.innerHTML = row.innerHTML
				.replace("${event_id}", event.id)
				.replace("${event_id}", event.id)
				.replace("${event_name}", event.name)
				.replace("${datetime}", makeDatePretty(event.datetime))
				.replace("${assistant_cnt}", event.assistants.length);
			if (event.organizer === user) {
				console.log(event.organizer);
				console.log(user);
				row.innerHTML = row.innerHTML
					.replace("disabled", "hoverable clickable");
				row.lastElementChild.lastElementChild.classList.remove("hide");
			} else {
				row.lastElementChild.onclick = undefined;
			}
			row.id = event.id;
			table_events.appendChild(row);
		}
	});

	changeLocation("list");
}

function loadLogin() {
	if (getUser() == undefined) {
		$(".navbar-state-user").addClass("hide");
		$(".navbar-state-login").removeClass("hide");
	} else {
		loadHome();
		return;
	}

	click($(".navbar-login"));

	load(content_login);

	changeLocation("login");
}

function login() { // And register
	var location = window.location.hash;
	var tokens = location.split("/");

	var username = $("#username")[0].value;
	if (username === "") {
		return;
	}

	$.get("dummy.json", (res) => {
		// TODO
		if (isUserIntoList(username, res.users)) {
			tokens[2] = username;
			user = username;

			$("#username")[0].value = "";
			$(".has-error").removeClass("has-error");
			window.location.hash = tokens.join("/");
			loadHome();
		} else {
			$("#username")[0].parentElement.classList.add("has-error");

			// Register new user
			if (confirm("Do you want to register the user name " + username + "?")) {
				$.post("dummy.json", {name: username}, (res) => {
					// TODO
					
					tokens[2] = username;
					user = username;

					$("#username")[0].value = "";
					$(".has-error").removeClass("has-error");
					window.location.hash = tokens.join("/");
					loadHome();
				});
			}
		}
	});
}

function logout() {
	user = undefined;

	var location = window.location.hash;
	var tokens = location.split("/");

	while (tokens.length > 2) {
		tokens.splice(2, 1);
	}

	tokens.splice(2, 1);

	window.location.hash = tokens.join("/");

	loadHome();
}

function removeEvent(event) {
	console.log("removeEvent(" + event + ")");

	$("#" + event).remove();

	$.post("dummy.json", {eventid: event}, (res) => {
		console.log(res);

		// TODO
	});
}

function addAssistant(user, event) {
	console.log("addAssistant(" + user + ", " + event + ")");

	var table_assistants = $(".event tbody")[0];
	table_row_assistant.innerHTML = table_row_assistant.innerHTML
		.replace("${event_id}", event.id);

	table_assistants.removeChild(table_assistants.lastElementChild);

	var row = table_row_assistant.cloneNode(true);
	row.innerHTML = row.innerHTML
		.replace("${assistant}", user)
		.replace("${assistant}", user);
	row.innerHTML = row.innerHTML
		.replace("disabled", "hoverable clickable");
	row.lastElementChild.lastElementChild.classList.remove("hide");
	row.id = user;
	table_assistants.appendChild(row);

	$.post("dummy.json", {username: user, eventid: event}, (res) => {
		console.log(res);

		// TODO
	});
}

function removeAssistant(assistant, event) {
	console.log("removeAssistant(" + assistant + ", " + event + ")");

	var table_assistants = $(".event tbody")[0];
	table_row_assistant.innerHTML = table_row_assistant.innerHTML
		.replace("${event_id}", event.id);

	$("#" + assistant).remove();

	if (assistant === user) {
		var row = table_row_assistant.cloneNode(true);
		row.innerHTML = row.innerHTML
			.replace("${assistant}", "")
			.replace("hoverable", "")
			.replace("glyphicon-remove", "glyphicon-plus")
			.replace("disabled", "hoverable clickable")
			.replace("remove", "add")
			.replace("${assistant}", user);
		row.lastElementChild.lastElementChild.classList.remove("hide");
		table_assistants.appendChild(row);
	}

	$.post("dummy.json", {username: assistant, eventid: event}, (res) => {
		console.log(res);

		// TODO
	});
}


/* POST functions */
function addEvent(src, user) {
	if ($("#eventname")[0].value === "") {
		$("#eventname")[0].parentElement.classList.add("has-error");
		return;
	} else {
		$("#eventname")[0].parentElement.classList.remove("has-error");
	}
	if ($("#date")[0].value === "") {
		$("#date")[0].parentElement.classList.add("has-error");
		return;
	} else {
		$("#date")[0].parentElement.classList.remove("has-error");
	}
	if ($("#time")[0].value === "") {
		$("#time")[0].parentElement.classList.add("has-error");
		return;
	} else {
		$("#time")[0].parentElement.classList.remove("has-error");
	}
	if ($("#description")[0].value === "") {
		$("#description")[0].parentElement.classList.add("has-error");
		return;
	} else {
		$("#description")[0].parentElement.classList.remove("has-error");
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
	$.post("dummy.json", event, (res) => {
		console.log(res);

		// TODO

		loadList();
	});
}


/* Other functions */
function click(src) {
	unclick();
	src.addClass("active");
}

function unclick() {
	$(".active").removeClass("active");
}

function makeDatePretty(datetime) {
	return datetime;
}

function changeLocation(destiny) {
	var location = window.location.hash;
	var tokens = location.split("/");

	tokens[1] = destiny;

	if (destiny === "event") {
		while (tokens.length > 4) {
			tokens.splice(4, 1);
		}
		tokens[2] = user;
	} else if (tokens[2] === "") {
		while (tokens.length > 2) {
			tokens.splice(2, 1);
		}
	} else {
		while (tokens.length > 3) {
			tokens.splice(3, 1);
		}
		tokens[2] = user;
	}

	window.location.hash = tokens.join("/")
}

function getUser() {
	if (user === undefined || user === "") {
		var location = window.location.hash;
		var token = location.split("/")[2];

		if (token === "") {
			return undefined;
		}

		user = token;
	} else {
		var location = window.location.hash;
		var tokens = location.split("/");
		tokens[2] = user;
		window.location.hash = tokens.join("/");
	}

	$(".nav-username")[0].textContent = user;

	return user;
}

function isUserIntoList(username, userlist) {
	for(var user of userlist) {
		if (user.name === username) {
			return true;
		}
	}

	return false;
}

function getEvent(eventid) {
	if (eventid === undefined || eventid === "") {
		var location = window.location.hash;
		var tokens = location.split("/");

		if (tokens.length < 4 || tokens[3] === "") {
			return undefined;
		}

		eventid = tokens[3];
	} else {
		var location = window.location.hash;
		var tokens = location.split("/");
		tokens[3] = eventid;
		window.location.hash = tokens.join("/");
	}

	return eventid;
}

function sortAssistants(list) {
	list.sort();
}

function sortEvents(list) {
	list.sort((a, b) => a.datetime.localeCompare(b.datetime));
}