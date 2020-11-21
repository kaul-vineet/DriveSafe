# DriveSafe: An IoT use case for auto industry. 
## Built and orchestrated on Salesforce platform.

## Step 1: Deploy Salesforce application. 

- Click on the button below to install the DriveSafe application package. The Salesforce Org should be Enterprise and above.

<a href="https://githubsfdeploy.herokuapp.com?owner=kaul-vineet&amp;repo=DriveSafe">
  <img src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png" alt="Deploy SriveSafe to Salesforce" />
</a>

Once the package is successfullt deployed, follow the steps below: 

- On your iPhone, open "Settings". 
  - Go to "General" >>  "About".
  - Tap on "Name".
  - Change the "Name" of your phone to something unique *e.g. your initials*.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/IMG_1DDDAA6A93B9-1.jpeg">

- Activate the flow **Violatiob Creation**. This flow is part of the installed package.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/Flow%20Screen-shot.png">


- Goto App Lancher and open application **DriveSafe**.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/app%20launcher.png">


- Create a new contact record with your name or use any of the existing contacts from "All Contacts" list view.
  - Use any default account for the contact.
 <img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/Screenshot%202020-08-13%20at%2011.34.23%20PM.png">


- Go to the **Vehicles** tab.
  - Create a new Vehicle record and assign the contact created in the last step.
  - Enter your iPhone NAME under **VIN** field on the vehicle record, as recorded in the first step. **THIS STEP IS VERY IMPORTANT**
  - Fill in rest of the fields as you see fit.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/Screenshot%202020-08-13%20at%2011.37.01%20PM.png">


## Step 2: Deploy Mule Application on CloudHub. 


## Step 3: Deploy NODE-RED on Heroku. 

- <a href="https://signup.heroku.com/"> Sign up for a Heroku account. </a> I am using <a href="https://github.com/joeartsea"> Atsushi Kojo's </a> implementation of NODE-RED on Heroku. 
- Setup a NODE-RED instance on Heroku. Click on the deploy button below and follow the steps. 
- Add the following user-defined variables.
  - NODE_RED_USERNAME - the username to secure the editor with
  - NODE_RED_PASSWORD - the password to secure the editor with
<a href="https://heroku.com/deploy?template=https://github.com/joeartsea/node-red-heroku/tree/master">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

- Navigate to <a href="https://dashboard.heroku.com/"> Heroku Dashboard. </a>
  - Open the NODE-RED application. 
  - Click on the **Resource** tab.
  

- Provision a MQTT server to the NODE-RED application.
  - Under **Add-On**, type *CloudMQTT*. A CloudMQTT option would appear. Click on it. 
  - Select a free plan in the provisioning pop-up and click on *Sumbit Order Form*. 
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/MQTT%20-%20install.png">
  
- Once provisioned, CloudMQTT would appear under Add-ons. Click on the CloudMQTT icon in the list to go to the CloudMQTT setup. 
  - In ClodMQTT setup, note the following
   - Server
   - User 
   - Password
   - Port
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/MQTT.png">
  
  
- Login into the Heroku App. 
  - Use NODE_RED_USERNAME & NODE_RED_PASSWORD as credentials.


- Click on hamburger menu at top right corner. 
  - Click on *Manage palette
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/import-flow.png">
  
  
- Install two libraries
  - node-red-contrib-moment 4.0.0
  - node-red-contrib-throttle 0.1.6
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/install-moment.png">
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/install-throttle.png">


- Click on hamburger menu at top right corner. 
  - Click on *Import*.
  - Import the <a href="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/flows/flows.json"> flow definition </a> in NODE-RED instance.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/import-flow.png">


- 
## The `sfdx-project.json` File

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

The most important parts of this file for getting started are the `sfdcLoginUrl` and `packageDirectories` properties.

The `sfdcLoginUrl` specifies the default login URL to use when authorizing an org.

The `packageDirectories` filepath tells VS Code and Salesforce CLI where the metadata files for your project are stored. You need at least one package directory set in your file. The default setting is shown below. If you set the value of the `packageDirectories` property called `path` to `force-app`, by default your metadata goes in the `force-app` directory. If you want to change that directory to something like `src`, simply change the `path` value and make sure the directory you’re pointing to exists.

```json
"packageDirectories" : [
    {
      "path": "force-app",
      "default": true
    }
]
```


