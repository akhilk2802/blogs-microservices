package com.blogs.user.service;

import com.blogs.user.entity.Profile;
import com.blogs.user.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }


    public List<Profile> getAllProfiles(){
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileById(long id){
        return profileRepository.findById(id);
    }

    public Profile createProfile(Profile profile){
        return profileRepository.save(profile);
    }

    public Profile updateProfile(long id, Profile profileDetails) {
        return profileRepository.findById(id).map(profile -> {
            profile.setUserId(profileDetails.getUserId());
            profile.setUserName(profileDetails.getUserName());
            profile.setBio(profileDetails.getBio());
            profile.setProfilePictureUrl(profileDetails.getProfilePictureUrl());
            profile.setLocation(profileDetails.getLocation());
            profile.setWebsite(profileDetails.getWebsite());
            return profileRepository.save(profile);
        }).orElseGet(() -> {
            profileDetails.setId(id);
            return profileRepository.save(profileDetails);
        });
    }

    public void deleteProfile(long id) {
        profileRepository.deleteById(id);
    }

}
