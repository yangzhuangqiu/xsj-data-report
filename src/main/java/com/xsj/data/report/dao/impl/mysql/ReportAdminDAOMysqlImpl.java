package com.xsj.data.report.dao.impl.mysql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.xsj.data.report.dao.ReportAdminDAO;
import com.xsj.data.report.domain.ReportAppConfig;

@Repository
public class ReportAdminDAOMysqlImpl implements ReportAdminDAO{

	//private final Log log = LogFactory.getLog(getClass());
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public ReportAppConfig getReportAppConfigByAppId(String appId) {
		String sql = "SELECT * FROM report_app_config WHERE appId = ? ORDER BY id DESC LIMIT 1";
		List<ReportAppConfig> list = jdbcTemplate.query(sql, new Object[]{appId}, new BeanPropertyRowMapper<ReportAppConfig>(ReportAppConfig.class));
		if(null == list || list.isEmpty())
			return null;
		return list.get(0);
	}
	
	
	
	
	
}
