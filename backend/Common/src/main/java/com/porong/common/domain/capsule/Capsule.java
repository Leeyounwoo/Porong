package com.porong.common.domain.capsule;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "capsule")
public class Capsule {

    @Id
    @Column(name = "capsule_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long capsuleId;

    @Column(name = "capsule_name")
    private String capsuleName;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude")
    private double longitude;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "due_time")
    private LocalDateTime dueTime;

    @JsonIgnore
    @OneToMany(mappedBy = "capsule", cascade = CascadeType.ALL)
    private List<MemberHasCapsule> memberHasCapsuleList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "capsule", cascade = CascadeType.ALL)
    private List<Post> postList = new ArrayList<>();

}
