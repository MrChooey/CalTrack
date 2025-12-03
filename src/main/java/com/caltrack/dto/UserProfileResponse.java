package com.caltrack.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserProfileResponse {
    Long id;
    String name;
    Integer age;
    Double height;
    Double weight;
    String activities;
    String email;
}

