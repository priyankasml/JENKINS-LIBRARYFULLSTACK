pipeline {
    agent any

    environment {
        // Maven tool configured in Jenkins
        MAVEN_HOME = tool name: 'MAVEN', type: 'maven'
        PATH = "${MAVEN_HOME}/bin:${env.PATH}"
    }

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('library-frontend') { // <-- Your React frontend folder
                    echo "Installing dependencies..."
                    bat 'npm install'
                    echo "Building frontend..."
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactlibrary" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactlibrary"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactlibrary"
                xcopy /E /I /Y library-frontend\\build\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactlibrary"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('library-backend') { // <-- Your Spring Boot backend folder
                    echo "Building backend with Maven..."
                    bat "${MAVEN_HOME}\\bin\\mvn clean package -DskipTests"
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibraryapi.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibraryapi.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibraryapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibraryapi"
                )
                copy "library-backend\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
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
