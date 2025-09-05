pipeline {
    agent any

    environment {
        JAVA_HOME = "C:\\Program Files\\Java\\jdk-21"
        PATH = "${JAVA_HOME}\\bin;${env.PATH}"
        TOMCAT_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/username/library-backend.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building WAR with Maven...'
                bat 'mvn clean package'
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                echo 'Stopping Tomcat...'
                bat "\"%TOMCAT_HOME%\\bin\\shutdown.bat\""
                
                echo 'Copying WAR to Tomcat webapps...'
                bat "copy target\\*.war \"%TOMCAT_HOME%\\webapps\\\" /Y"

                echo 'Starting Tomcat...'
                bat "\"%TOMCAT_HOME%\\bin\\startup.bat\""
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
