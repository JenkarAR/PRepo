package com.example.event_dashboard.repository;

import com.example.event_dashboard.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticleDataRepository extends JpaRepository<ParticleData, Long> {
}
