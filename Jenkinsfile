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
                sudo sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sudo sh 'npm test'
            }
        }
    }
}
