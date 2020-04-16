appName = '/eventplanner/';

/* Router */
$(document).ready(route);

function route() {
	var location = window.location.hash;
	console.log(location);

	var tokens = location.split("/");
	console.log(tokens);

	if (tokens[1] == undefined) {
		loadHome();
		return;
	}

	if (tokens[1] === "new") {
		loadNew();
	} else if (tokens[1].split("_")[0] === "event") {
		loadEvent();
	} else if (tokens[1] === "list") {
		loadList();
	} else if (tokens[1] === "user") {
		loadUser();
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
	$("#user").hide();
	$("#login").hide();

	changeLocation("home");
}

function loadNew() {
	if (getUser() == undefined) {
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
	$("#user").hide();
	$("#login").hide();

	changeLocation("new");
}

function loadEvent(src) {
	var event = getEvent(src);
	if (event == undefined) {
		return;
	}

	if (getUser() == undefined) {
		loadHome();
		return;
	} else {
		$("#navbar-state-user").show();
		$("#navbar-state-login").hide();
	}

	unclick();

	$("#home").hide();
	$("#new").hide();
	$("#event").show();
	$("#list").hide();
	$("#user").hide();
	$("#login").hide();

	changeLocation("event_" + event);
}

function loadList() {
	if (getUser() == undefined) {
		loadHome();
		return;
	} else {
		$("#navbar-state-user").show();
		$("#navbar-state-login").hide();
	}

	click($("#navbar-list"));

	$("#home").hide();
	$("#new").hide();
	$("#event").hide();
	$("#list").show();
	$("#user").hide();
	$("#login").hide();

	changeLocation("list");
}

function loadUser() {
	if (getUser() == undefined) {
		loadHome();
		return;
	} else {
		$("#navbar-state-user").show();
		$("#navbar-state-login").hide();
	}

	click($("#navbar-user"));

	$("#home").hide();
	$("#new").hide();
	$("#event").hide();
	$("#list").hide();
	$("#user").show();
	$("#login").hide();

	changeLocation("user");
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
	$("#user").hide();
	$("#login").show();

	changeLocation("login");
}

function login() {
	var location = window.location.hash;
	var tokens = location.split("/");

	tokens[2] = "myuserid";

	window.location.hash = tokens.join("/");

	loadHome();
}

function logout() {
	var location = window.location.hash;
	var tokens = location.split("/");

	// console.log(tokens);
	// while (tokens.length > 2) {
	// 	console.log(tokens.splice(2, 1));
	// 	console.log(tokens);
	// }

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

	window.location.hash = tokens.join("/")
}

function getUser() {
	var location = window.location.hash;
	var tokens = location.split("/");

	return tokens[2];
}

function getEvent(src) {
	console.log(src);

	event = "myeventid"

	return event;
}