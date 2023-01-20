pipeline {
    agent any

    stages {
        // stage('Configuration') {
        //     agent {label 'ansiblecontroller'}
        //     steps {
        //         ansiblePlaybook playbook: 'install-dependiences.yaml'
        //     }
        // }
       stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/jenkins-react-app"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/jenkins-react-app/"
            }
        }
    }
}