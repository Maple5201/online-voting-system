package com.example.online_election.dto;

public class VoteResultDTO {
    private String candidateName;
    private Long voteCount;

    public VoteResultDTO(String candidateName, Long voteCount) {
        this.candidateName = candidateName;
        this.voteCount = voteCount;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }
}
