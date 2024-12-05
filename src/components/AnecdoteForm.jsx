import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newAnecdotes } from "../requests";
import NotificationContext from "../NotificationContext";
import { useContext } from "react";

const AnecdoteForm = () => {
  const [_,dispatch]= useContext(NotificationContext) 
  const queryClient=useQueryClient()
  const anecdoteMutation=useMutation({
    mutationFn:newAnecdotes,
    onSuccess : (data)=>{
      queryClient.invalidateQueries({queryKey:['anecdotes']});
      dispatch({ type: 'success', content: `Anecdote  ${data?.content}`,notificationType: 'success'});
      // setTimeout(() => {
      //   dispatch({ type: '' });
      // }, 3000);
    },
    onError: (error) => {
      console.error("Error occurred:", error); // Log the error
      dispatch({ type: 'error', content: error.response?.data?.error || 'An error occurred.',notificationType: 'error'});
      
      // setTimeout(() => {
      //   dispatch({ type: '' });
      // }, 5000);
    
    }
  });
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

   anecdoteMutation.mutate({content, votes:0})

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
