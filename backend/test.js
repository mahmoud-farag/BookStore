const state={

    cartIems:[{id:1, name:'t-shert', qty:1}],
    anotherProperites:'fixed',
}


const addToCart= (state,item)=>{
 let itemExist = state.cartIems.find(x=> x.id === item.id);
  if(itemExist)
    return {...state,cartIems: state.cartIems.map(x=> x.id === item.id? item:x )};

   else
    return {...state, cartIems:[...state.cartIems, item]};
}


console.log(addToCart(state,{id:1, name:'t-shert', qty:5}));
console.log(addToCart(state,{id:1, name:'t-shert', qty:7}));
console.log(addToCart(state,{id:2, name:'t-shert', qty:5}));