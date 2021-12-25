# CS3219 OTOT Task A1

## Requirements
1. Docker
2. Kubectl

## Steps to reproduce
1. Ensure Docker Desktop is running, enable Kubernetes in the settings

2. Clone this repository:
`git clone https://github.com/MarcusTw/CS3219_TaskA2.git `

3. Build docker image:
`docker build -t cs3219-taska2 .`

4. Create a Deployment using the deployment.yaml file
`kubectl apply -f ./nginx-deployment.yaml`

5. Check to see the pods are running successfully (it should run successfully after a while)
`kubectl get pods`

6. Create a service using the service.yaml
`kubectl apply -f ./nginx-service.yaml`

7. Go to [http://localhost:32407](http://localhost:32407) to view the static html file.