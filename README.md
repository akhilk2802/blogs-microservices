# Blogs Microservices Project

## Overview
### This project is a practice initiative to learn the basics of DevOps concepts and tools. It involves building a monorepo-based microservice architecture, with each microservice developed using different frameworks. The auth-service microservice is implemented using NodeJS and MongoDB.

## Project Structure
#### auth-service: A NodeJS-based microservice responsible for basic authentication. It uses MongoDB as the database.
#### other-services: Working on it to build with different Framework


## Prerequisites
 - NodeJS
 - Docker
 - Kubernetes
 - Helm
 - Jenkins
 - SonarQube
 - Git
 - Kops (Kubernetes Operations)


 ## Setting up the project for auth-service
 1. Clone the repository 
    ```
    git clone https://github.com/akhilk2802/blogs-microservices.git
    cd blogs-microservices
    ```

 2. Install the dependencies
    ```
    cd auth-service
    npm install
    ```
 3. Run tests locally
    ```
    npm test
    ```
 4. Run the application locally
    ```
    npm start
    ```
 5. Dockerize the application 
    ```
    docker build -t {docker-username}/auth-service .
    ```
 6. Push the dockerized application
    ```
    docker login
    docker push {docker-username}/auth-service
    ```
 7. Deploy to Kubernetes using Helm
     Ensure you have Helm and Kubernetes configured, then deploy the service.
    ```
    helm upgrade --install auth-service ./auth-service-helm --set image.repository={docker-username}/auth-service --set image.tag=latest
    ```
 8. Deploy to Kubernetes using Kops
    ```
    kops create cluster --name=${K8S_CLUSTER_NAME} --state=${K8S_STATE_STORE} --zones=us-west-2a --node-count=2 --node-size=t2.micro --master-size=t2.micro --dns-zone=${K8S_CLUSTER_NAME}
    kops update cluster ${K8S_CLUSTER_NAME} --yes --state=${K8S_STATE_STORE}
    kops validate cluster --state=${K8S_STATE_STORE}
    ```

## CI/CD Pipeline with Jenkins:

1. Fetch Code: Clones the repository from GitHub.
2. Install Dependencies: Installs NodeJS dependencies for the auth-service.
3. Run Tests: Executes tests for the auth-service.
4. SonarQube Analysis: Runs static code analysis using SonarQube.
5. Quality Gate: Checks the quality gate status from SonarQube.
6. Build Docker Image: Builds a Docker image for the auth-service.
7. Push Docker Image: Pushes the Docker image to Docker Hub.
8. Remove Unused Docker Image: Cleans up the Docker image locally.
9. Deploy to Kubernetes with Helm: Deploys the auth-service to a Kubernetes cluster using Helm.


