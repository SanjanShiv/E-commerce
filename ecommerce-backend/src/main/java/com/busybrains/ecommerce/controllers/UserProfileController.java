package com.busybrains.ecommerce.controllers;

import com.busybrains.ecommerce.models.User;
import com.busybrains.ecommerce.payload.request.ChangePasswordRequest;
import com.busybrains.ecommerce.payload.request.UserProfileRequest;
import com.busybrains.ecommerce.payload.response.MessageResponse;
import com.busybrains.ecommerce.repositories.UserRepository;
import com.busybrains.ecommerce.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    private User getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(userDetails.getId()).orElse(null);
    }

    @GetMapping
    public ResponseEntity<?> getProfile() {
        User user = getCurrentUser();
        if (user == null) return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody UserProfileRequest profileRequest) {
        User user = getCurrentUser();
        if (user == null) return ResponseEntity.badRequest().body(new MessageResponse("User not found"));

        if (!user.getUsername().equals(profileRequest.getUsername()) && userRepository.existsByUsername(profileRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
        }

        if (!user.getEmail().equals(profileRequest.getEmail()) && userRepository.existsByEmail(profileRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use!"));
        }

        user.setUsername(profileRequest.getUsername());
        user.setEmail(profileRequest.getEmail());
        if (profileRequest.getFullName() != null) user.setFullName(profileRequest.getFullName());
        if (profileRequest.getPhoneNumber() != null) user.setPhoneNumber(profileRequest.getPhoneNumber());
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest passwordRequest) {
        User user = getCurrentUser();
        if (user == null) return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        
        if (user.getProvider() != null && !user.getProvider().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot change password for OAuth2 users"));
        }

        if (!encoder.matches(passwordRequest.getOldPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Incorrect old password"));
        }

        user.setPassword(encoder.encode(passwordRequest.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Password changed successfully"));
    }
}
