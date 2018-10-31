package com.stripo.plugin.example.rest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PluginTokenParams {
	private String pluginId;
	private String secretKey;
}
