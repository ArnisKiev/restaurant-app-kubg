export const serverEndPoint = { 
    order: {
        standartRequest: 'order',
        preparingOrders: 'order/allPreparingDishes',
        changeOrderedDishState: 'order/update-ordered-dish-state',
        getOrderByTable: 'order/get-order-by-table'
    },
    user: {
        standartRequest: 'user',
        getUserByCode: 'user/getUserByCode'
    },
    dish: 'dish'
}