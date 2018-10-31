package com.stripo.plugin.example.rest.dto;

import lombok.Data;

@Data
public class Template {
	private String html;
	private String css;
	private Boolean minimize;
}
