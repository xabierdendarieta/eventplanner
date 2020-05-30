pipeline {

    agent { 
        docker {
            image 'node:8.10.0'
        }
    }
    
    environment {
        HOME = '.'
    }
    
    tools{nodejs "node"}
    
    stages{
    
        stage ('Cloning GitHub') {
            steps {
                git 'https://github.com/xabierdendarieta/eventplanner/'
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
