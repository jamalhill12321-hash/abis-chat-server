// Replace with your Supabase URL + public key
const SUPABASE_URL = "https://byfndfwdwhlafsxszfqv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Zm5kZndkd2hsYWZzeHN6ZnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NjE4NTIsImV4cCI6MjA4MTEzNzg1Mn0.380cfGejXXnFSqEXL3wOkYN4LCj8YhziZpFzeTKv5xk";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function sendMessage() {
  const msg = document.getElementById("messageInput").value;
  if (!msg) return;

  await client.from("messages").insert([{ text: msg }]);
  document.getElementById("messageInput").value = "";
}

client
  .channel("public:messages")
  .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) => {
    const div = document.getElementById("messages");
    const p = document.createElement("p");
    p.textContent = payload.new.text;
    div.appendChild(p);
  })
  .subscribe()
