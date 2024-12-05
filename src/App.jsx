import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateVotting } from "./requests";

// const notificationReducer = (state, action) => {
//   switch (action.type) {
//     case "sussess":
//         return state + action.message
//     case "failed":
//         return state + action.message
   
//     default:
//         return state
//   }
// }

const App = () => {

  // const [notification,notificationDispatch]= useReducer(notificationReducer,null)
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateVotting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const handleVote = (anecdote) => {
   
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const anecdotes = result.data;

  return (
   

<div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
   
   
  );
};

export default App;
