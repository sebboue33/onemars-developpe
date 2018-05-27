const SERVER_PATH = "http://localhost:0000";
const USER_PATH = "/user";
const BOOKING_PATH = "/booking";

export const ROUTES = {
  
    user: {
        creatUser: {
             get: () => SERVER_PATH + USER_PATH + "/create"
            },
            getUserInfo: {
                // get: () => SERVER_PATH + USER_PATH + "/getuserinfo"
                get: () => "http://jsonplaceholder.typicode.com/posts"
        }
    },

    booking: {
        creatBooking: {
            get: () => SERVER_PATH + BOOKING_PATH + "/create"
        },
        updateBooking: {
            get: () => SERVER_PATH + BOOKING_PATH + "/update"
        },
        deleteBooking: {
            get: () => SERVER_PATH + BOOKING_PATH + "/delete"
        },
        getAllBooking: {
            get: () => SERVER_PATH + BOOKING_PATH + "/getallbooking"
        },
        getBookingByUser: {
            get: () => SERVER_PATH + BOOKING_PATH + "/getbookingbyuser"
        }
    }
}