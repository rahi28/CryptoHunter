pipeline {
    agent any

    stages {
        stage('Configuration') {
            agent {label 'ansiblecontroller'}
            steps {
                ansiblePlaybook playbook: 'install-dependiences.yaml'
            }
        }
        stage('Build') {
            steps {
                echo 'Testing..'
            }
        }
    }
}