program leaderboard.aleo {

    struct Score {
        player: address;
        score: i64;
    }

    mapping leaderboard: address => i64;
    
    transition add_player(player: address) -> Score {
        is_owner_of_program();
        let initial_score: i64 = 0i64;

        return then finalize(player, initial_score);
    }

    finalize add_player(player: address, score: i64) {
        let player_exists: bool = Mapping::contains(leaderboard, player);
        assert(!player_exists);

        Mapping::set(leaderboard, player, score);
    }

    transition update(player: address, current_score: i64, player_won: bool) {
        is_owner_of_program();

        let new_score: i64 = calculate_score(current_score, player_won);
        
        return then finalize(player, current_score, new_score);

    }

    finalize update(player: address, current_score: i64, new_score: i64) {
       let player_exists: bool = Mapping::contains(leaderboard, player);
       assert(player_exists);

       let current_onchain_score: i64 = Mapping::get(leaderboard, player);
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

    function calculate_score(current_score: i64, player_won: bool) -> i64 {
        if (!player_won && current_score <= 10i64){
            return 0i64;
        }
        let updated_score :i64 = player_won ? current_score + 10i64 : current_score - 10i64;

        return updated_score;
    }

    // TODO: Change to the address of the Backend service
    // TODO: Paramaterize owner address
    // Local development address: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px
    inline is_owner_of_program() {
        let program_owner: address = aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px;
        assert_eq(self.caller, program_owner);
    }
}
