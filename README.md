# Modern-devops-pipeline
Tools used 

## Architecture

## Steps in brief
### 1. Creation of app and manual deployment
-  Creating a Kubernetes cluster in azure eks

```bash
az aks create \
    --resource-group NetworkWatcherRG \
    --name AKS \
    --node-count 1 \
    --node-vm-size Standard_B2ls_v2 \
    --enable-addons monitoring \
    --generate-ssh-keys
```
- Getting the creds for azure
```
 az aks get-credentials --resource-group NetworkWatcherRG --name AKS
```
- Deploying a msql db with secret
```
kubectl create secret generic mysql-secret \
  --from-literal=mysql-user=yourusername \
  --from-literal=mysql-password=yourpassword
```
- Deploying a mysql server on K8s  _mysql.yaml_
  - Choosing to go with 100Mi is intentional as we dont need much during testing

- Writing a simple node.js application with mysql in the back for storing data -- _check server.js_
  - Its a dynamic apps that takes data from /manhwa endpoint
  
- Using docker file to create a docker image   -- _check docker file_
- Deploying the node app on k8s -- _check k8s/yaml_
  
![Screenshot 2025-01-29 at 5 11 01 PM](https://github.com/user-attachments/assets/b405e8dc-5953-4fc2-ac7f-4e7fd36e6811)
### 2. Integration CI principles 

- Using github actions we create CI for this
  - Steps taken in CI
  1. Implemented simple tests 
  2. Pushing to docker
  3. In the second job 
  4. ** Implemented that change of new docker image in the app.yaml file **

- Updating the changes in the app.yaml file allows us to have one push CI/CD with Argocd

### 3. Installing argo cd
- Installing argo cd in the cluster with official doc
- Applyin the argocd.yaml in k8s folder for application to be applied 
> As its a public repo we dont need any secrets 

### 4. Installing argo cd Rollout 
- For this i have decided to a lot of stuff for it work seamlessly
  1. Created a new namespace for rollouts versions
  2. Connected to default service of mysql coz i dont want to have another pod running without any use and this also showcase the coredns concept of kubernetes
  3. Implemented rollouts

- Created app_rollout.yaml under argo_rollout folder to deploy the application

<img src="https://github.com/user-attachments/assets/4022b4ca-2039-4ee5-b1b9-250e9848025e" width="1000" alt="Screenshot 2025-01-29 at 8 37 21 PM">



