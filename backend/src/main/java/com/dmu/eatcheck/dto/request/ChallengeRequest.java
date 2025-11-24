package com.dmu.eatcheck.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeRequest {
    private Integer userPk; //사용자 식별번호(User엔티티의 id칼럼)
}
