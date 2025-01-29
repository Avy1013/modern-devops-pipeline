# Modern-devops-pipeline
**Description**

## Architecture

## 🔧 Tools Used  

| Tool             | Description                                                                                       | Logo                                                                 |
|------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| **Kubernetes**   | Open-source platform for automating deployment, scaling, and managing containerized applications.  | <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" width="50" height="50"> |
| **Argo CD**      | Declarative, GitOps continuous delivery tool for Kubernetes applications.                         | <img src="https://argo-cd.readthedocs.io/en/stable/assets/logo.png" width="50" height="50"> |
| **Docker**       | Platform for developing, shipping, and running applications in containers.                        | <img src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" width="50" height="50"> |
| **GitHub Actions**| Automates software workflows directly in your GitHub repository, such as CI/CD pipelines.         | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="50" height="50"> |
| **Argo Rollouts**| Advanced deployment controller for Kubernetes providing features like canary releases and blue/green deployments. | <img src="https://github.com/user-attachments/assets/b8154184-db42-478a-adfb-be26db626595" width="50" height="50"> |
| **Prometheus**   | Monitoring tool for collecting and querying time-series data.                                      | <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg" width="50" height="50"> |
| **Grafana**      | Analytics and visualization of performance metrics.                                               | <img src="https://grafana.com/static/assets/img/fav32.png" width="50" height="50"> |
| **Elasticsearch**| Search and analytics engine used to store, search, and analyze large volumes of data.             | <img src="https://upload.wikimedia.org/wikipedia/en/9/97/Elastic_NV_logo.svg" width="100" height="100"> |
| **Fluentd**      | Open-source data collector for unified logging.                                                   | <img src="https://djeqr6to3dedg.cloudfront.net/repo-logos/library/fluentd/live/logo-1720462195267.png" width="50" height="50"> |
| **Kibana**       | Data visualization and exploration tool for Elasticsearch.                                        | <img src="https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blt4466841eed0bf232/5d082a5e97f2babb5af907ee/logo-kibana-32-color.svg" width="50" height="50"> |




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
> For demonstration just look in actions of this repo

### 3. Installing argo cd
- Installing argo cd in the cluster with official doc
- Applyin the argocd.yaml in k8s folder for application to be applied 
> As its a public repo we dont need any secrets

![Screenshot 2025-01-29 at 9 05 09 PM](https://github.com/user-attachments/assets/13a498d2-16ba-4b01-a9c3-a06e651445ef)


### 4. Installing argo cd Rollout 
- For this i have decided to a lot of stuff for it work seamlessly
  1. Created a new namespace for rollouts versions
  2. Connected to default service of mysql coz i dont want to have another pod running without any use and this also showcase the coredns concept of kubernetes
  3. Implemented rollouts

- Created app_rollout.yaml under argo_rollout folder to deploy the application

**Argocd rollout cli outputs**
<img src="https://github.com/user-attachments/assets/4022b4ca-2039-4ee5-b1b9-250e9848025e" width="1000" alt="Screenshot 2025-01-29 at 8 37 21 PM">

**Final output of Argo cd rollout dashboard**
![Screenshot 2025-01-29 at 9 13 35 PM](https://github.com/user-attachments/assets/1df5b770-5395-4839-8198-612adae0038f)

### 5. Observability and Monitoring 
- Installing prometheus and grafana
```
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set nodeSelector."kubernetes\.io/hostname"="aks-temp-10754646-vmss000000"
```
- Had to specifically tell k8s to schedule on a new node as the previos node memory got 100%
![Screenshot 2025-01-29 at 10 50 04 PM](https://github.com/user-attachments/assets/c8be7ebf-a42c-44fc-a8bb-2f11bd4a92b6)

**Grafana dashboard ⬇️**
![Screenshot 2025-01-29 at 10 39 07 PM](https://github.com/user-attachments/assets/4977253d-ecc2-449c-ba08-570fae895a88)
### Prometheus dashboard ⬇️
![Screenshot 2025-01-29 at 10 45 23 PM](https://github.com/user-attachments/assets/d3a8f14e-78a9-4109-9080-26f19b92d557)

- Installing EFK stack
- Will like to tell it took a lot time as there many pre requisite to it
- Also the system requirements in the default YAML was too much
So had to do a lot of customisation and took help from youtube

**Terminal view ⬇️**
<img width="891" alt="Screenshot 2025-01-30 at 2 06 42 AM" src="https://github.com/user-attachments/assets/5729a139-7f80-4aa8-a092-b23476341dd4" />
**index in elastic serach ⬇️**
<img width="1438" alt="Screenshot 2025-01-30 at 1 45 46 AM" src="https://github.com/user-attachments/assets/f5df8707-ae64-46ca-b656-ad2ecb631ec7" />
**logs of default namespace ⬇️**
<img width="1439" alt="Screenshot 2025-01-30 at 2 05 01 AM" src="https://github.com/user-attachments/assets/a15fd633-2090-4e8a-b56d-01006f0b9332" />







