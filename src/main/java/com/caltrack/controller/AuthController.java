package com.caltrack.controller;

import com.caltrack.config.UserPrincipal;
import com.caltrack.dto.*;
import com.caltrack.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
        private final AuthenticationManager authenticationManager;
        private final SecurityContextRepository securityContextRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserProfileResponse profile = userService.register(request);
        return ResponseEntity.ok(AuthResponse.builder()
                .message("Registration successful")
                .profile(profile)
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request,
                                              HttpServletRequest servletRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Save authentication to session
        securityContextRepository.saveContext(SecurityContextHolder.getContext(), servletRequest, null);

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        UserProfileResponse profile = userService.getProfile(principal.id());
        return ResponseEntity.ok(AuthResponse.builder()
                .message("Login successful")
                .profile(profile)
                .build());
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpServletRequest request) throws ServletException {
        request.logout();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(AuthResponse.builder()
                .message("Logout successful")
                .build());
    }
}

