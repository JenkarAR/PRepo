package com.example.event_dashboard.service;

import com.example.event_dashboard.entity.*;
import com.example.event_dashboard.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticleDataService {

    @Autowired
    private ParticleDataRepository repository;

    public ParticleData saveParticleData(ParticleData particleData) {
        return repository.save(particleData);
    }

    public List<ParticleData> getAllParticleData() {
        return repository.findAll();
    }
}
