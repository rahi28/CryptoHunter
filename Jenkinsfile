pipeline {
    agent any

    stages {
        stage('Configuration') {
            agent {label 'ansiblecontroller'}
            steps {
                ansiblePlaybook playbook: 'install-dependiences.yml'
            }
        }
        stage('Build') {
            steps {
                echo 'Testing..'
            }
        }
    }
}