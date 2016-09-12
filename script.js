var isRulesOpened = 0, isHistoryOpened = 0;

function goToTop() {
	document.body.scrollTo(0, 0);
};


function displayRulesFromTop() {
	if(isRulesOpened === 0) {
		$('#rules').slideToggle('fast');
	}
	document.getElementById('#rules').scrollIntoView();
}


function displayHistoryFromTop() {
	if(isHistoryOpened === 0) {
		$('#history').slideToggle('slow');
	}
}

function displayRules() {
	if(isRulesOpened === 0) {
		isRulesOpened = 1;
	}
	else {
		isRulesOpened = 0;
	}

	$('#rules').slideToggle('slow');
};

function displayHistory() {
	if(isHistoryOpened === 0) {
		isHistoryOpened = 1;
	}
	else {
		isHistoryOpened = 0;
	}
	

	$('#history').slideToggle('slow');

}



this.squares;
this.player = 1;
this.board_w = 8;
this.board_h = 8;
this.p1_tokens;
this.p2_tokens;

function initialize()
{
	this.squares = [];
	this.p1_tokens = 0;
	this.p2_tokens = 0;
	$(".board-space").remove();
	for (var i = 0; i < 8; i++)
	{
		var row = [];
		for (var j = 0; j < 8; j++)
		{
			var square = 
			{
				y: i, 
				x: j,
				is_king: false,
				render: function()
				{
					if (this.color)
					{
						switch(this.token)
						{
							case 0: 
								this.img = "bsquare.png";
								break;
							case 1:
								if (this.is_king)
								{
									this.img = "bsquarek1.png";
								}
								else
								{
									this.img = "bsquare1.png";
								}
								break;
							case 2:
								if (this.is_king)
								{
									this.img = "bsquarek2.png";
								}
								else
								{
									this.img = "bsquare2.png";
								}
								break;
						}
					}
					else
					{
						this.img = "rsquare.png"
					}
					return this.img;
				},
				getTokenImg: function()
				{
					var id = "#" + this.y + "-" + this.x;
					var img = $(id);
					return img;
				}
			}
			if ((i % 2 && !(j % 2)) || !(i % 2) && j % 2)
			{
				square.color = 1;
				if (i < (board_h / 2 - 1))
				{
					square.token = 2;
				}
				else if (i > (board_h - (board_h / 2)))
				{
					square.token = 1;
				}
				else
				{
					square.token = 0;
				}
			}
			else
			{
				square.color = 0;
				square.token = 0;
			}
			img = new Image();
			img.src = square.render();
			row.push(square);
		}
		this.squares.push(row);
	} 
	render();
}

function render()
{
	var board = document.getElementById("checkerboard");
	for (var i = 0; i < 8; i++)
	{
		for (var j = 0; j < 8; j++)
		{
			var img = new Image();
			var square = this.squares[i][j];
			img.src = square.render();
			img.classList.add("board-space");
			if (square.token)
			{
				img.classList.add("token")
				if (square.token === 1)
				{
					this.p1_tokens++;
					img.classList.add("p1");
				}
				else
				{
					this.p2_tokens++;
					img.classList.add("p2");
				}
			}
			img.id = i + "-" + j;
			board.appendChild(img);
		}
		//board.appendChild(document.createElement("br"));
	}
	$(".p1").addClass("player-token");
	$(".player-token").on("click", function(event) {
		event.stopPropagation();
		doTurn(event.target, false);
	});
	$("#play_button").hide();
	$("#popup").hide();
	$("#checkerboard").show();
}

function gameOver()
{
	$("#popup-msg").text("Player " + this.player + " wins!");
	$("#popup").show();
}

function doTurn(token, has_jumped)
{
	$(".player-token").off("click");
	$(token).addClass("selected-token");
	var square = getSquare(token);
	var img_name = "activebsquare";
	if (square.is_king)
	{
		img_name += "k";
	}
	img_name += this.player + ".png";
	$(token).attr("src", img_name);
	var moves = getMoves(square, has_jumped);
	if (moves.length === 0 && has_jumped)
	{
		unselect();
		changePlayer();
		return;
	}
	for (move of moves)
	{
		var move_token = move.getTokenImg();
		$(move_token).addClass("possible-move");
		$(move_token).attr("src", "bsquaremove.png");
	}
	
	$(".possible-move").on("click", function(event) {
		$(".board-space").off();
		event.stopPropagation();	
		doMove(event.target, square);
	});
	if (has_jumped) {
		$(token).on("click", function(event) {
			event.stopPropagation();
			skipTurn();
		});
	}
	else
	{
		$(token).on("click", function(event) {
			event.stopPropagation();
			cancelMove();
		});
	}
}

function doMove(token, square)
{
	$(".selected-token").removeClass("selected-token");
	var old_token = square.getTokenImg();
	square.token = 0;
	$(old_token).attr("src", square.render());
	$(old_token).removeClass("token");
	var token_class = "p" + this.player;
	$(old_token).removeClass(token_class);
	removePossibleMoves();
	var new_square = getSquare(token);
	var jump = false;
	if (Math.abs(new_square.x - square.x) === 2)
	{
		jump = true;
		doJump(square, new_square);
	}
	new_square.token = this.player;
	new_square.is_king = square.is_king;
	square.is_king = false;
	$(token).addClass("token");
	$(token).addClass("player-token");
	$(token).addClass(token_class);
	if (jump)
	{
		$(token).attr("src", new_square.render());
		doTurn(token, true);
	}
	else
	{
		$(token).attr("src", new_square.render());
		changePlayer();
	}
	if (!new_square.is_king && ((new_square.token === 1 && new_square.y === 0) || 
			(new_square.token === 2 && new_square.y === this.board_h - 1)))
	{
		new_square.is_king = true;
		$(token).attr("src", new_square.render());
	}
	if (!this.p1_tokens || !this.p2_tokens)
	{
		gameOver();
	}
}

function doJump(square, new_square)
{
	var jumped_square_x = (new_square.x - square.x) / 2 + square.x;
	var jumped_square_y = (new_square.y - square.y) / 2 + square.y;
	var jumped_square = this.squares[jumped_square_y][jumped_square_x];
	jumped_square.token = 0;
	var jumped_token = jumped_square.getTokenImg();
	$(jumped_token).attr("src", jumped_square.render());
	var other_player = this.player === 1 ? 2 : 1;
	jumped_token.removeClass(("p" + other_player));
	jumped_token.removeClass("token");
	if (other_player === 1)
	{
		this.p1_tokens--;
	}
	else
	{
		this.p2_tokens--;
	}
	$(new_square.getTokenImg).addClass("player-token")
}

function changePlayer()
{
	$(".player-token").removeClass("player-token");
	this.player = (this.player === 1) ? 2 : 1;
	$(".p" + this.player).addClass("player-token");
	$(".player-token").on("click", function(event) {
		event.stopPropagation();
		doTurn(event.target);
	});
}

function unselect()
{
	var square = getSquare($(".selected-token"));
	$(".selected-token").attr("src", square.render());
	$(".selected-token").removeClass("selected-token");
}

function cancelMove()
{
	$(".selected-token").off("click");
	$(".possible-move").off("click");
	removePossibleMoves();
	$(".player-token").on("click", function(event) {
		$(".player-token").off("click");
		event.stopPropagation();
		doTurn(event.target)
	});
	unselect();
}

function skipTurn()
{
	$(".possible-move").off("click");
	removePossibleMoves();
	unselect();
	changePlayer();
}

function getSquare(token)
{
	var token_id = $(token).attr("id");
	var y = token_id.substr(0, token_id.indexOf("-"));
	var x = token_id.substr(token_id.indexOf("-") + 1);
	var square = this.squares[y][x];
	return square;
}

function getMoves(square, has_jumped)
{
	var y_dir = (square.token === 1) ? -1 : 1;
	var possible_moves = [];
	var move;
	if (move = calculateEmptySquare(square, y_dir, -1, has_jumped))
	{
		possible_moves.push(move);
	}
	if (move = calculateEmptySquare(square, y_dir, 1, has_jumped))
	{
		possible_moves.push(move);
	}
	if (square.is_king)
	{
		y_dir *= -1
		if (move = calculateEmptySquare(square, y_dir, -1, has_jumped))
		{
			possible_moves.push(move);
		}
		if (move = calculateEmptySquare(square, y_dir, 1, has_jumped))
		{
			possible_moves.push(move);
		}
	}
	return possible_moves;
}

function calculateEmptySquare(square, y_dir, x_dir, has_jumped)
{
	var move = null;
	var new_y = square.y + y_dir;
	var new_x = square.x + x_dir;
	if (isValidSquare(new_x, new_y))
	{
		var new_square = squares[new_y][new_x];
		if (!new_square.token && !has_jumped)
		{
			move = new_square;
		}
		else if (new_square.token && new_square.token != this.player)
		{
			new_y = new_y + y_dir;
			new_x = new_x + x_dir;
			if (isValidSquare(new_y, new_x))
			{
				new_square = squares[new_y][new_x];
				if(!new_square.token)
				{
					move = new_square;
				}
			}
		}
	}
	return move;
}

function removePossibleMoves()
{
	$(".possible-move").each(function()
	{
		var square = getSquare(this);
		$(this).attr("src", square.render());
	});
	$(".possible-move").removeClass("possible-move");
	
}

function isValidSquare(x, y)
{
	return (y < this.board_h && y >= 0 && x < this.board_w && x >= 0);
}
