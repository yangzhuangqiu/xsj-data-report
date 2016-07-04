package com.xsj.data.report.dao;

import com.xsj.data.report.domain.ReportAppConfig;

public interface ReportAdminDAO {

	ReportAppConfig getReportAppConfigByAppId(String appId);
}
