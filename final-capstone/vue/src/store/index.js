import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if(currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    standardCakeIdForOrder: null,
    cakeOrderJSON: {}, //renamed
    selectedConfig: {
      
    },

    //these JSONS are for when we need to edit/update cake attributes - will be built
    // in appropriate employee component, then set via mutation, and the method with the API
    //call will use what's in the store, then use the CLEAR mutate to set these
    //back to empty objects.
    cakeStyleJSON:{},
    cakeSizeJSON: {},
    cakeFlavorJSON:{},
    cakeFrostingJSON:{},
    cakeFillingJSON:{},
    cakeConfigJSON:{},
    cakeExtraJSON:{},

    //this will be used to populate our order history so employees will be able to work with the orders
    //to view Pending orders, change their status, do edits, etc. Single pull to get *all* orders from the system,
    //then displaying the orders will be about *filtering* this array.
    pastOrdersArrayBE:[],
     //jake: why do we have both of these? I thought custom cakes were just a config
     //dan: took out customOrderCakeObject, superfluous now that we've reconsidered
     //and make a cake JSON standard.
    availableCakeStylesBE: [
      {
        styleID: 1,
        styleName: 'pick a cake style!',
        isAvailable: true,
        priceMod: 0.00
      },
      {
        styleID: 2,
        styleName: "double layer cake",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        styleID: 3,
        styleName: "cupcakes",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        styleID: 4,
        styleName: "sheet cake",
        isAvailable: true,
        priceMod: 0.00
      }
    ],
    availableCakeSizesBE:[
      {
        sizeID: 1,
        sizeName: null,
        sizeDescription: 'pick a cake size!',
        isAvailable: true,
        priceMod: 0.00
      },
      {
        sizeID: 2,
        sizeName: "small",
        sizeDescription: 'SMALL: 6" layer cake OR 12 cupcakes OR 8"x8" sheet cake',
        isAvailable: true,
        priceMod: 9.99
      },
      {
        sizeID: 3,
        sizeName: "medium",
        sizeDescription: 'MEDIUM: 9" layer cake OR 18 cupcakes OR 9"x14" sheet cake',
        isAvailable: true,
        priceMod: 15.99
      },
      {
        sizeID: 4,
        sizeName: "large",
        sizeDescription: 'LARGE: 12" layer cake OR 24 cupcakes OR 20"x24" sheet cake',
        isAvailable: true,
        priceMod: 19.99
      }
    ],
    availableFlavorsBE:[
      {
        flavorID: 1,
        flavorName: 'pick a cake flavor!',
        isAvailable: true,
        priceMod: 0.00
      },
      {
        flavorID: 2,
        flavorName: "vanilla",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        flavorID: 3,
        flavorName: "chocolate",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        flavorID: 4,
        flavorName: "confetti",
        isAvailable: true,
        priceMod: 2.00
      },
      {
        flavorID: 5,
        flavorName: "carrot",
        isAvailable: true,
        priceMod: 3.00
      }

    ],
    availableFrostingsBE:[
      {
        frostingID: 1,
        frostingName: "no frosting - have a naked cake!",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        frostingID: 2,
        frostingName: "vanilla",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        frostingID: 3,
        frostingName: "chocolate",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        frostingID: 4,
        frostingName: "cream cheese",
        isAvailable: true,
        priceMod: 3.00
      }
    ],
    availableFillingsBE:[
      {
        fillingID: 1,
        fillingName: "no filling",
        isAvailable: true,
        priceMod: 0.00
      },
      {
        fillingID: 2,
        fillingName: "strawberry jam",
        isAvailable: true,
        priceMod: 1.00
      },
      {
        fillingID: 3,
        fillingName: "blackberry jam",
        isAvailable: true,
        priceMod: 1.00
      }
    ],
    availableExtrasBE:[
      {
        extraID: 1,
        extraName: 'superhero decorations',
        isAvailable: true,
        priceMod: 3.00
      },
      {
        extraID: 2,
        extraName: 'plastic bunny',
        isAvailable: true,
        priceMod: 1.00
      },
      {
        extraID: 3,
        extraName: 'birthday candles',
        isAvailable: true,
        priceMod: 2.00
      }
    ],
    messagePrice:{
      priceMod: 1.50
    },
    standardCakeConfigsBE: [
      {
        cakeConfigID: 1,
        cakeConfigName: "Custom Cake",
        cakeConfigUrl: "https://www.pngkit.com/png/detail/918-9180589_wedding-cake-icon-png-conzelmann-b-228-ckerei.png",
        cakeConfigDescription: "Build your own cake!",
        cakeConfigFlavorID: 1,
        cakeConfigFrostingID: 1,
        cakeConfigFillingID: 1
      },
      {
        cakeConfigID: 2,
        cakeConfigName: "Curls Confetti Birthday Cake",
        cakeConfigUrl: "https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-original-redone-blog-1.jpg",
        cakeConfigDescription: "Our fun-filled confetti cake with luscious vanilla frosting",
        cakeConfigFlavorID: 4,
        cakeConfigFrostingID: 2,
        cakeConfigFillingID: 1
      },
      {
        cakeConfigID: 3,
        cakeConfigName: "Deadlift Devil's Food Cake",
        cakeConfigUrl: "https://www.girlversusdough.com/wp-content/uploads/2019/10/devils-food-cake-5.jpg",
        cakeConfigDescription: "Our award-winning deep devil's food cake with deep chocolate frosting. Go ahead, it's cheat day!",
        cakeConfigFlavorID: 3,
        cakeConfigFrostingID: 3,
        cakeConfigFillingID: 1
      },
      {
        cakeConfigID: 4,
        cakeConfigName: "Gym Bunny Carrot Cake",
        cakeConfigUrl: "https://grandbaby-cakes.com/wp-content/uploads/2020/03/Carrot-Cake-10.jpg",
        cakeConfigDescription: "Our moist carrot cake is jam-packed with healthy antoxidants and unbeatable flavor! It comes with our incredible cream cheese frosting.",
        cakeConfigFlavorID: 5,
        cakeConfigFrostingID: 4,
        cakeConfigFillingID: 1
      }

    ],

  //we can actually remove this if we have the order component send a cakeItem object, but I have it here now for convenient reference
    cakeItemToOrder : {
      cakeItemStyleID : null,
      cakeItemSizeID : null,
      cakeItemFlavorID : null,
      cakeItemFrostingID : null,
      cakeItemFillingID : null,
      cakeItemMessage : null,
      cakeItemPrice : null,
      cakeItemConfigID : null
    },
    currentActiveOrder: {
      orderStatusID : null,
      orderPriceTotal: null,
      orderPickupDate: null,
      orderPickupTime: null,
      itemsInOrder: [],
      customerName : null,
      customerPhoneNumber : null
    }
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    },
    SET_SELECTED_CONFIG(state, cakeConfig){
      state.selectedConfig = cakeConfig;
    },
    MAKE_CAKE_ITEM(state, cakeJSON){
      state.cakeItemToOrder = cakeJSON;
    },
    SET_CAKE_ITEM_PRICE(state, price){
      state.cakeItemToOrder.cakeItemPrice = price;
    },
    SET_ORDER_INFO(state, pickupInfo){
      state.currentActiveOrder.orderPickupDate = pickupInfo.orderPickupDate;
      state.currentActiveOrder.orderPickupTime = pickupInfo.orderPickupTime;
      state.currentActiveOrder.customerName = pickupInfo.customerName;
      state.currentActiveOrder.customerPhoneNumber = pickupInfo.customerPhoneNumber;
    },
    SET_CAKE_STYLE_JSON(state, styleJSON){
      state.cakeStyleJSON = styleJSON;
    },
    SET_CAKE_SIZE_JSON(state, sizeJSON){
      state.cakeSizeJSON = sizeJSON;
    },
    SET_CAKE_FLAVOR_JSON(state, flavorJSON){
      state.cakeFlavorJSON = flavorJSON;
    },
    SET_CAKE_FROSTING_JSON(state, frostingJSON){
      state.cakeFrostingJSON = frostingJSON;
    },
    SET_CAKE_FILLING_JSON(state, fillingJSON){
      state.cakeFillingJSON = fillingJSON;
    },
    SET_CAKE_CONFIG_JSON(state, configJSON){
      state.cakeConfigJSON = configJSON;
    },
    SET_CAKE_EXTRA_JSON(state, extraJSON){
      state.cakeExtraJSON = extraJSON;
    },
    CLEAR_CAKE_STYLE_JSON(){
      state.cakeStyleJSON = {};
    },
    CLEAR_CAKE_SIZE_JSON(){
      state.cakeSizeJSON = {};
    },
    CLEAR_CAKE_FLAVOR_JSON(){
      state.cakeFlavorJSON = {};
    },
    CLEAR_CAKE_FILLING_JSON(){
      state.cakeFillingJSON = {};
    },
    CLEAR_CAKE_CONFIG_JSON(){
      state.cakeConfigJSON = {};
    },
    CLEAR_CAKE_EXTRA_JSON(){
      state.cakeExtraJSON = {};
    },

    ADD_CAKEITEM_TO_ACTIVE_ORDER(state, cakeItem){
      state.cakeItemToOrder = cakeItem;
      state.currentActiveOrder.itemsInOrder.push(cakeItem);
      //pls note that this line is *only* for the current sprint. will refactor for multiple cakes later when we have shopping cart page.
      state.currentActiveOrder.orderPriceTotal = cakeItem.cakeItemPrice;
      //this is too tightly coupled and will be changed when we do the Order page, but it's okay for now to be able to order a single cake.
      state.currentActiveOrder.orderStatusID = 1;

      //again, we can actually get rid of this whole thing if we decide to pass a cakeItem in, but it's here now for reference and in case we decide to
      //mutate the data store by properties instead of sending a whole object
      state.cakeItemToOrder = 
        {
          cakeItemStyleID : null,
          cakeItemSizeID : null,
          cakeItemFlavorID : null,
          cakeItemFrostingID : null,
          cakeItemFillingID : null,
          cakeItemMessage : null,
          cakeItemPrice : null,
          cakeItemConfigID : null
        };
      },
      FINALIZE_ACTIVE_ORDER(state, order){
        state.currentActiveOrder.orderStatusID = order.orderStatusID;
        state.currentActiveOrder.orderPriceTotal = order.orderPriceTotal;
        // state.currentActiveOrder.orderPlacedDateTime = order.orderPlacedDateTime;
        state.currentActiveOrder.customerName = order.customerName;
        state.currentActiveOrder.customerPhoneNumber = order.customerPhoneNumber;

        //we can either push the active order in a POST request here or in the component, wherever we do it, we have to add code to set the current 
        //active order back to its blank state
      },
      CLEAR_ACTIVE_ORDER(state){
        state.currentActiveOrder = {
          orderStatusID : null,
          orderPriceTotal: null,
          orderPickupDate: null,
          orderPickupTime: null,
          itemsInOrder: [],
          customerName : null,
          customerPhoneNumber : null
        }
      }

      }

    }
  
)
