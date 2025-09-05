pipeline {
    agent any

    environment {
        // Java & Maven environment if needed
        JAVA_HOME = "C:\\Program Files\\Java\\jdk-21"
        PATH = "${JAVA_HOME}\\bin;C:\\Program Files\\Apache\\maven\\bin;${env.PATH}"
        
        // Tomcat details
        TOMCAT_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
        WAR_NAME = "library-backend-0.0.1-SNAPSHOT.war"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your repo with PAT credentials
                git(
                    branch: 'main',
                    url: 'https://github.com/priyankasml/JENKINS-LIBRARYFULLSTACK.git',
                    credentialsId: 'github-credentials'
                )
            }
        }

        stage('Build') {
            steps {
                echo "Building project with Maven..."
                bat "mvn clean package -DskipTests"
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                echo "Deploying WAR to Tomcat..."
                // Stop Tomcat
                bat "\"%TOMCAT_HOME%\\bin\\shutdown.bat\""
                sleep 5
                
                // Copy WAR to Tomcat webapps
                bat "copy target\\${WAR_NAME} %TOMCAT_HOME%\\webapps\\${WAR_NAME}"
                
                // Start Tomcat
                bat "\"%TOMCAT_HOME%\\bin\\startup.bat\""
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Success!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
