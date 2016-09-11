
var isRulesOpened = 0;

function goToTop() {
	document.body.scrollTo(0, 0);
};

function displayRules() {
	if(Boolean(isRulesOpened)) {
		document.getElementById("rules").style.display = "none";
		isRulesOpened = 0;
	}
	else {
		isRulesOpened = 1;
		document.getElementById("rules").style.display = "block";
	}
    
};
