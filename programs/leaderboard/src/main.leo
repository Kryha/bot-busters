program leaderboard.aleo {
    struct User {
        id: field;
        score: u64;
    }

    // mapping at key `0` is the first user on the leaderboard
    mapping users: u8 => User;

    // array length is set to 16 because Leo only supports 16 calls to `set` per call
    transition update_scores(user_ids: [field; 16], new_scores: [u64; 16], slice: u8) {
        assert_eq(self.caller, self.signer);
        assert(slice < 4u8); // we only need 4 slices to update 100 positions

        return then finalize(user_ids, new_scores, slice);
    }

    finalize update_scores(user_ids: [field; 16], new_scores: [u64; 16], slice: u8) {
        for i: u8 in 0u8..16u8 {
            let key: u8 = (slice * 16u8) + i + 1u8;
            let user_id: field = user_ids[i];
            let new_score: u64 = new_scores[i];

            let keyOrNull: u8 = user_id != 0field ? key : 0u8;

            Mapping::set(users, keyOrNull, User {
                id: user_id,
                score: new_score,
            });
        }
    }
}
