# DriveSafe: An IoT use case for auto industry. 
## Built and orchestrated on Salesforce platform.

All technology professionals are increasingly being inundated with customer requirements to connect devices to CRM and/or customer engagement solutions. It is not just important to connect devices with CE systems, but the systems should ingest the streaming data and produce actionable insights into business behavior. IoT today is no longer technology, but a business problem and requires a business-centric solution. Today, companies use IoT data for operational performance in internal silos.

That is what we have tried to achieve in this submission. 

## Step 1: Deploy Salesforce application. 

- Click on the button below to install the DriveSafe application package. The Salesforce Org should be Enterprise and above.

<a href="https://githubsfdeploy.herokuapp.com?owner=kaul-vineet&amp;repo=DriveSafe">
  <img src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png" alt="Deploy SriveSafe to Salesforce" />
</a>


- On successful completion of the deployment, log-in into the Org.
 - Go-to Settings. Activate the flow **Violatiob Creation**. This flow is part of the installed package.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/Flow%20Screen-shot.png">


- Goto App Lancher and open application **DriveSafe**.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/app%20launcher.png">


- Create a new contact record with your name or use any of the existing contacts from **All Contacts** list view.
  - Use any default account for the contact.
 <img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/Screenshot%202020-08-13%20at%2011.34.23%20PM.png">



- Get the name of your phone:
  - On your iPhone, open "Settings". 
  - Go to "General" >>  "About".
  - Tap on "Name".
  - Change the "Name" of your phone to something unique *e.g. your initials*.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/IMG_1DDDAA6A93B9-1.jpeg">


- Go to the **Vehicles** tab.
  - Create a new Vehicle record and assign the contact created in the last step.
  - Enter your iPhone NAME under **VIN** field on the vehicle record, as recorded in the first step. **THIS STEP IS VERY IMPORTANT**
  - Fill in rest of the fields as you see fit.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/Screenshot%202020-08-13%20at%2011.37.01%20PM.png">


## Step 2: Deploy Mule Application on CloudHub. 

- Download the mule application <a href="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/mule-app/tardisviolationservicev2.jar">.jar file</a>.


- Setup Mule application properties
  - Open the application .jar file. 
  - Open the mule-artifact.propeties and edit following parameters:
   - salesforce.General.securityToken.value=*security token of the Salesforce Org*
   - cloudhub_http.Connection.host.value=0.0.0.0
   - cloudhub_http.Connection.port.value=8081
   - salesforce.General.username.value=*username of the Salesforce Org*
   - salesforce.General.password.value=*password of the Salesforce Org*
  - Save the file at it's original location. 
  - Close the application .jar file.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/mule-config.png">


- Login into <a href="https://anypoint.mulesoft.com/login"> Anypoint Platform </a>.
  - Go to *Runtime Manager*
  
  
- Click on **Deploy application** button. 
  - On the Deploy Application screen, fill in tehe details as below
   - Application Name: Any suitable name
   - Deployment Target: CloudHub
   - Application file: Upload the edited application .jar file.
   - Click on the **Deploy Application** button.
 <img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/deploy-mule.png">
 
 
 - Go to **Applications** tab in **Runtime Manager**.
  - Confirm that status of deployed app is *started* in the All Applications list.
  - Click on the app name.
  - Note the application **Domain**.
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/mule-domain.png">

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
  - Click on *Manage palette*
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/import-flow.png">
  
  
- Install two libraries
  - node-red-contrib-moment 4.0.0
  
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/install-moment.png">

  - node-red-contrib-throttle 0.1.6
  
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/install-throttle.png">


- Click on hamburger menu at top right corner. 
  - Click on *Import*.
  - Import the <a href="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/flows/flows.json"> flow definition </a> in NODE-RED instance.
  
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/import-flow.png">


- Once flow is imported, a flow representation would appear on the palette. 

<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/node-flow.png">


- Configure the MQTT connection
  - On the info panel, select *Global Configuration Nodes >> mqtt-broker >> 1977*
  - On the *Connection* tab, specify the name of MQTT Server.
  
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/flow-mqtt1.png">
  - On the *Security* tab, specify the *Username & Password* of the MQTT Server.
  
<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/flow-mqtt2.png">

- Click on the RED *Deploye* button. 


## Step 3: Setup IoT device i.e. your mobile phone.

Once the package is successfullt deployed, follow the steps below: 

- Download "Cedalo MQTT Connect" App from App Store. Cedalo Connect is a MQTT client that can publish sensor data from iPhone to the broker.

<img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/IMG_3873.PNG">

- Set up Cedalo MQTT app
  - Open Cedalo Connect App.
  - Go to the ⚙️ (gear) icon on the top left corner.
  - Fill in the following details (please be careful as all details are case sensitive)
    - URL : *Server from CloudMQTT settings*
    - Port : *Port from CloudMQTT settings*
    - Username : *Username from CloudMQTT settings*
    - Password : *Password from CloudMQTT settings*
    - Publish : *Any suitable topic name e.g. "violation".
   - After filling this, click on "MQTT Connect" on the top left corner and it should autosave the details.
   
 <img src="https://github.com/kaul-vineet/DriveSafe-sf/blob/master/images/IMG_3872.PNG">


## Step 4: Finally, test your solution.

- Well, finally you are all set to check and test the solution. 


- Login into the App:
  - Start by logging into the Salesforce Org and open the DriveSafe app from the Applauncher. 
  - Open the *Vehicles* tab.

<img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/Vehicles-tab.png">


- Find your vehicle:
  - Find and click on the Vehicle record created as part of setup.

<img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/Vehicle-details.png">


- Connect your mobile app:
  - Open the Cedalo MQTT Connect app on your mobile. 
  - Click on *Connect*.
  - Turn on the slider switch on top right corner. 
  - Move the phone a bit i.e. do not keep it in rest position.
 
 <img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/IMG_3875.jpg">
 
 
- Track the vehicle:
  - Go back to the Vehicle record. 
  - After a few moment, the *DriveSafe Live* utility bar would start blinking with a red indicator. 
  - Click on the utility bar link.
 
 <img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/Utility-bar.png">
 
 
 - Check your coordinates/location on the console: 
   - A map console would open up.
   - Check the location indicator in the map. It should eflect the ccordinates of the mobile phone sending the signals.
  
  <img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/tracker-1.png">
  
  <img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/tracker-2.png">
 
 
- Create a violation:
  - Make sure the Cedalo MQTT Connect is in connected state. 
  - Shake the phone (horizontal or vertical). This is to make sure that the linear velocity of the phone is more than 20. This is the condition to create the violation. 
  
    <img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/move%20it.jpeg">
  
  
 - Check violation: 
   - Go back to the vehicle record. 
   - Click on the **Related** tab. 
   - If all went well, a violation record would appear with a new violation. 
   
   <img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/Violation-tab.png">
   
- Check violation details:
  - Click on the violation record. 
  - Check violation details:
   - Speed value.
   - Geo values of the mobile.
   - A statis map marked with the location of he mobile.
   
   <img src="https://github.com/kaul-vineet/DriveSafe/blob/master/images/Violation-details.png">
   
 
 - Try it out again !! If you face any challenges, ping me on GitHub and I'd revert.
 
 
