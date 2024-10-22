program leaderboard.aleo {
    const ADMIN_0: address = aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px;

    struct User {
        id: field;
        score: u64;
    }

    struct BoardElement {
        slice: u8;
        score: [User; 25]
    }

    struct Leaderboard {
        open: bool;
        standings: [BoardElement; 4];
    }

    mapping leaderboards: u8 => Leaderboard;
    mapping admins: address => bool;
    mapping current_day: u8 => u8;

    async transition initialize () -> Future {
        let caller: address = self.caller;
        assert_eq(caller, ADMIN_0);

        return finalize_initialize();
    }

    async function finalize_initialize() {
        // Ensure the leaderboard is not already initialized
        let already_initialized: bool = current_day.contains(0u8);
        assert(!already_initialized);

        current_day.set(0u8, 1u8);
    }

    async transition create_daily_leaderboard (standings: [BoardElement; 4]) -> Future {
        let caller: address = self.caller;
        assert_eq(caller, ADMIN_0);

        return finalize_create_daily_leaderboard(standings);
    }

    async function finalize_create_daily_leaderboard(standings: [BoardElement; 4]) {

        let curr_day: u8 = current_day.get(0u8);
        let current_leaderboard: Leaderboard = Leaderboard {
            open: true,
            standings: standings
        };

        leaderboards.set(curr_day, current_leaderboard);
    }

    async transition end_daily_leaderboard () -> Future {
        let caller: address = self.caller;
        assert_eq(caller, ADMIN_0);

        return finalize_end_daily_leaderboard();
    }

    async function finalize_end_daily_leaderboard() {

        let curr_day: u8 = current_day.get(1u8);
        let current_leaderboard: Leaderboard = leaderboards.get(1u8);
        assert(current_leaderboard.open);

        let final_leaderboard: Leaderboard = Leaderboard {
            open: false,
            standings: current_leaderboard.standings
        };

        leaderboards.set(curr_day, current_leaderboard);

        let new_day: u8 = curr_day + 1u8;
        current_day.set(0u8, new_day);
    }
}
