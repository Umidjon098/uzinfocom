import "./App.css";

import { createEffect, createEvent, createStore, sample } from "effector";
import { useUnit } from "effector-react";

const url =
  "https://gist.githubusercontent.com/" +
  "zerobias/24bc72aa8394157549e0b566ac5059a4/raw/" +
  "b55eb74b06afd709e2d1d19f9703272b4d753386/data.json";

const loadUserClicked = createEvent();

const fetchUserFx = createEffect((url: string) =>
  fetch(url).then((req) => req.json())
);

const $user = createStore(null);

sample({
  clock: loadUserClicked,
  fn: () => url,
  target: fetchUserFx,
});

$user.on(fetchUserFx.doneData, (_, user) => user.username);

function App() {
  const [user, pending] = useUnit([$user, fetchUserFx.pending]);
  const handleUserLoad = useUnit(loadUserClicked);

  return (
    <div>
      {user ? <div>current user: {user}</div> : <div>no current user</div>}
      <button onClick={handleUserLoad}>load user</button>
    </div>
  );
}

export default App;
