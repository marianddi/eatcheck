package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@Entity
@AllArgsConstructor
@Table(name = "goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Long goalId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "target_weight")
    private double targetWeight;

    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "update_at")
    private LocalDate updateAt;

    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL)
    private List<Weight_log> weightLogs = new ArrayList<>();
}
