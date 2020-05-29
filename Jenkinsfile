pipeline {

    agent { 
        docker {
            image 'node:8.10.0'
        }
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
                sh 'sudo npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'sudo npm test'
            }
        }
    }
}
