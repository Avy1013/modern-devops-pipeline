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
### 2. Integration Devops principles 
- Using github actions we create CI for this



- Integrating ci with github acitons
