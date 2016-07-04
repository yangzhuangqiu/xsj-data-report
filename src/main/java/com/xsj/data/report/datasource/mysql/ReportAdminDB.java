package com.xsj.data.report.datasource.mysql;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import com.xsj.data.report.config.ReportAdminDBConfig;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

/**
 * @author shadow_
 */
@Configuration
@EnableTransactionManagement
public class ReportAdminDB implements TransactionManagementConfigurer{

	private final Logger log = LoggerFactory.getLogger(getClass());
	
    @Autowired
    private ReportAdminDBConfig reportAdminDBConfig;

    /**
     * 数据连接池
     * @return
     */
    @Bean(destroyMethod = "close")
    @Primary
    DataSource dataSource(){
        HikariConfig hiConfig = new HikariConfig();
        String url = "jdbc:mysql://" + reportAdminDBConfig.getDBHost() + ":" + reportAdminDBConfig.getDBPort() + "/" + reportAdminDBConfig.getDBName();// + "?useUnicode=true&characterEncoding=UTF-8";
        hiConfig.setDriverClassName("com.mysql.jdbc.Driver");
        hiConfig.setAutoCommit(false);
        hiConfig.setJdbcUrl(url);
        hiConfig.setUsername(reportAdminDBConfig.getDBUser());
        hiConfig.setPassword(reportAdminDBConfig.getDBPassword());
        DataSource dataSource = new HikariDataSource(hiConfig);
        log.info(">>>>dataSource init success:" + dataSource);
        return dataSource;
    }
    
    @Bean
    @Primary
	JdbcTemplate jdbcTemplate(){
		return new JdbcTemplate(dataSource());
	}

    /**
     * 事务管理器
     * @return
     */
    @Bean
    public DataSourceTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
    
    
	@Override
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		return this.transactionManager();
	}

}
