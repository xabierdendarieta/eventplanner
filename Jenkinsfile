pipeline {

    agent any
    
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