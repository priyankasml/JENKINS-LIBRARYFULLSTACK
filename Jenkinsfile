pipeline {
    agent any

    environment {
        // Maven tool configured in Jenkins
        MAVEN_HOME = tool name: 'MAVEN', type: 'maven'
        PATH = "${MAVEN_HOME}/bin:${env.PATH}"
        
        // Git credentials (if private repo)
        GIT_CREDENTIALS = 'github-credentials'

        // Tomcat server details
        TOMCAT_PATH = 'C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps'
    }

    stages {
        // ================= FRONTEND BUILD =================
        stage('Build Frontend') {
            steps {
                dir('library-frontend') {  // <-- Make sure folder name matches repo
                    echo "Installing frontend dependencies..."
                    bat 'npm install'
                    echo "Building frontend..."
                    bat 'npm run build'
                }
            }
        }

        // ================= FRONTEND DEPLOY =================
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat """
                if exist "${env.TOMCAT_PATH}\\library-react" (
                    rmdir /S /Q "${env.TOMCAT_PATH}\\library-react"
                )
                mkdir "${env.TOMCAT_PATH}\\library-react"
                xcopy /E /I /Y library-frontend\\dist\\* "${env.TOMCAT_PATH}\\library-react"
                """
            }
        }

        // ================= BACKEND BUILD =================
        stage('Build Backend') {
            steps {
                dir('library-backend') {  // <-- Make sure folder name matches repo
                    echo "Building backend with Maven..."
                    bat "${MAVEN_HOME}\\bin\\mvn clean package -DskipTests"
                }
            }
        }

        // ================= BACKEND DEPLOY =================
        stage('Deploy Backend to Tomcat') {
            steps {
                bat """
                if exist "${env.TOMCAT_PATH}\\springbootlibraryapi.war" (
                    del /Q "${env.TOMCAT_PATH}\\springbootlibraryapi.war"
                )
                if exist "${env.TOMCAT_PATH}\\springbootlibraryapi" (
                    rmdir /S /Q "${env.TOMCAT_PATH}\\springbootlibraryapi"
                )
                copy library-backend\\target\\*.war "${env.TOMCAT_PATH}\\"
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}
