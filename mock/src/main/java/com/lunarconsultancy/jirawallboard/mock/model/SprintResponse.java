package com.lunarconsultancy.jirawallboard.mock.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Collection;

@JsonInclude(JsonInclude.Include.NON_NULL)
public final class SprintResponse extends Response {

    private Collection<Sprint> values;

    public Collection<Sprint> getValues() {
        return values;
    }

    public void setValues(Collection<Sprint> values) {
        this.values = values;
    }
}
