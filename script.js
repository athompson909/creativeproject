
var isRulesOpened = 0;

function goToTop() {
	document.body.scrollTo(0, 0);
};

function displayRules() {
	if(Boolean(isRulesOpened)) {
		//document.getElementById("rules").style.display = "none";
		//isRulesOpened = 0;
	}
	else {
		//isRulesOpened = 1;
		//document.getElementById("rules").style.display = "block";
		$(document).ready(function() {
			$('#rules_bottom_a').after('<div id=\"rules\"><h3>THE RULES OF CHECKERS</h3><p>Draughts (or checkers) is played by two opponents, on opposite sides of the gameboard. One player has the dark pieces; the other has the light pieces. Players alternate turns. A player may not move an opponent\'s piece. A move consists of moving a piece diagonally to an adjacent unoccupied square. If the adjacent square contains an opponent\'s piece, and the square immediately beyond it is vacant, the piece may be captured (and removed from the game) by jumping over it.</p><p>Only the dark squares of the checkered board are used. A piece may move only diagonally into an unoccupied square. Capturing is mandatory in most official rules, although some rule variations make capturing optional when presented.  In almost all variants, the player without pieces remaining, or who cannot move due to being blocked, loses the game.</p><h4>Men</h4><p>Uncrowned pieces (men) move one step diagonally forward, and capture an opponent\'s piece by moving two consecutive steps in the same line, jumping over the piece on the first step. Multiple opposing pieces may be captured in a single turn provided this is done by successive jumps made by a single piece; the jumps do not need to be in the same line but may "zigzag" (change diagonal direction). In English draughts men can capture only forward, but in international draughts and Russian draughts they may also capture (diagonally) backwards.</p><h4>King</h4><p>When a man reaches the crownhead or kings row (the farthest row forward), it becomes a king, and is marked by placing an additional piece on top of the first man, and acquires additional powers including the ability to move backwards (and capture backwards, in variants in which they cannot already do so). As with non-king men, a king may make successive jumps in a single turn provided that each jump captures an opponent man or king.</p><p>In international draughts, kings (sometimes called flying kings) move any distance along unblocked diagonals, and may capture an opposing man any distance away by jumping to any of the unoccupied squares immediately beyond it. Since captured pieces remain on the board until the turn is complete, it is possible to reach a position in a multi-capture move where the flying king is blocked from capturing further by a piece already captured.</p><p>Flying kings are not used in English draughts, in which a king\'s only advantage over a man is the ability to move and capture backwards as well as forwards.</p><p>Once a game has been gridlocked, where only back and forth moves between same locations on the board avoid jumps, the player with the majority of free space wins the games.</p><br><p><em>source: <a href=\"https://en.wikipedia.org/wiki/Draughts#General_rules\">Wikipedia</a></em></p></div>');
		});
	}
    
};
