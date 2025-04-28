package com.example.online_election.controller;

import com.example.online_election.dto.VoteRequest;
import com.example.online_election.dto.VoteResultDTO;
import com.example.online_election.entity.Candidate;
import com.example.online_election.entity.User;
import com.example.online_election.entity.Vote;
import com.example.online_election.repository.CandidateRepository;
import com.example.online_election.repository.UserRepository;
import com.example.online_election.repository.VoteRepository;
import com.example.online_election.util.AesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private AesUtil aesUtil;

    @PostMapping
    public ResponseEntity<String> castVote(@RequestBody VoteRequest request, Principal principal) {
        String username = principal.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (voteRepository.findByUserId(user.getId()).isPresent()) {
            return ResponseEntity.badRequest().body("You have already cast your vote");
        }

        Candidate candidate = candidateRepository.findById(request.getCandidateId())
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setCandidate(candidate);
        vote.setEncryptedData(aesUtil.encrypt(candidate.getName()));
        voteRepository.save(vote);

        return ResponseEntity.ok("Voting successful");
    }

    @GetMapping("/results")
    public ResponseEntity<List<VoteResultDTO>> getResults() {
        List<VoteResultDTO> results = voteRepository.countVotesGroupedByCandidate();
        return ResponseEntity.ok(results);
    }
}

