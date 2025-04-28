package com.example.online_election.controller;

import com.example.online_election.entity.Candidate;
import com.example.online_election.entity.User;
import com.example.online_election.repository.CandidateRepository;
import com.example.online_election.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;

    public CandidateController(CandidateRepository candidateRepository, UserRepository userRepository) {
        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
    }

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<String> createCandidate(
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile avatar,
            Principal principal) {

        System.out.println("==> CreateCandidate Interface called");

        try {
            User user = userRepository.findByUsername(principal.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!Boolean.TRUE.equals(user.getIsAdmin())) {
                return ResponseEntity.status(403).body("Access denied: Only admin can create candidate.");
            }

            Candidate candidate = new Candidate();
            candidate.setName(name);
            candidate.setDescription(description);

            if (avatar != null && !avatar.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + StringUtils.cleanPath(avatar.getOriginalFilename());

                File uploadDir = new File(uploadPath);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                File dest = new File(uploadDir, fileName);
                avatar.transferTo(dest);

                candidate.setAvatarUrl("/uploads/" + fileName);
                System.out.println("Upload successful! Saved at: " + dest.getAbsolutePath());
            }

            candidateRepository.save(candidate);
            return ResponseEntity.ok("Candidate created successfully.");
        } catch (Exception e) {
            System.err.println("Upload failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }


    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }
}
