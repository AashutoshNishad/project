const { configureStore } = require("@reduxjs/toolkit");
const { modeReducer } = require("./reucers/Mode");

export default configureStore({
    reducer: {
      counter: modeReducer,
    },
  })

