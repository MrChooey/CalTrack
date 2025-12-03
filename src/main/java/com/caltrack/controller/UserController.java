package com.caltrack.controller;

import com.caltrack.config.UserPrincipal;
import com.caltrack.dto.UserProfileResponse;
import com.caltrack.dto.UserProfileUpdateRequest;
import com.caltrack.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public UserProfileResponse getProfile(@AuthenticationPrincipal UserPrincipal principal) {
        return userService.getProfile(principal.id());
    }

    @PutMapping("/profile")
    public UserProfileResponse updateProfile(@AuthenticationPrincipal UserPrincipal principal,
                                             @Valid @RequestBody UserProfileUpdateRequest request) {
        return userService.updateProfile(principal.id(), request);
    }
}

