package com.xsj.data.report.dao.impl.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import com.xsj.data.report.dao.ReportAdminDAO;
import com.xsj.data.report.domain.ReportAppConfig;

@Repository
@Primary
public class ReportAdminDAOCacheImpl implements ReportAdminDAO{

	@Autowired
	private ReportAdminDAO reportAdminDAOMysqlImpl;

	@Override
	public ReportAppConfig getReportAppConfigByAppId(String appId) {
		return reportAdminDAOMysqlImpl.getReportAppConfigByAppId(appId);
	}
	


	
}
