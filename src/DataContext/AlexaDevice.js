
export default class AlexaDevice {
    constructor(data) {
        this.endpointId = data.endpointId;
        this.friendlyName = data.friendlyName;
        this.manufacturerName = data.manufacturerName;
        this.description = data.description;
        this.displayCategories = data.displayCategories;
        this.interfaces = []
        this.interfaceobjects = []
        
        for (var j = 0; j < data.capabilities.length; j++) {
            var interfacename=data.capabilities[j].interface.split('.')[1]
            if (data.capabilities[j].hasOwnProperty('instance')) {
                interfacename=data.capabilities[j].instance.split('.')[1]
            }
            if (data.capabilities[j].interface.split('.')[1] && !this.interfaces.includes(interfacename)) {
                this[interfacename]=new AlexaController(this, data.capabilities[j])
                this.interfaces.push(interfacename)
                this.interfaceobjects.push(this[interfacename])
            }
        }
    }
    
    hasData() {
        for (var ifo in this.interfaceobjects) {
            for (var po in ifo.propertyobjects) {
                if (po.value===null) {
                    console.log('device is missing data', this.endpointId, this.friendlyName, ifo.controller, po )
                    return false
                }
            }
        }
        return true
    }
    
    newtoken() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
        )
    }
    
    responseHandler(response) {
        if (response.hasOwnProperty('context')) {
            for (var i = 0; i < response.context.properties.length; i++) {
                var prop=response.context.properties[i]
                var interfacename=prop.namespace.split('.')[1]
                if (prop.hasOwnProperty('instance')) {
                    interfacename=prop.instance.split('.')[1]
                }
                this[interfacename][prop.name]['value']=prop['value']
                this[interfacename][prop.name]['timeOfSample']=prop['timeOfSample']
            }
        }
        return response
    }
    
    properties() {
        var allprops=[]
        for (var j = 0; j < this.interfaces.length; j++) {
            allprops=allprops.concat(this[this.interfaces[j]].properties);
        }
        return allprops
    }

    controllerForProperty(propname) {
        for (var j = 0; j < this.interfaces.length; j++) {
            if (this[this.interfaces[j]].properties.includes(propname)) {
                return this.interfaces[j]
            }
        }
        return ''
    }
    
}

export class AlexaController {

    constructor(device, data) {
        this.device=device
        this.namespace=data.interface.split('.')[0]
        this.controller=data.interface.split('.')[1]
        this.properties=[]
        this.propertyobjects=[]
        
        if (data.hasOwnProperty('configuration')) {
            this.configuration=data.configuration;
        }

        if (data.hasOwnProperty('inputs')) {
            this.inputs=data.inputs;
        }

        if (data.hasOwnProperty('instance')) {
            this.instance=data.instance;
        }
        
        if (data.hasOwnProperty('capabilityResources')) {
            this.capabilityResources=data.capabilityResources;
        }

        if (data.hasOwnProperty('properties') && data.properties.hasOwnProperty('supported')) {
            for (var j = 0; j < data.properties.supported.length; j++) {
                this[data.properties.supported[j].name]=new AlexaControllerProperty()
                this.properties.push(data.properties.supported[j].name)
                this.propertyobjects.push(this[data.properties.supported[j].name])
            }
        }
    }
    
    directive(command, payload={}, cookie={}) {
        const serverurl="https://"+window.location.hostname;
        var header={"name": command, "namespace":this.namespace+"." + this.controller, "payloadVersion":"3", "messageId": this.device.newtoken(), "correlationToken": this.device.newtoken()}
        if (this.hasOwnProperty('instance')) {
            header.instance=this.instance
        }
        var endpoint={"endpointId": this.device.endpointId, "cookie": cookie, "scope":{ "type":"BearerToken", "token":"sofa-interchange-token" }}
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        console.log('Sending device-based alexa command:',data)
    
        return fetch(serverurl+'/directive', { withCredentials: true, credentials: 'include', method: 'post',
                    body: JSON.stringify(data)
                })
                    .then(res=>res.json())
                    .then(res=>this.device.responseHandler(res))
                    .then(res=> { return res;})
    }
 
}

export class AlexaControllerProperty {
    constructor() {
        this.value=null
    }
    
    get deepvalue() {
        // this is a shim to prevent the objects with value.value from breaking when value is null and javascript
        // throws an error.
        if (!this.value) return null;
        if (this.value.hasOwnProperty('value')) return this.value.value;
        return this.value;
    }
}

