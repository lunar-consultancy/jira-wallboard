package com.lunarconsultancy.jirawallboard.mock.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Collection;

@JsonInclude(JsonInclude.Include.NON_NULL)
public final class Column {

    private String name;
    private Integer max;
    private Collection<Status> statuses;

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<Status> getStatuses() {
        return statuses;
    }

    public void setStatuses(Collection<Status> statuses) {
        this.statuses = statuses;
    }
}
