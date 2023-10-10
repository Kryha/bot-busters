program leaderboard.aleo {

    struct Score {
        player: address;
        score: u64;
    }

    mapping leaderboard: address => u64;
    
    transition add_player(player: address) -> Score {
        is_owner_of_program();
        let initial_score: u64 = 1000u64;

        return then finalize(player, initial_score);
    }

    finalize add_player(player: address, score: u64) {
        let player_exists: bool = Mapping::contains(leaderboard, player);
        assert(!player_exists);

        Mapping::set(leaderboard, player, score);
    }

    transition update(player: address, current_score: u64, player_won: bool) {
        is_owner_of_program();

        let new_score: u64 = calculate_score(current_score, player_won);
        
        return then finalize(player, current_score, new_score);

    }

    finalize update(player: address, current_score: u64, new_score: u64) {
       let player_exists: bool = Mapping::contains(leaderboard, player);
       assert(player_exists);

       let current_onchain_score: u64 = Mapping::get(leaderboard, player);
       assert_eq(current_score,current_onchain_score);

       Mapping::set(leaderboard, player, new_score);
    }


    transition remove(player: address) {
        is_owner_of_program();

        return then finalize(player);
    }

    finalize remove(player:address) {
        let playerExists: bool = Mapping::contains(leaderboard, player);
        assert(playerExists);

        Mapping::remove(leaderboard, player);
    }

    function calculate_score(current_score: u64, player_won: bool) -> u64 {
            if(player_won) {
                return current_score + 10u64;
                
            } else if( !player_won && current_score == 10u64) {
                // lowest posible score is 10 
                return current_score;
            } else {
                return current_score - 10u64;
            }
    }

    // TODO: Change to the address of the Backend service
    // TODO: Paramaterize owner address
    // Local development address: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px
    inline is_owner_of_program() {
        let program_owner: address = aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px;
        assert_eq(self.caller, program_owner);
    }
}
