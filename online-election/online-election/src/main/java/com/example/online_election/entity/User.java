package com.example.online_election.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    private Boolean isAdmin = false;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = isAdmin ? "ROLE_ADMIN" : "ROLE_USER";
        return Collections.singletonList(() -> role);
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public String getRole() {
        return isAdmin ? "ADMIN" : "USER";
    }

    public void setRole(String role) {
        this.isAdmin = "ADMIN".equalsIgnoreCase(role);
    }
}
