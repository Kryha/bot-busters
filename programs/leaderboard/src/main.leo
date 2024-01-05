program leaderboard.aleo {
    struct User {
        id: field;
        score: u64;
        games_played: u64;
    }

    // mapping at key `0` is the first user on the leaderboard
    mapping users: u8 => User;

    transition update_scores(user_ids: [field; 32], new_scores: [u64; 32], slice: u8) {
        assert_eq(self.caller, self.signer);
        assert(slice < 4u8); // we only need 4 slices to update 100 positions

        return then finalize(user_ids, new_scores, slice);
    }

    finalize update_scores(user_ids: [field; 32], new_scores: [u64; 32], slice: u8) {
        for i: u8 in 0u8..32u8 {
            let key: u8 = (slice * 32u8) + i;
            let user_id: field = user_ids[i];

            let current_user: User = Mapping::get_or_use(users, key, User {
                id: user_id,
                score: 0u64,
                games_played: 0u64
            });

            Mapping::set(users, key, User {
                id: user_id,
                score: current_user.score + new_score,
                games_played: current_user.games_played + 1u64
            });
        }
    }
}
