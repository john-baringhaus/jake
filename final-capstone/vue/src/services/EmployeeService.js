import axios from 'axios';

export default {
//note - all API calls in Employee Service require authorization

getAllConfigs(){
    return axios.get('/configs');
},

getAllFlavors(){
    return axios.get('/flavors');
},

getAllFrostings(){
    return axios.get('/frostings');
},

getAllFillings(){
    return axios.get('/fillings');
},

getAllStyles(){
    return axios.get('/fillings');
},

getAllSizes(){
    return axios.get('/sizes');
},

getAllExtras(){
    return axios.get('/extras');
},

createCakeConfig(ConfigJSON){
    return axios.post('/configs', ConfigJSON);
},

createFlavor(FlavorJSON){
    return axios.post('/flavors', FlavorJSON);
},

createFrosting(FrostingJSON){
    return axios.post('/frostings', FrostingJSON);
},

createFilling(FillingJSON){
    return axios.post('/fillings', FillingJSON);
},

createStyle(StyleJSON){
    return axios.post('/styles', StyleJSON);
},

createSize(SizeJSON){
    return axios.post('/sizes', SizeJSON);
},

createExtra(ExtraJSON){
    return axios.post('extras', ExtraJSON);
},

updateCakeConfig(ConfigJSON){
    return axios.post('/configs', ConfigJSON);
},

updateFlavor(FlavorJSON){
    return axios.post('/flavors', FlavorJSON);
},

updateFrosting(FrostingJSON){
    return axios.post('/frostings', FrostingJSON);
},

updateFilling(FillingJSON){
    return axios.post('/fillings', FillingJSON);
},

updateStyle(StyleJSON){
    return axios.post('/styles', StyleJSON);
},

updateSize(SizeJSON){
    return axios.post('/sizes', SizeJSON);
},

updateExtra(ExtraJSON){
    return axios.post('extras', ExtraJSON);
},

updateOrder(orderJSON){
    return axios.put(`orders/${orderJSON.orderID}`, orderJSON);
},

}