pipeline {
  agent any
  environment {
    SECRET_FILE_EXPRESS = credentials("customer-expressjs-env")
    SECRET_FILE_NEST = credentials("customer-nest-env")
    SECRET_FILE_REACT = credentials("customer-react-env")
  }
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage("Create ExpressJs Service ENV"){
        steps{
          dir("expressjs-service") {
            script {
              withCredentials([file(credentialsId: "customer-expressjs-env", variable: "SECRET_FILE_EXPRESS")]) {
                writeFile file: '.env', text: readFile(file: "${SECRET_FILE_EXPRESS}")
              }
            }
          }
        }
    }
    stage("Create NestJs Service ENV"){
      steps{
        dir("nest-service") {
          script {
            withCredentials([file(credentialsId: "customer-nest-env", variable: "SECRET_FILE_NEST")]) {
              writeFile file: '.env', text: readFile(file: "${SECRET_FILE_NEST}")
            }
          }
        }
      }
    }
    stage("Create React Service ENV"){
      steps{
        dir("frontend-service") {
          script {
            withCredentials([file(credentialsId: "customer-react-env", variable: "SECRET_FILE_REACT")]) {
              writeFile file: '.env', text: readFile(file: "${SECRET_FILE_REACT}")
            }
          }
        }
      }
    }
    stage("Build ExpressJs and NestJs Service") {
      steps {
        parallel (
          "run express" : {
            dir("expressjs-service") {
              bat "npm install"
              bat "node -r dotenv/config index.js"
              bat "node -r dotenv/config src/configs/db.config.js"
              bat "node index.js"
            }
          },
          "run nest": {
            dir("nest-service") {
              bat "npm install"
              bat "npm run start"
            }
          },
          "run react": {
            dir("frontend-service") {
              bat "npm install"
              bat "npm run dev"
            }
          }
        )
      }
    }
  }
}