// The 'leaderboard' program.
program leaderboard.aleo {

    struct Score {
        player: address;
        score: i64;
    }

    mapping leaderboard: address => i64;
    
    transition new (player:address) ->  Score{
        is_owner_of_program();
        let initialScore: i64 = 0i64;
        let score: Score = Score{
            player: player,
            score: initialScore
        };

        return score then finalize(player,initialScore);
    }

    finalize new (player:address, score:i64) {
        let playerExists: bool = Mapping::contains(leaderboard, player);
        assert(!playerExists);

        Mapping::set(leaderboard, player, score);
    }

    transition update (player:address, current_score:i64, win:bool) ->  Score{
        is_owner_of_program();

        let newScore: i64 = calculate_score(current_score,win);

        let score: Score = Score{
            player: player,
            score: newScore
        };
        
        return score then finalize(player,current_score, newScore);

    }

    finalize update (player:address,current_score:i64, new_score:i64) {
       let playerExists: bool = Mapping::contains(leaderboard, player);
       assert(playerExists);

       let current_onchain_score: i64 = Mapping::get(leaderboard, player);
       assert_eq(current_score,current_onchain_score);

       Mapping::set(leaderboard, player, new_score);
    }


    // TODO: Change to the address of the Backend address
    // Local development address: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px
    transition remove (player:address){
        let is_owner:bool = is_owner_of_program();

        return then finalize(player);
    }

    finalize remove (player:address) {
        let playerExists: bool = Mapping::contains(leaderboard, player);
        assert(playerExists);

        Mapping::remove(leaderboard, player);
    }

    function calculate_score(current_score:i64, win:bool) -> i64 {
            if(win){
                return current_score + 10i64;
            }else{
                return current_score - 10i64;
            }
    }

    // TODO: Change to the address of the Backend address
    // Local development address: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px
    inline is_owner_of_program(){
        let program_owner: address = aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px;
        assert_eq(self.caller, program_owner);
    }
}
