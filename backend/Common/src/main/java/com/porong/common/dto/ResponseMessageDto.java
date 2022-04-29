package com.porong.common.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResponseMessageDto implements Serializable {

    private boolean isChecked; // 확인 여부 추가

}
