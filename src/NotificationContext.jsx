/* eslint-disable react/prop-types */
import { createContext ,useReducer} from "react";

const NotificationContext= createContext();

const notificationReducer = (state, action) => {
    console.log("notification Reducer ", action.content)
    switch (action.type) {
      case "success":
        return   {content:action.content, type: 'success'}
        case 'error':
          return    {content:action.content, type: 'error'}
      case '':
      return null
      default:
        return state;
    }
  }


export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  
        return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
  }
export default NotificationContext