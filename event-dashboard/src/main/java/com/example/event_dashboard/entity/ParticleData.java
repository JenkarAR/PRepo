package com.example.event_dashboard.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "particle_data")
public class ParticleData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
@Column(name = "Proton_Collision")
    private String name;

    @Column(name = "proton_collision_data")
    private String protonCollisionData;

    @Column(name = "previous_proton_collision_data")
    private String previousProtonCollisionData;

    // Constructors, Getters, Setters
    public ParticleData() {}

    public ParticleData(String name, String protonCollisionData, String previousProtonCollisionData) {
        this.name = name;
        this.protonCollisionData = protonCollisionData;
        this.previousProtonCollisionData = previousProtonCollisionData;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProtonCollisionData() {
		return protonCollisionData;
	}

	public void setProtonCollisionData(String protonCollisionData) {
		this.protonCollisionData = protonCollisionData;
	}

	public String getPreviousProtonCollisionData() {
		return previousProtonCollisionData;
	}

	public void setPreviousProtonCollisionData(String previousProtonCollisionData) {
		this.previousProtonCollisionData = previousProtonCollisionData;
	}

    // Getters and Setters
}
