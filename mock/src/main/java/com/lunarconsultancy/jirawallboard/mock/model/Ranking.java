package com.lunarconsultancy.jirawallboard.mock.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public final class Ranking {

    private Integer rankCustomFieldId;

    public Integer getRankCustomFieldId() {
        return rankCustomFieldId;
    }

    public void setRankCustomFieldId(Integer rankCustomFieldId) {
        this.rankCustomFieldId = rankCustomFieldId;
    }
}
