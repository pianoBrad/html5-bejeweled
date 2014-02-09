/*************************************************

WHERE I LEFT OFF: MOVE SHIFTED ELEMENTS IN DOM & THEN RESCAN COLUMNS IN game_board ARRAY

* I optimized the code & it's running much quicker now
* check_board_for_matches works perfectly at the start of the game
* elements are clearing after matching
* After clear, jewels above empty spaces are transitioning

To-Dos

* Get transitioned elements to shift spots in the dom after the transition completes
* If swapped jewels don't result in matches, swap them back

*************************************************/



/*************************************************
			Define Global Variables
*************************************************/
var jewel_colors = ["blue","green","orange","purple","red","white","yellow"];
var game_board = []
var selected_jewel = "";


var jewel_above = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_two_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_three_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_four_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_five_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_six_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_seven_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
	
var jewel_left = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_two_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_three_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_four_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_five_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_six_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];
var jewel_seven_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];

/*************************************************
			Define Functions
*************************************************/

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


var populate_board = function() {

	$('.column .jewel-wrap').each(function() {
		if ( $(this).children().length == 0 ) {
			//grab a random jewel color
			shuffleArray(jewel_colors);
			var jewel_color = jewel_colors[0];

			$(this).html('<span class="jewel"></span>'); 
			$(this).children().addClass( jewel_color ).attr('data-color',jewel_color);
		}
	});

	$('.jewel').each(function(index) { 
		var jewel = get_jewel_attributes( $(this) );  
		game_board.push( jewel );
		$(this).attr('data-tile',index);
	});

}

var get_jewel_attributes = function(jewel) {
	// This function takes a given jewel and returns usable attributes related to that jewel

	var jewel_attributes = [];

	jewel_attributes.push( {'object' : $(jewel), 'color' : $(jewel).attr('data-color'), 'column' : parseInt( $(jewel).parent().parent().attr('data-column') ), 'order' : parseInt( $(jewel).parent().attr('data-order') ) } );

	return jewel_attributes;
}

var check_jewel_for_matches = function( jewel ) {}

var check_board_for_matches = function () {
	console.log('check board for matches called..');
	// This function scans the entire active game board for jewels and looks for matches

	// Create a global function array for storing all of the found matches
	var jewel_matches = [];
	var jewel_vertical_matches = [];
	var jewel_horizontal_matches = [];


	$(game_board).each(function(index) {
		
		var jewel = game_board[index];
		//console.log( jewel[0].color );

		// Check above & below the jewel for matching colors
		//var jewel_above = get_jewel_attributes( $(".column[data-column='"+jewel[0].column+"'] .jewel-wrap[data-order='"+(jewel[0].order + 1)+"'] .jewel") );

		jewel_above = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_two_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_three_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_four_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_five_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_six_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_seven_below = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ] , jewel_left = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_two_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_three_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_four_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_five_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_six_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ], jewel_seven_right = [ {'object' : '', 'color' : '', 'column' : '', 'order' : ''} ];

		if ( index > 0 && jewel[0].order < 8 && game_board[index-1][0].column == jewel[0].column ) { jewel_above = game_board[(index - 1)]; }
		if ( index < (game_board.length - 1) && jewel[0].order > 1 && game_board[index+1][0].column == jewel[0].column  ) { jewel_below = game_board[(index + 1)]; } 
		if ( index < (game_board.length - 2) && jewel[0].order > 2 && game_board[index+2][0].column == jewel[0].column  ) { jewel_two_below = game_board[(index + 2)]; }
		if ( index < (game_board.length - 3) && jewel[0].order > 3 && game_board[index+3][0].column == jewel[0].column  ) { jewel_three_below = game_board[(index + 3)]; }
		if ( index < (game_board.length - 4) && jewel[0].order > 4 && game_board[index+4][0].column == jewel[0].column  ) { jewel_four_below = game_board[(index + 4)]; }
		if ( index < (game_board.length - 5) && jewel[0].order > 5 && game_board[index+5][0].column == jewel[0].column  ) { jewel_five_below = game_board[(index + 5)]; }
		if ( index < (game_board.length - 6) && jewel[0].order > 6 && game_board[index+6][0].column == jewel[0].column  ) { jewel_six_below = game_board[(index + 6)]; }
		if ( index < (game_board.length - 7) && jewel[0].order > 7 && game_board[index+1][0].column == jewel[0].column  ) { jewel_seven_below = game_board[(index + 7)]; }

		if ( index > 7 && jewel[0].order == game_board[ index - 8 ][0].order ) { jewel_left = game_board[ index - 8 ]; }
		if ( index < 56 && jewel[0].order == game_board[ index + 8 ][0].order ) { jewel_right = game_board[ index + 8 ]; }
		if ( index < 48 && jewel[0].order == game_board[ index + 16 ][0].order ) { jewel_two_right = game_board[ index + 16 ]; }
		if ( index < 40 && jewel[0].order == game_board[ index + 24 ][0].order ) { jewel_three_right = game_board[ index + 24 ]; }
		if ( index < 32 && jewel[0].order == game_board[ index + 32 ][0].order ) { jewel_four_right = game_board[ index + 32 ]; }
		if ( index < 24 && jewel[0].order == game_board[ index + 40 ][0].order ) { jewel_five_right = game_board[ index + 40 ]; }
		if ( index < 16 && jewel[0].order == game_board[ index + 48 ][0].order) { jewel_six_right = game_board[ index + 48 ]; }
		if ( index < 8 && jewel[0].order == game_board[ index + 52 ][0].order ) { jewel_seven_right = game_board[ index + 52 ]; }

		/**
		if ( index > 7 && index < game_board.length - 7 ){
			console.log('jewel to the left of '+jewel[0].color+' jewel in column'+jewel[0].column+', row '+jewel[0].order+' is'+game_board[ index - 8 ][0].color);
		}
		**/
		

		var jewel_potential_matches = [ jewel_below[0], jewel_two_below[0], jewel_three_below[0], jewel_four_below[0], jewel_five_below[0], jewel_six_below[0], jewel_seven_below[0] ];
		var jewel_vertical_match = [jewel[0]];
		
		var v = 0;
		while ( v < (jewel_potential_matches.length + 1) && jewel[0].color == jewel_potential_matches[v].color && jewel[0].color != jewel_above[0].color && jewel[0].color != 'undefined' ) {
			jewel_vertical_match.push(jewel_potential_matches[v]); 
			//console.log('the '+jewel[0].color+' jewel at column '+jewel[0].column+' row '+jewel[0].order+' has a '+jewel_potential_matches[v].color+' jewel below it..' );
			v++
		} 

		if ( jewel_vertical_match.length >= 3 ) {
			jewel_vertical_matches.push(jewel_vertical_match);
			jewel_matches.push(jewel_vertical_match);
		}
		//console.log( 'the '+jewel[0].color+' jewel at column '+jewel[0].column+' row '+jewel[0].order+' has '+jewel_vertical_match.length+' matches..' );


		// console log test to verify functionality of vertical matching algorithm
		
		if ( jewel_vertical_match.length >= 3 ) {
			console.log('a group of vertical matches found in column '+jewel[0].column+', rows: ');
			var m = 0;
			while ( m < jewel_vertical_match.length ) { 
				console.log( jewel_vertical_match[m].order+' column'+jewel_vertical_match[m].column);
				m++; 
			}
			console.log('jewel matches array contains '+jewel_vertical_match.length+' jewels');
		}
		
		
		

		// Check left & right of the jewel for matching colors
		var jewel_potential_matches = [ jewel[0], jewel_right[0], jewel_two_right[0], jewel_three_right[0], jewel_four_right[0], jewel_five_right[0], jewel_six_right[0], jewel_seven_right[0] ];
		var jewel_horizontal_match = [];
		
		var h = 0;
		while ( h < jewel_potential_matches.length && jewel[0].color == jewel_potential_matches[h].color && jewel[0].color != jewel_left[0].color && jewel[0].color != 'undefined' ) {
			jewel_horizontal_match.push(jewel_potential_matches[h]); 
			h++
		}
		if (jewel_horizontal_match.length >= 3) {

			jewel_horizontal_matches.push(jewel_horizontal_match);
			jewel_matches.push(jewel_horizontal_match);
		}

		
		
		if ( jewel_horizontal_match.length >= 3 ) {
			console.log('a group of horizontal matches found in row '+jewel[0].order+', columns: ');
			var m = 0;
			while ( m < jewel_horizontal_match.length ) { 
				console.log( jewel_horizontal_match[m].column );
				m++; 
			}
			console.log('jewel matches array contains '+jewel_horizontal_match.length+' jewels');
		}
		
		
	});

	return jewel_matches;
}

var move_jewels_in_dom = function(jewel_one, jewel_two) {
	//All this variable does is ensure that the trigger & animations only fire once per function call
	var toggle = true;

	console.log('move jewels in dom function fired..');
	jewel_one[0].object.css('border','0px none');
	jewel_two[0].object.css('border','0px none');
	$(document).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', '.jewel', function() {
		if ( toggle === true ) {
			var jewel_one_color = jewel_one[0].color;
			var jewel_two_color = jewel_two[0].color;

			jewel_one[0].object.transition({ x: "0px", y: "0px" },0).attr('data-color',jewel_two[0].color).removeClass(jewel_one[0].color).addClass(jewel_two[0].color);
			jewel_two[0].object.transition({ x: "0px", y: "0px" },0).attr('data-color',jewel_one[0].color).removeClass(jewel_two[0].color).addClass(jewel_one[0].color);

			//change the array values to reflect the actual changes on screen
			var m = 0;
			while ( m <= game_board.length ) {
				if ( jewel_one[0].object.attr( 'data-tile' ) == m ) {
					game_board[m][0].color = jewel_two_color;
					console.log('changed color in array to '+game_board[m][0].color);
				} else if ( jewel_two[0].object.attr( 'data-tile' ) == m ) {
					game_board[m][0].color = jewel_one_color;
					console.log('changed color in array to '+game_board[m][0].color);
				}
				m++;
			}

			jewel_two[0].object.trigger('color-attribute-changed');

			toggle = false;
		} else {
			toggle = true;
		}
	
	});

}

var swap_jewels = function( jewel_one, jewel_two ) {
	console.log('swap jewels called..');

	//if the 2 jewels are directionally related, swap 'em!
	if ( ( jewel_one[0].column == jewel_two[0].column ) && ( ( jewel_one[0].order - jewel_two[0].order ) == 1 || ( jewel_two[0].order - jewel_one[0].order == 1 ) ) ) {
		//the jewels are vertical neighbors
		var jewel_height = jewel_one[0].object.parent().outerHeight();
		if ( jewel_one[0].order > jewel_two[0].order ) {
			//jewel 1 is above jewel 2
			//console.log(jewel_one[0].object);
			//jewel_one[0].object.css('top',jewel_height+'px');
			jewel_one[0].object.transition({ y: jewel_height+"px" });
			jewel_two[0].object.transition({ y: "-"+jewel_height+"px" });

			move_jewels_in_dom(jewel_one, jewel_two);
			
		} else {
			//jewel 1 is below jewel 2
			jewel_one[0].object.transition({ y: "-"+jewel_height+"px" });
			jewel_two[0].object.transition({ y: jewel_height+"px" });

			move_jewels_in_dom(jewel_one, jewel_two);
		}
		console.log('the jewels are vertical neighbors');

	} else if ( ( jewel_one[0].order == jewel_two[0].order ) && ( ( jewel_one[0].column - jewel_two[0].column == 1 ) || ( jewel_two[0].column - jewel_one[0].column == 1 ) ) ) {
		//the jewels are horizontal neighbors
		var jewel_width = jewel_one[0].object.parent().parent().outerWidth();
		if ( jewel_one[0].column > jewel_two[0].column ) {
			//jewel 1 is right of jewel 2
			console.log(jewel_one[0].object);
			jewel_one[0].object.transition({ x: "-"+jewel_width+"px" });
			jewel_two[0].object.transition({ x: jewel_width+"px" });

			move_jewels_in_dom(jewel_one, jewel_two);
		} else {
			//jewel 1 is left of jewel 2
			jewel_one[0].object.transition({ x: jewel_width+"px" });
			jewel_two[0].object.transition({ x: "-"+jewel_width+"px" });

			move_jewels_in_dom(jewel_one, jewel_two);
		}
		console.log('the jewels are horizontal neighbors');

		jewel_one[0].object.css('border','0px none');
		jewel_two[0].object.css('border','0px none');
	} else {
		//the jewels aren't neighbors, don't swap 'em
		console.log("the jewels aren't neighbors, don't swap 'em..");
		
		jewel_one[0].object.css('border','0px none');
		jewel_two[0].object.css('border','0px none');
	}

}

var select_jewel = function(jewel) {
	if ( selected_jewel == "" ) {
		//first jewel clicked
		//var jewel_one = get_jewel_attributes(selected_jewel);
		selected_jewel = jewel;
		jewel[0].object.css('border','5px solid #000000');
	} else {
		//second jewel clicked
		var jewel_one = selected_jewel;
		var jewel_two = jewel;

		jewel_two[0].object.css('border','5px solid #000000');
		swap_jewels(jewel_one, jewel_two);

		selected_jewel = "";
	}
}

var start_game = function() {

	$(document).on( "click", ".jewel", function() { 
		//select_jewel( $(this) );
		select_jewel( game_board[$(this).attr('data-tile')] );
	});
}

var unmatch_board = function(matches_found) {
	//To unmatch, just look for the 3rd match of the series & change that color..the 3rd element in any series changed will always disrupt the matches
	//console.log('unmatch board called..');
	var m = 0;

	while ( m < matches_found.length ) {
		console.log('the match is for color '+matches_found[m][0].color);
		var n = 0;
		while ( n < matches_found[m].length ) {
			console.log('checking element '+(n+1)+' of the series..located at column '+matches_found[m][n].column+', row '+matches_found[m][n].order);
			if ( n == 2 ) {
				//This is the 3rd element in the series, find all the colors around it & change it to be different than it's surroundings
				console.log( 'we have the 3rd matching element in the series..' );
				console.log(matches_found[m][n].object[0])
				var jewel_above = get_jewel_attributes( $(".column[data-column='"+matches_found[m][n].column+"'] .jewel-wrap[data-order='"+(matches_found[m][n].order + 1)+"'] .jewel") );
				var jewel_below = get_jewel_attributes( $(".column[data-column='"+matches_found[m][n].column+"'] .jewel-wrap[data-order='"+(matches_found[m][n].order - 1)+"'] .jewel") );
				var jewel_left = get_jewel_attributes( $(".column[data-column='"+(matches_found[m][n].column - 1)+"'] .jewel-wrap[data-order='"+matches_found[m][n].order+"'] .jewel") );
				var jewel_right = get_jewel_attributes( $(".column[data-column='"+(matches_found[m][n].column + 1)+"'] .jewel-wrap[data-order='"+matches_found[m][n].order+"'] .jewel") );
		
				var jewel_blocked_colors = [ jewel_above[0].color, jewel_below[0].color, jewel_left[0].color, jewel_right[0].color ];
				var available_colors = $(jewel_colors).not(jewel_blocked_colors).get();
				
				var jewel_new_color = shuffleArray(available_colors);
				console.log('new color for jewel is '+jewel_new_color[0]);
				$(matches_found[m][n].object).attr('data-color',jewel_new_color[0]).removeClass(matches_found[m][n].color).addClass(jewel_new_color[0]);

				//Update the attributes of the newly unmatched jewel in the game_board array
				var jewel_position_in_board = parseInt($(matches_found[m][n].object).attr('data-tile'));
				console.log('updating game board color of changed jewel from '+game_board[jewel_position_in_board][0].color+" to "+jewel_new_color[0]);
				game_board[jewel_position_in_board][0].color = jewel_new_color[0];
				
			}	
			n++;
		}
		m++;
	}
	console.log('removing newly unmatched elements from the stored matches array..');
	matches_found = [];

	start_game();
}

var move_row_in_dom = function(jewels_to_move, num_rows) {
	console.log('moving dropped row of jewels in the dom..');
	var j = 0;
	while ( j < jewels_to_move.length ) {
		var r = parseInt(jewels_to_move[j].parent().attr('data-order'));
		var new_container = jewels_to_move[j].parent().parent().find("[data-order='"+(r - num_rows)+"']").children('.jewel-wrap');
		$(new_container).prepend(jewels_to_move[j]);

		/** 
			appendTo not working..maybe easier to copy html from jewels_to_move[j] and paste that into the empty slot it's supposed to go in..
		**/

		j++;
	}
}


var drop_columns = function( columns ) {
	console.log('drop columns now');
	var c = 0;
	while ( c < columns.length ) {
		console.log('checking column '+columns[c]);

		$( 'ul.column' ).each(function() {
			if ( $(this).attr('data-column') == columns[c] ) {
				//We need to adjust the jewels in this column (move 'em down)
				//find the first empty container in the column
				var r = 8;
				var total_empty = [];
				while ( r > 0 ) {
					if ( $( this ).find("[data-order='"+r+"']").children('.jewel-wrap .jewel').length == 0 ) {
						//there is no jewel here
						console.log( r );
						total_empty.push(r);
					};
					r--;
				}
				console.log("there are "+total_empty.length+" open spots in column "+columns[c]);
				console.log("the first open spot in column "+columns[c]+" is in row "+total_empty[0]);

				//move each row above the highest empty row down
				r = total_empty[0] + 1;
				rows = total_empty.length;
				var jewel_height = $('.jewel-wrap').outerHeight();
				var jewels_to_move = [];
				last_jewel_to_move = $( this ).find("[data-order='8']").children('.jewel-wrap .jewel');

				while( r <= 8 ) {
					jewel_to_move = $( this ).find("[data-order='"+r+"']").children('.jewel-wrap .jewel');
					jewels_to_move.push(jewel_to_move);
					jewel_to_move.transition({ y: (jewel_height * rows)+"px" });
					//move the jewel in the dom
					

					r++;
				}

				$(document).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', last_jewel_to_move, function() {
					move_row_in_dom( jewels_to_move, total_empty.length );		
				});
			} 
		});

		c++;
	};
}

var num_matches_in_column = function(column) {

	$(column).children().children().each(function() {
		console.log(this);
	})

}

var clear_matches = function(matches) {
	var m = 0;
	var columns = [];

	console.log('clear matches now..');

	while ( m < matches[0].length ) {
		var jewel_position_in_board = parseInt( $( matches[0][m].object ).attr('data-tile') );
		var vertical_match = [];
		var horizontal_match = [];
		console.log( matches[0].length );
		console.log( matches[0][m].object );

		//determine the first & last matches in each column, for each set of matches

		//if the matches are vertical
		if ( m > 0 && matches[0][m].color == matches[0][m-1].color ) {

		}

		m++;
	}

}

$(document).ready(function() {

	populate_board();

	var matches_found = check_board_for_matches();

	if ( matches_found.length === 0 ) {
		//console.log( 'no matches..start the game!' );
		start_game();
	} else {
		//console.log(matches_found.length+' matches found..clean it up!');
		unmatch_board(matches_found);
	}

	$(document).on('color-attribute-changed', function() {
		console.log('color change event fired');
		$(document).off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', '.jewel');
		//this happens after the user has clicked 2 jewels & a swap animation has occured
		matches_found = [];
		matches_found = check_board_for_matches();

		//Now that the swap is made, check the board for matches
		if ( matches_found.length === 0 ) {
			//no matches, swap back..
			console.log('no matches, swap back..');
		} else {
			//matches! clear 'em out
			console.log('matches found! clear them out..');
			//console.log(matches_found);
			clear_matches(matches_found);
		}
	});

});