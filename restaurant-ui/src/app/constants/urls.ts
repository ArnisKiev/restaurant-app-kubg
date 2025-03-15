export const serverEndPoint = { 
    order: {
        standartRequest: 'order',
        preparingOrders: 'order/allPreparingDishes',
        changeOrderedDishState: 'order/update-ordered-dish-state',
        getOrderByTable: 'order/get-order-by-table',
        addDishesToOrder: 'order/add-dishes-to-order'
    },
    user: {
        standartRequest: 'user',
        getUserByCode: 'user/getUserByCode'
    },
    dish: 'dish',
    updatedDish: 'dish/update-dish'
}