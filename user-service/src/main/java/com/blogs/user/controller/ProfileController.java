package com.blogs.user.controller;

import com.blogs.user.entity.Profile;
import com.blogs.user.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/allprofiles")
    public List<Profile> getAllProfiles(){
        return profileService.getAllProfiles();
    }

    @GetMapping("/getprofilebyid/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable long id) {
        Optional<Profile> profile = profileService.getProfileById(id);
        if (profile.isPresent()) {
            return ResponseEntity.ok(profile.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/createprofile")
    public Profile createProfile(@RequestBody Profile profile) {
        return profileService.createProfile(profile);
    }

    @PutMapping("/updateprofile/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable long id, @RequestBody Profile profileDetails) {
        Profile updatedProfile = profileService.updateProfile(id, profileDetails);
        return ResponseEntity.ok(updatedProfile);
    }

    @DeleteMapping("/deleteprofile/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable long id) {
        profileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }

}
