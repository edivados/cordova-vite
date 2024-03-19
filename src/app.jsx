export function App() {
  return (
    <main class="h-screen w-screen flex flex-col justify-center items-center">
      <buton 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onclick={() => navigator.notification.alert("Message", function(){}, "Title", "OK")}>
        Open dialog
      </buton>
    </main>
  );
}
