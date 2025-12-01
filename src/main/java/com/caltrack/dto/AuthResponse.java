package com.caltrack.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class AuthResponse {
    String message;
    UserProfileResponse profile;
}

