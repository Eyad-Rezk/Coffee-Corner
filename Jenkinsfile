pipeline {
  agent any
  tools{
    nodejs 'node22.19'
  }
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Eyad-Rezk/Coffee-Corner.git'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'cd backend && npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'cd backend && npm run build'
      }
    }
    stage('Build docker img') {
      steps {
        sh 'cd backend && docker build -t eyadrezk/coffee-backend:latest .'
      }
    }
    stage('Push docker img') {
      environment{
        DOCKER_HUB = credentials('Docker-cred')
      }
      steps {
        sh 'echo ${DOCKER_HUB_PSW} | docker login -u ${DOCKER_HUB_USR} --password-stdin'
        sh 'docker push eyadrezk/coffee-backend:latest'
      }
    }
  }
}