package com.example.event_dashboard.controller;

import com.example.event_dashboard.entity.*;
import com.example.event_dashboard.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/particle")
@CrossOrigin(origins = "http://localhost:3000")  // Change if you use a different port for React
public class ParticleDataController {

    @Autowired
    private ParticleDataService service;

    // Save particle data
    @PostMapping("/save")
    public ParticleData saveParticleData(@RequestBody ParticleData particleData) {
        return service.saveParticleData(particleData);
    }

    // Get all particle data
    @GetMapping("/all")
    public List<ParticleData> getAllParticleData() {
        return service.getAllParticleData();
    }
}
