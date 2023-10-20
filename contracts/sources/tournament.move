// Tournament Contract

import 0x1::Event;
import 0x1::Vector;
import 0x1::CryptoHash;

module Tournament {
    use 0x1::Account;
    use 0x1::Event;
    use 0x1::Vector;
    use 0x1::CryptoHash;

    // Event emitted when the winning team is announced
    event WinnerAnnounced(addr: address, prize: u64);

    // Struct representing a team
    struct Team {
        teamId: u64,
        participant: address,
    }

    // Struct representing the Tournament
    struct Tournament {
        organizer: address,
        teams: Vector<Team>,
        prize: u64,
        winnerAnnounced: bool,
    }

    // Storage for the Tournament contract
    resource TournamentStorage {
        tournament: Tournament
    }

    // Initialize the Tournament contract
    public fun initialize(organizer: address, prize: u64): TournamentStorage {
        let teams: Vector<Team> = Vector::empty();
        let tournament: Tournament = Tournament {
            organizer: organizer,
            teams: teams,
            prize: prize,
            winnerAnnounced: false,
        };
        TournamentStorage { tournament: tournament }
    }

    // Function to add a team to the tournament
    public fun addTeam(address: address): u64 {
        let mut storage = &mut TournamentStorage::borrow_global();
        assert(!storage.tournament.winnerAnnounced, 1);

        let teamId = Vector::length(&storage.tournament.teams) as u64;
        let team = Team { teamId: teamId, participant: address };
        Vector::push_back(&mut storage.tournament.teams, team);

        teamId
    }

    // Function to announce the winner and distribute the prize
    public fun announceWinner(winningTeamId: u64) {
        let mut storage = &mut TournamentStorage::borrow_global();
        assert(!storage.tournament.winnerAnnounced, 2);
        assert(winningTeamId < Vector::length(&storage.tournament.teams) as u64, 3);

        let winningTeam = Vector::borrow(&storage.tournament.teams, winningTeamId as usize);
        assert(winningTeam.participant == Account::get_signer(), 4);

        // Transfer the prize to the winning team
        Account::pay_from_sender(winningTeam.participant, storage.tournament.prize);

        // Emit WinnerAnnounced event
        Event::emit<WinnerAnnounced>((winningTeam.participant, storage.tournament.prize));

        storage.tournament.winnerAnnounced = true;
    }
}
