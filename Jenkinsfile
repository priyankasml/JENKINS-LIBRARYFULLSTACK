pipeline {
    agent any

    environment {
        // Maven tool configured in Jenkins (Global Tool Configuration)
        MAVEN_HOME = tool name: 'MAVEN', type: 'maven'
        PATH = "${MAVEN_HOME}/bin:${env.PATH}"
        
        // Git credentials ID you created in Jenkins
        GIT_CREDENTIALS = 'github-credentials'
        
        // Tomcat server details
        TOMCAT_URL = 'http://localhost:8080/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASSWORD = 'admin-password'
        WAR_NAME = 'library-backend-0.0.1-SNAPSHOT.war'
        WAR_PATH = 'library-backend/target/library-backend-0.0.1-SNAPSHOT.war'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo "Cloning Git repository..."
                git branch: 'main', url: 'https://github.com/priyankasml/JENKINS-LIBRARYFULLSTACK.git', credentialsId: "${GIT_CREDENTIALS}"
            }
        }

        stage('Build') {
            steps {
                echo "Building project with Maven..."
                dir('library-backend') {  // <- run Maven inside backend folder
                    bat "${MAVEN_HOME}\\bin\\mvn clean package -DskipTests"
                }
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                echo "Deploying WAR to Tomcat..."
                script {
                    def warFile = "${env.WAR_PATH}"
                    def deployURL = "${env.TOMCAT_URL}/deploy?path=/library&update=true"
                    bat "curl --upload-file ${warFile} --user ${TOMCAT_USER}:${TOMCAT_PASSWORD} ${deployURL}"
                }
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