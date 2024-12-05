import  React, { useContext, useEffect } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
 const [notification,dispatch]=useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification ? 'block' : 'none', 
    color: notification?.type === 'error' ? 'red' : 'green',
    backgroundColor: notification?.type === 'error' ? '#ffcccc' : '#ccffcc',
  }
console.log("Notification ", notification)

useEffect(() => {
  if (notification) {
    const timer = setTimeout(() => {
      dispatch({ type: '' }); // Clear notification
    }, 3000); // Adjust timeout as needed

    return () => clearTimeout(timer); // Clean up timer on unmount
  }
}, [notification, dispatch]); // Runs whenever notification changes


  return (
   
    <div style={style}>
   {notification?.content} 
    </div>
  )
}

export default Notification
