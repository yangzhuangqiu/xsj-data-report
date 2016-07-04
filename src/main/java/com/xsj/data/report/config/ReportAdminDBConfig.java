package com.xsj.data.report.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author shadow_
 */
@Configuration
@ConfigurationProperties(prefix="com.xsj.data.report.admin")
public class ReportAdminDBConfig {

    private String dbHost;

    private int dbPort;

    private String dbUser;

    private String dbPassword;

    private String dbName;

    public void setDbHost(String dbHost) {
        this.dbHost = dbHost;
    }

    public void setDbPort(int dbPort) {
        this.dbPort = dbPort;
    }

    public void setDbUser(String dbUser) {
        this.dbUser = dbUser;
    }

    public void setDbPassword(String dbPassword) {
        this.dbPassword = dbPassword;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public String getDBHost() {
        return dbHost;
    }

    public int getDBPort() {
        return dbPort;
    }

    public String getDBUser() {
        return dbUser;
    }

    public String getDBPassword() {
        return dbPassword;
    }

    public String getDBName() {
        return dbName;
    }

}
