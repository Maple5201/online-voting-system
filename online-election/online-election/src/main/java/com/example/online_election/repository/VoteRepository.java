package com.example.online_election.repository;

import com.example.online_election.dto.VoteResultDTO;
import com.example.online_election.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByUserId(Long userId);

    @Query("SELECT new com.example.online_election.dto.VoteResultDTO(v.candidate.name, COUNT(v)) " +
            "FROM Vote v GROUP BY v.candidate.name")
    List<VoteResultDTO> countVotesGroupedByCandidate();
}
