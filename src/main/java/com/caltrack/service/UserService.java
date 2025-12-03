package com.caltrack.service;

import com.caltrack.dto.RegisterRequest;
import com.caltrack.dto.UserProfileResponse;
import com.caltrack.dto.UserProfileUpdateRequest;
import com.caltrack.exception.ConflictException;
import com.caltrack.exception.ResourceNotFoundException;
import com.caltrack.model.User;
import com.caltrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserProfileResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .age(request.getAge())
                .height(request.getHeight())
                .weight(request.getWeight())
                .activities(request.getActivities())
                .build();

        return toProfile(userRepository.save(user));
    }

    public UserProfileResponse getProfile(Long userId) {
        return toProfile(getUser(userId));
    }

    @Transactional
    public UserProfileResponse updateProfile(Long userId, UserProfileUpdateRequest request) {
        User user = getUser(userId);
        user.setName(request.getName());
        user.setAge(request.getAge());
        user.setHeight(request.getHeight());
        user.setWeight(request.getWeight());
        user.setActivities(request.getActivities());
        return toProfile(userRepository.save(user));
    }

    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private UserProfileResponse toProfile(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .age(user.getAge())
                .height(user.getHeight())
                .weight(user.getWeight())
                .activities(user.getActivities())
                .email(user.getEmail())
                .build();
    }
}

