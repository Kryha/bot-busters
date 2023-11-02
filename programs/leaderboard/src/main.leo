program leaderboard.aleo {
    struct User {
        username: field;
        score: u64;
        games_played: u64;
        // encrypted_address: address;
    }

    mapping users: field => User;

    transition update_score(user_id: field, username: field, new_score: u64) {
        // TODO: validate zPass
        assert_eq(self.caller, self.signer);
        return then finalize(user_id, username, new_score);
    }

    finalize update_score(user_id: field, username: field, new_score: u64) {
        // TODO: also store encrypted/hashed address after zPass implementation
        let current_user: User = Mapping::get_or_use(users, user_id, User {
            username,
            score: 0u64,
            games_played: 0u64
        });

        Mapping::set(users, user_id, User {
            username,
            score: current_user.score + new_score,
            games_played: current_user.games_played + 1u64
        });
    }
}
